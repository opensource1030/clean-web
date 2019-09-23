export default class DashboardPageUI {
    static GOTIT_BUTTON = 'xpt=//button[text()="Got It!"]';
    static UPGRADE_DEVICE_BUTTON = 'xpt=//div[@class="mt-3"]//button[text()="Upgrade Device"]';
    static UPGRADE_DEVICE_POPUP = 'xpt=//h1[text()="For whom you are ordering?"]';
    static BILL_DETAILS_BUITTON = 'xpt=//div[@class="row price-info mt-5 mx-0"]//button[text()="Bill Details"]';
    static BILL_MONTH_TEXT = 'xpt=//div[@class="border-right pr-3"]/label[text()="BILL MONTH"]';
    static CONTACT_SUPPORT_DROPDOWN = 'xpt=//div[@class="right-panel__body"]//b[text()="Contact support:"]/../select';
    static DESCRIPTION_TEXTAREA = 'xpt=//textarea';
    static MOBILE_NUMBER_FIELD = 'xpt=//span[text()="Recipient Mobile Number"]/..//input';
    static SUBMIT_TICKET_BUTTON = 'xpt=//button[text()="Submit Ticket"]';

    static SUCCESSFUL_SUBMIT_TICKET_POPUP = 'xpt';
    static CHARGE_BUTTON = 'xpt=//span[text()="Charge"]';
    static EQUIPMENTS_BUTTON = 'xpt=//a[text()="Equipments"]';
    static VIEW_ALL_PACKAGES_BUTTON = 'xpt=//a[text()="View All Packages"]';

    static ORDERING_FOR_MYSELF_CONTINUE_BUTTON = 'xpt=//h2[text()="Ordering for my self"]/../button';
    static ORDERING_FOR_OTHER_USER_CONTINUE_BUTTON = 'xpt=//h2[text()="On behalf of other user"]/../button';
    static CHANGE_SWITCH_OPTION_BUTTON = 'xpt=//div[text()="No"]/..';
    static SWITCH_NO_OPTION = 'xpt=//div[@class="toggle-content toggle-content--off"]';
    static CATEGORY_OPTION = 'xpt=(//div[@class="service"])[1]';
    static DEVICE_CAPACITY = 'xpt=(//div[@class="device-capacity"])[1]';
    static SPACE_GREY_COLOR = 'xpt=(//div[@class="device-color mod-space-grey"])[1]';
    static WHITE_COLOR = 'xpt=(//div[@class="device-color mod-white"])[1]';
    static BLACK_COLOR = 'xpt=(//div[@class="device-color mod-black"])[1]';
    static GOLD_COLOR = 'xpt=(//div[@class="device-color mod-gold"])[1]';
    static REQUEST_DEVICE_BUTTON = 'xpt=(//button[text()="Request Device"])[1]';
    static SUBMIT_ORDER_BUTTON = 'xpt=//button[text()="Submit order"]';
    static ORDER_POPUP_SUCCESSFUL = 'xpt=//p[contains(text(),"Your order has been submitted.")]';
    static GOT_IT_SUBMIT_ORDER = 'xpt=//button[text()="Got it!"]';
    static SELECT_USER_DROPDOWN = 'xpt=//div[@class="multiselect__tags"]';
    static THE_FIRST_USER_OPTION = 'xpt=(//li[@class="multiselect__element"])[1]';

    static TRANSFER_WIRELESS_SERVICES_LIABILITY_BUTTON = 'xpt=//b[text()="Transfer Wireless Services Liability"]/../..';
    static EIXSTING_CARRIER_FIELD = 'xpt=//input[@name="carrierInfo"]';
    static PHONE_NUMBER_FIELD = 'xpt=//input[@name="wirelessNo"]';
    static ACCOUNT_NAME_FIELD = 'xpt=//input[@name="accountName"]';
    static ACCOUNT_NUMBER_FIELD = 'xpt=//input[@name="accountNumber"]';
    static BILLING_PASSWORD_FIELD = 'xpt=//input[@name="billingPassword"]';
    static PERSONAL_TO_CORPORATE_OPTION = 'xpt=//span[text()="Personal to corporate"]/..';
    static NEXT_BUTTON = 'xpt=//button[text()="Next"]';
    static ERROR_MESSAGE = 'xpt=(//span[@class="error"])[1]';
  }
