/**
 *
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 * @author Stephen Lemp <stephen@topazharbor.com>
 * @description Adds an editable External ID field on supported forms and persists changes after save.
 */
define(['N/record'], function (record) {

  function beforeLoad(context) {
    const { UserEventType, type, form, newRecord } = context;
    log.debug('beforeLoad() - ' + type, form.getTabs());

    if (type == UserEventType.CREATE || type == UserEventType.EDIT || type == UserEventType.VIEW) {
      const visibleTabs = form.getTabs();
      const fieldId = form.addField({
        id: 'custpage_externalid', label: "External ID", type: 'text',
        container:
          visibleTabs.includes('systeminfo') ? 'systeminfo' :
            visibleTabs.includes('s_sysinfo') ? 's_sysinfo' :
              'main'
      });
      fieldId.setHelpText({ help: 'Added by script: enter the External ID to save on this record.' });
      fieldId.defaultValue = newRecord.getValue('externalid');
    }
  }


  function afterSubmit(context) {
    const { UserEventType, type, newRecord } = context;
    if (type == UserEventType.CREATE || type == UserEventType.EDIT) {
      const oldValue = newRecord.getValue('externalid');
      const newValue = newRecord.getValue('custpage_externalid');
      log.debug('afterSubmit() values', { oldValue, newValue });
      if (oldValue != newValue) {
        // NetSuite appears to support changing External ID values, but setting them
        // to true blank/null remains unreliable in SuiteScript 2.x/2.1 contexts.
        // References:
        // - Tim Dietrich: https://timdietrich.me/blog/netsuite-suitetalk-rest-external-ids/
        // - Marty Zigman (Prolecto): https://blog.prolecto.com/2021/08/14/guidelines-for-working-with-netsuite-external-ids/
        // Why submitFields? See https://www.reddit.com/r/Netsuite/comments/z237es/suitescript_set_external_id_on_item_creation/
        record.submitFields({ type: newRecord.type, id: newRecord.id, values: { externalid: newValue } });
      }
    }
  }

  return { beforeLoad, afterSubmit };
});
