export default class ServicesAndPlansPageUI {
    static NEW_SERVICE_BUTTON = 'xpt=//a[normalize-space(text())="New Service"]';
    static MESSAGE_ERROR_TEXT = 'css=.modal-body h3';
    static POPUP_CLOSE = 'css=.modal-header .close';
    static INPUT_FIELD = 'xpt=//label[contains(.,"%s")]/../input';
    static DESCRIPTION_FIELD = 'xpt=//label[contains(.,"Description")]/../textarea';
    static SERVICE_LIST_TITLE = 'css=.tag-header h2';
    static SERVICE_EDIT_BUTTON = 'css=tbody tr:nth-child(1) .action-buttons a[title="Edit"]';
    static SERVICE_DELETE_BUTTON = 'css=tbody tr:nth-child(1) .action-buttons button';
    static FRIST_SERVICE_TITLE = 'css=.card .card-body table tbody tr:nth-child(1) td:nth-child(3)';
    static DETELE_SUBMIT_MODAL = 'xpt=//div[@class="swal2-actions"]/button[contains(.,"Yes, delete it!")]';
    static DETELE_OK_MODAL = 'xpt=//div[@class="swal2-actions"]/button[contains(.,"OK")]';
    static DETELE_MESSAGE = 'css=#swal2-title';
    // static STATUS_CHECKBOX = 'css=.card .card-body table tbody tr:nth-child(1) td label.switch input';
    static  STATUS_CHECKBOX ='xpt=(//span[@class="switch-slider"])[1]/..';
    static STATUS_CHECKBOX_LABEL = 'css=.card .card-body table tbody tr:nth-child(1) td label.switch';
    static CHANGE_STATUS_SERVICE_BUTTON = 'xpt=(//span[@class="switch-slider"])[1]';
}
