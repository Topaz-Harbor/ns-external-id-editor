/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 * @author Stephen Lemp <stephen@topazharbor.com>
 * @description Exposes an editable External ID field on supported record forms and persists changes on save.
 */

define(['N/ui/serverWidget'], function (serverWidget) {
  const EXTERNAL_ID_FIELD_ID = 'externalid';
  const PAGE_EXTERNAL_ID_FIELD_ID = 'custpage_th_external_id_editor';
  const SYSTEM_INFORMATION_TAB_ID = 'systeminformation';

  function handleBeforeLoad(context) {
    const { UserEventType = {}, form, newRecord, type } = context;
    // Limit beforeLoad behavior to supported contexts; filter(Boolean) drops
    // undefined enum values in partial/mock runtimes.
    const supportedTypes = [
      UserEventType.CREATE,
      UserEventType.COPY,
      UserEventType.EDIT,
      UserEventType.VIEW
    ].filter(Boolean);

    if (supportedTypes.length && supportedTypes.indexOf(type) === -1) return;

    if (!form || !newRecord) return;

    const currentValue = newRecord.getValue({ fieldId: EXTERNAL_ID_FIELD_ID });
    let externalIdField;

    try {
      externalIdField = form.addField({
        id: PAGE_EXTERNAL_ID_FIELD_ID,
        type: serverWidget.FieldType.TEXT,
        label: 'External ID',
        container: SYSTEM_INFORMATION_TAB_ID
      });
    } catch (e) {
      externalIdField = form.addField({
        id: PAGE_EXTERNAL_ID_FIELD_ID,
        type: serverWidget.FieldType.TEXT,
        label: 'External ID'
      });
    }

    if (externalIdField && currentValue !== null && currentValue !== undefined) {
      externalIdField.defaultValue = String(currentValue);
    }
  }

  function handleBeforeSubmit(context) {
    const { UserEventType = {}, newRecord, type } = context;
    const supportedTypes = [
      UserEventType.CREATE,
      UserEventType.COPY,
      UserEventType.EDIT,
      UserEventType.XEDIT
    ].filter(Boolean);

    if (supportedTypes.length && supportedTypes.indexOf(type) === -1) return;

    if (!newRecord) return;

    const submittedValue = newRecord.getValue({ fieldId: PAGE_EXTERNAL_ID_FIELD_ID });
    if (submittedValue === null || submittedValue === undefined) return;

    newRecord.setValue({
      fieldId: EXTERNAL_ID_FIELD_ID,
      value: String(submittedValue)
    });
  }

  function beforeLoad(context) {
    try {
      handleBeforeLoad(context);
    } catch (e) {}
  }

  function beforeSubmit(context) {
    try {
      handleBeforeSubmit(context);
    } catch (e) {}
  }

  return { beforeLoad, beforeSubmit };
});
