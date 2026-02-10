const {
  createHandlers,
  constants
} = require('../src/FileCabinet/SuiteScripts/topazHarbor/externalIdEditor/editExternalId');

const serverWidget = {
  FieldType: {
    TEXT: 'TEXT'
  }
};

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
    const handlers = createHandlers(serverWidget);

    handlers.beforeLoad(buildContext({
      form: {
        addField: addField
      },
      newRecord: {
        getValue: getValue
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
    const addField = jest
      .fn()
      .mockImplementationOnce(() => {
        throw new Error('Tab not available');
      })
      .mockReturnValueOnce(createdField);
    const handlers = createHandlers(serverWidget);

    handlers.beforeLoad(buildContext({
      form: {
        addField: addField
      },
      newRecord: {
        getValue: jest.fn().mockReturnValue('EXT-1')
      }
    }));

    expect(addField).toHaveBeenNthCalledWith(1, {
      id: constants.PAGE_EXTERNAL_ID_FIELD_ID,
      type: 'TEXT',
      label: 'External ID',
      container: constants.SYSTEM_INFORMATION_TAB_ID
    });
    expect(addField).toHaveBeenNthCalledWith(2, {
      id: constants.PAGE_EXTERNAL_ID_FIELD_ID,
      type: 'TEXT',
      label: 'External ID'
    });
    expect(createdField.defaultValue).toBe('EXT-1');
  });

  test('beforeSubmit persists edited value to native externalid field', () => {
    const setValue = jest.fn();
    const getValue = jest.fn().mockImplementation(({fieldId}) => {
      if (fieldId === constants.PAGE_EXTERNAL_ID_FIELD_ID) {
        return 'UPDATED-EXT-ID';
      }
      return null;
    });
    const handlers = createHandlers(serverWidget);

    handlers.beforeSubmit(buildContext({
      type: 'edit',
      newRecord: {
        getValue: getValue,
        setValue: setValue
      }
    }));

    expect(getValue).toHaveBeenCalledWith({fieldId: constants.PAGE_EXTERNAL_ID_FIELD_ID});
    expect(setValue).toHaveBeenCalledWith({
      fieldId: constants.EXTERNAL_ID_FIELD_ID,
      value: 'UPDATED-EXT-ID'
    });
  });

  test('beforeSubmit does nothing when custom field is missing in context', () => {
    const setValue = jest.fn();
    const handlers = createHandlers(serverWidget);

    handlers.beforeSubmit(buildContext({
      type: 'xedit',
      newRecord: {
        getValue: jest.fn().mockReturnValue(undefined),
        setValue: setValue
      }
    }));

    expect(setValue).not.toHaveBeenCalled();
  });
});
