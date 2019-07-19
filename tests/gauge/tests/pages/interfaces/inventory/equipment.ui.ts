export default class EquipmentPageUI {
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

  // Device list
  static DEVICE_NAME_HEADER_TXT = 'css=input[placeholder="Device Name"]';
  static DEVICE_SUGGESTION_LIST = 'xpt=//ul//span/span[text()="%s"]';
}
