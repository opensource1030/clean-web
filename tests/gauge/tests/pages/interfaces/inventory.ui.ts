export default class InventoryPageUI {
  static NEW_DEVICE_BUTTON = 'xpt=//a[normalize-space(text())="New Device"]';

  // New device page
  static DEVICE_NAME_TXT = 'css=input[name=device-name]';
  static DEVICE_TYPE_DROPDOWN = 'css=select[id=testDeviceType]';
  static TECHNICAL_INFORMATION_TXT = 'xpt=//strong[text()="Tecnical Information"]/../textarea';
  static FIND_COMPANY_BUTTON = 'xpt=//button[text()="Find Company"]';

  // Device list
  static DEVICE_NAME_HEADER_TXT = 'css=input[placeholder="Device Name"]';

}
