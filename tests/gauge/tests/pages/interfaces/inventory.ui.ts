export default class InventoryPageUI {
  static NEW_DEVICE_BUTTON = 'xpt=//a[normalize-space(text())="New Device"]';

  // New device page
  static DEVICE_NAME_TXT = 'css=input[name=device-name]';
  static DEVICE_TYPE_DROPDOWN = 'css=select[id=testDeviceType]';
  static TECHNICAL_INFORMATION_TXT = 'xpt=//strong[text()="Tecnical Information"]/../textarea';
  static FIND_COMPANY_BUTTON = 'xpt=//button[text()="Find Company"]';
  static DYNAMIC_PROVIDED_COMPANY_CHECKBOX = 'xpt=//label[contains(.,"%s")]/input[@type="checkbox"]';
  static DYNAMIC_CAPACITY_CHECKBOX = 'xpt=//label[contains(.,"%s")]/input[@name="capacities"]';
  static DYNAMIC_STYLE_CHECKBOX = 'xpt=//label[contains(.,"%s")]/input[@name="styles"]';
  static PRICES_CAPACITY_SELECTBOX = 'css=select[class*="capacity"]';
  static PRICES_COLOR_SELECTBOX = 'css=select[class*="style"]';
  static PRICES_COMPANY_SELECTBOX = 'css=select[class*="company"]';
  static PRICES_VENDOR_SELECTBOX = 'css=select[class*="carrier"]';

  // Create new equipment page
  static SAVE_CHANGE_BUTTON = 'xpt=//button[text()="Save Changes"]';
  static INCORRECT_DEVICE_NAME_MESSAGE = 'xpt=//h3[text()="Incorrect Device Name"]';
  static CLOSE_INCORRECT_DEVICE_NAME_POPUP = 'xpt=//h3[text()="Incorrect Device Name"]/../../..//button';

  // Create new equipment group page
  static CREATE_NEW_EQUIPMENT_GROUP_BUTTON = 'xpt=//a[text()="Create New Equipment Group"]';
  static NEW_EQUIPMENT_TITLE = 'xpt=//strong[text()="Title"]/../input';
  static COMPANY_FIELD = 'xpt=//strong[text()="Company"]/..//input[@type="text"]';
  static FIND_DEVICES_BUTTON = 'xpt=//a[text()="Find Devices"]';
  static SHOW_MORE_DETAILS_BUTTON = 'xpt=(//span[@class="badge badge-primary"])[1]';
  static CARRIER_CHECKBOX = 'xpt=(//input[@type="checkbox"])[1]';
  static PROVIDER_CHECKBOX = 'xpt=(//input[@type="checkbox"])[2]';
  static CAPACITY_CHECKBOX = 'xpt=(//input[@type="checkbox"])[3]';
  static STYLE_CHECKBOX = 'xpt=(//input[@type="checkbox"])[4]';
  static SELECTED_DEVICE_BUTTON = 'xpt=//a[text()="Selected Devices"]';
  static SAVE_PRESET_BUTTON = 'xpt=//button[text()="Save Preset"]';

  // Device list
  static DEVICE_NAME_HEADER_TXT = 'css=input[placeholder="Device Name"]';
  static DEVICE_SUGGESTION_LIST = 'xpt=//ul//span/span[text()="%s"]';
}
