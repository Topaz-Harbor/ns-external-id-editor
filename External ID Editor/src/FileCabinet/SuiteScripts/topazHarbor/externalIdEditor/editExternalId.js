/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 * @author Stephen Lemp <stephen@topazharbor.com>
 * @description Exposes an editable External ID field on supported record forms and persists changes on save.
 */

define(['N/ui/serverWidget', 'N/log', 'N/record'], function (serverWidget, log, record) {
  const EXTERNAL_ID_FIELD_ID = 'externalid';
  const PAGE_EXTERNAL_ID_FIELD_ID = 'custpage_th_external_id_editor';
  const SYSTEM_INFO_TAB_IDS = ['systeminfo', 's_sysinfo'];
  const MAIN_TAB_ID = 'main';

  function logError(title, error) {
    const details = error && (error.stack || error.message)
      ? (error.stack || error.message)
      : String(error);
    try {
      log.error({ title, details });
    } catch (ignored) {}
  }

  function shouldRunBeforeLoad(context) {
    if (!context) return false;
    const { UserEventType = {}, type } = context;
    // Limit beforeLoad behavior to supported contexts; filter(Boolean) drops
    // undefined enum values in partial/mock runtimes.
    const supportedTypes = [
      UserEventType.CREATE,
      UserEventType.COPY,
      UserEventType.EDIT,
      UserEventType.VIEW
    ].filter(Boolean);

    return !(supportedTypes.length && supportedTypes.indexOf(type) === -1);
  }

  function resolveExternalIdContainer(form) {
    if (!form || typeof form.getTabs !== 'function') return MAIN_TAB_ID;
    const visibleTabs = form.getTabs() || [];
    for (let i = 0; i < SYSTEM_INFO_TAB_IDS.length; i += 1) {
      if (visibleTabs.indexOf(SYSTEM_INFO_TAB_IDS[i]) !== -1) {
        return SYSTEM_INFO_TAB_IDS[i];
      }
    }
    return MAIN_TAB_ID;
  }

  function addExternalIdFieldToForm(context) {
    if (!context) return;
    const { form, newRecord } = context;
    if (!form || !newRecord) return;

    const currentValue = newRecord.getValue({ fieldId: EXTERNAL_ID_FIELD_ID });
    const container = resolveExternalIdContainer(form);
    let externalIdField;

    try {
      externalIdField = form.addField({
        id: PAGE_EXTERNAL_ID_FIELD_ID,
        type: serverWidget.FieldType.TEXT,
        label: 'External ID',
        container
      });
    } catch (e) {
      logError('beforeLoad:addFieldWithContainerFailed', e);
      externalIdField = form.addField({
        id: PAGE_EXTERNAL_ID_FIELD_ID,
        type: serverWidget.FieldType.TEXT,
        label: 'External ID'
      });
    }

    if (externalIdField && currentValue !== null && currentValue !== undefined) {
      externalIdField.defaultValue = String(currentValue);
    }

    log.debug({
      title: 'beforeLoad:externalIdFieldAdded',
      details: { container, hasValue: currentValue !== null && currentValue !== undefined }
    });
  }

  function shouldRunAfterSubmit(context) {
    if (!context) return false;
    const { UserEventType = {}, type } = context;
    const supportedTypes = [
      UserEventType.CREATE,
      UserEventType.EDIT
    ].filter(Boolean);

    return !(supportedTypes.length && supportedTypes.indexOf(type) === -1);
  }

  function persistSubmittedExternalId(context) {
    if (!context) return;
    const { newRecord } = context;
    if (!newRecord || !newRecord.id || !newRecord.type) return;

    const oldValue = newRecord.getValue({ fieldId: EXTERNAL_ID_FIELD_ID });
    const newValue = newRecord.getValue({ fieldId: PAGE_EXTERNAL_ID_FIELD_ID });
    if (newValue === null || newValue === undefined) return;
    if (String(oldValue || '') === String(newValue)) return;

    record.submitFields({
      type: newRecord.type,
      id: newRecord.id,
      values: {
        externalid: String(newValue)
      }
    });

    log.debug({
      title: 'afterSubmit:externalIdUpdated',
      details: { oldValue, newValue }
    });
  }

  function beforeLoad(context) {
    if (!shouldRunBeforeLoad(context)) return;

    try {
      addExternalIdFieldToForm(context);
    } catch (e) {
      logError('beforeLoad:addExternalIdFieldToFormFailed', e);
    }
  }

  function afterSubmit(context) {
    if (!shouldRunAfterSubmit(context)) return;

    try {
      persistSubmittedExternalId(context);
    } catch (e) {
      logError('afterSubmit:persistSubmittedExternalIdFailed', e);
    }
  }

  return { beforeLoad, afterSubmit };
});
