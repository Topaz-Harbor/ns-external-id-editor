const serverWidget = {
  FieldType: {
    TEXT: 'TEXT'
  }
};

jest.mock('N/record', () => ({
  submitFields: jest.fn()
}));
const record = require('N/record');

const constants = {
  EXTERNAL_ID_FIELD_ID: 'externalid',
  PAGE_EXTERNAL_ID_FIELD_ID: 'custpage_th_external_id_editor',
  SYSTEM_INFORMATION_TAB_ID: 'systeminfo',
  SECONDARY_SYSTEM_INFORMATION_TAB_ID: 's_sysinfo',
  MAIN_TAB_ID: 'main'
};

const scriptPath = '../src/FileCabinet/SuiteScripts/topazHarbor/externalIdEditor/editExternalId';

function loadHandlers() {
  delete require.cache[require.resolve(scriptPath)];
  return require(scriptPath);
}

function buildContext(overrides) {
  return Object.assign({
    type: 'edit',
    UserEventType: {
      CREATE: 'create',
      COPY: 'copy',
      EDIT: 'edit',
      VIEW: 'view',
      XEDIT: 'xedit'
    }
  }, overrides || {});
}

describe('editExternalId user event script', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('beforeLoad adds field on System Information tab when available', () => {
    const createdField = {};
    const addField = jest.fn().mockReturnValue(createdField);
    const getValue = jest.fn().mockReturnValue('ABC-100');
    const handlers = loadHandlers();

    handlers.beforeLoad(buildContext({
      form: {
        getTabs: jest.fn().mockReturnValue([constants.SYSTEM_INFORMATION_TAB_ID]),
        addField
      },
      newRecord: {
        getValue
      }
    }));

    expect(getValue).toHaveBeenCalledWith({fieldId: constants.EXTERNAL_ID_FIELD_ID});
    expect(addField).toHaveBeenCalledWith({
      id: constants.PAGE_EXTERNAL_ID_FIELD_ID,
      type: 'TEXT',
      label: 'External ID',
      container: constants.SYSTEM_INFORMATION_TAB_ID
    });
    expect(createdField.defaultValue).toBe('ABC-100');
  });

  test('beforeLoad falls back to default container when System Information tab is unavailable', () => {
    const createdField = {};
    const addField = jest.fn().mockReturnValue(createdField);
    const handlers = loadHandlers();

    handlers.beforeLoad(buildContext({
      form: {
        getTabs: jest.fn().mockReturnValue([]),
        addField
      },
      newRecord: {
        getValue: jest.fn().mockReturnValue('EXT-1')
      }
    }));

    expect(addField).toHaveBeenCalledWith({
      id: constants.PAGE_EXTERNAL_ID_FIELD_ID,
      type: 'TEXT',
      label: 'External ID',
      container: constants.MAIN_TAB_ID
    });
    expect(createdField.defaultValue).toBe('EXT-1');
  });

  test('beforeLoad uses secondary system info tab when primary is unavailable', () => {
    const createdField = {};
    const addField = jest.fn().mockReturnValue(createdField);
    const handlers = loadHandlers();

    handlers.beforeLoad(buildContext({
      form: {
        getTabs: jest.fn().mockReturnValue([constants.SECONDARY_SYSTEM_INFORMATION_TAB_ID]),
        addField
      },
      newRecord: {
        getValue: jest.fn().mockReturnValue('EXT-2')
      }
    }));

    expect(addField).toHaveBeenCalledWith({
      id: constants.PAGE_EXTERNAL_ID_FIELD_ID,
      type: 'TEXT',
      label: 'External ID',
      container: constants.SECONDARY_SYSTEM_INFORMATION_TAB_ID
    });
    expect(createdField.defaultValue).toBe('EXT-2');
  });

  test('afterSubmit persists edited value to native externalid field', () => {
    const getValue = jest.fn().mockImplementation(({fieldId}) => {
      if (fieldId === constants.PAGE_EXTERNAL_ID_FIELD_ID) {
        return 'UPDATED-EXT-ID';
      }
      if (fieldId === constants.EXTERNAL_ID_FIELD_ID) {
        return 'OLD-EXT-ID';
      }
      return undefined;
    });
    const handlers = loadHandlers();

    handlers.afterSubmit(buildContext({
      type: 'edit',
      newRecord: {
        type: 'customer',
        id: '123',
        getValue
      }
    }));

    expect(record.submitFields).toHaveBeenCalledWith({
      type: 'customer',
      id: '123',
      values: {
        externalid: 'UPDATED-EXT-ID'
      }
    });
  });

  test('afterSubmit does nothing when custom field is missing in context', () => {
    const handlers = loadHandlers();

    handlers.afterSubmit(buildContext({
      type: 'edit',
      newRecord: {
        type: 'customer',
        id: '123',
        getValue: jest.fn().mockReturnValue(undefined)
      }
    }));

    expect(record.submitFields).not.toHaveBeenCalled();
  });

  test('afterSubmit does nothing when new value equals old value', () => {
    const handlers = loadHandlers();

    handlers.afterSubmit(buildContext({
      type: 'edit',
      newRecord: {
        type: 'customer',
        id: '123',
        getValue: jest.fn().mockImplementation(({fieldId}) => {
          if (fieldId === constants.PAGE_EXTERNAL_ID_FIELD_ID) return 'UNCHANGED';
          if (fieldId === constants.EXTERNAL_ID_FIELD_ID) return 'UNCHANGED';
          return undefined;
        })
      }
    }));

    expect(record.submitFields).not.toHaveBeenCalled();
  });
});
