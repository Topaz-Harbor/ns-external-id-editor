/**
 * External ID Editor User Event Script
 * Adds an editable External ID field to supported record forms and
 * persists changes after submit.
 *
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 * @author Stephen Lemp <stephen@topazharbor.com>
 * @license MIT
 */
define(['N/record'], (record) => {
  const FIELD_ID = 'custpage_externalid';
  const FIELD_LABEL = 'External ID';
  const beforeLoad = (context) => {
    const { UserEventType, type, form, newRecord } = context;
    if (type !== UserEventType.CREATE && type !== UserEventType.EDIT && type !== UserEventType.VIEW) {
      return;
    }

    const visibleTabs = form.getTabs();
    const externalIdField = form.addField({
      id: FIELD_ID,
      label: FIELD_LABEL,
      type: 'text',
      container:
        visibleTabs.includes('systeminfo') ? 'systeminfo' :
          visibleTabs.includes('s_sysinfo') ? 's_sysinfo' :
            'main'
    });

    externalIdField.defaultValue = newRecord.getValue({ fieldId: 'externalid' }) || '';
  };

  const afterSubmit = (context) => {
    const { UserEventType, type, newRecord } = context;
    if (type !== UserEventType.CREATE && type !== UserEventType.EDIT) {
      return;
    }

    const currentExternalId = (newRecord.getValue({ fieldId: 'externalid' }) || '').toString();
    const editedExternalId = (newRecord.getValue({ fieldId: FIELD_ID }) || '').toString();
    if (currentExternalId === editedExternalId) {
      return;
    }

    // External ID updates are persisted post-submit via submitFields.
    record.submitFields({
      type: newRecord.type,
      id: newRecord.id,
      values: {
        externalid: editedExternalId
      }
    });
  };

  return {
    beforeLoad,
    afterSubmit
  };
});
