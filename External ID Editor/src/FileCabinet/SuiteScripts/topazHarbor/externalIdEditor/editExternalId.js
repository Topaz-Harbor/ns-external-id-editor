/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 * @author Stephen Lemp <stephen@topazharbor.com>
 * @description Exposes an editable External ID field on supported record forms and persists changes on save.
 */

const EXTERNAL_ID_FIELD_ID = 'externalid';
const PAGE_EXTERNAL_ID_FIELD_ID = 'custpage_th_external_id_editor';
const SYSTEM_INFORMATION_TAB_ID = 'systeminformation';

function createHandlers(serverWidget) {
  function beforeLoad(context) {
    const userEventType = context.UserEventType || {};
    const supportedTypes = [
      userEventType.CREATE,
      userEventType.COPY,
      userEventType.EDIT,
      userEventType.VIEW
    ].filter(Boolean);

    if (supportedTypes.length && supportedTypes.indexOf(context.type) === -1) {
      return;
    }

    if (!context.form || !context.newRecord) {
      return;
    }

    const currentValue = context.newRecord.getValue({fieldId: EXTERNAL_ID_FIELD_ID});
    let externalIdField;

    try {
      externalIdField = context.form.addField({
        id: PAGE_EXTERNAL_ID_FIELD_ID,
        type: serverWidget.FieldType.TEXT,
        label: 'External ID',
        container: SYSTEM_INFORMATION_TAB_ID
      });
    } catch (e) {
      externalIdField = context.form.addField({
        id: PAGE_EXTERNAL_ID_FIELD_ID,
        type: serverWidget.FieldType.TEXT,
        label: 'External ID'
      });
    }

    if (externalIdField && currentValue !== null && currentValue !== undefined) {
      externalIdField.defaultValue = String(currentValue);
    }
  }

  function beforeSubmit(context) {
    const userEventType = context.UserEventType || {};
    const supportedTypes = [
      userEventType.CREATE,
      userEventType.COPY,
      userEventType.EDIT,
      userEventType.XEDIT
    ].filter(Boolean);

    if (supportedTypes.length && supportedTypes.indexOf(context.type) === -1) {
      return;
    }

    if (!context.newRecord) {
      return;
    }

    const submittedValue = context.newRecord.getValue({fieldId: PAGE_EXTERNAL_ID_FIELD_ID});
    if (submittedValue === null || submittedValue === undefined) {
      return;
    }

    context.newRecord.setValue({
      fieldId: EXTERNAL_ID_FIELD_ID,
      value: String(submittedValue)
    });
  }

  return {
    beforeLoad: beforeLoad,
    beforeSubmit: beforeSubmit
  };
}

if (typeof define === 'function') {
  define(['N/ui/serverWidget'], function (serverWidget) {
    return createHandlers(serverWidget);
  });
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    createHandlers: createHandlers,
    constants: {
      EXTERNAL_ID_FIELD_ID: EXTERNAL_ID_FIELD_ID,
      PAGE_EXTERNAL_ID_FIELD_ID: PAGE_EXTERNAL_ID_FIELD_ID,
      SYSTEM_INFORMATION_TAB_ID: SYSTEM_INFORMATION_TAB_ID
    }
  };
}
