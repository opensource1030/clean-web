import EquipmentPageUI from "../../interfaces/inventory/equipment.ui";
import AbstractPage from "../abstract.po";
import { press, dropDown } from "taiko";
import { timingSafeEqual } from "crypto";
import InventoryPageUI from "../../interfaces/inventory.ui";

export default class EquipmentPage extends AbstractPage {
  constructor() {
    super();
  }
  async clickNewDeviceButton(): Promise<void> {
    await this.clickElement(EquipmentPageUI.NEW_DEVICE_BUTTON);
  }

  async isNewDevicePageDisplayed(): Promise<boolean> {
    await this.waitForElementExisting(EquipmentPageUI.DEVICE_NAME_TXT);
    return await this.isElementDisplayed(EquipmentPageUI.DEVICE_NAME_TXT);
  }

  async openSectionInNewDevicePage(section: string): Promise<void> {
    await this.clickElementByText(section);
  }

  async inputFieldsInDeviceOverview(defaultPrice: string, deviceType: string, manufacturer: string, model: string, technical: string): Promise<void> {
    await this.inputTextFieldByLabel('Default Price', defaultPrice);
    await dropDown('Device Type').select(deviceType);
    await this.inputTextFieldByLabel('Manufacturer', manufacturer);
    await this.inputTextFieldByLabel('Model', model);
    await this.type(EquipmentPageUI.TECHNICAL_INFORMATION_TXT, technical);
  }

  async inputFieldsInAttributes(capacity: string, color: string): Promise<void> {
    await this.inputTextFieldByLabel('Capacity', capacity);
    await this.inputTextFieldByLabel('Color', color);
  }

  async selectProvidedOptionInAttributes(capacity: string, color: string): Promise<void> {
    await this.selectProvidedCapacity(capacity);
    await this.selectProvidedColor(color);
  }

  async selectProvidedCapacity(capacity: string) {
    await this.clickElement(EquipmentPageUI.DYNAMIC_CAPACITY_CHECKBOX, capacity);
  }

  async selectProvidedColor(color: string) {
    await this.clickElement(EquipmentPageUI.DYNAMIC_STYLE_CHECKBOX, color);
  }

  async inputFieldsInVendor(vendor: string): Promise<void> {
    await this.clickCheckboxByLabel(vendor);
  }

  async inputFieldsInCompanies(company: string): Promise<void> {
    await this.inputTextFieldByLabel('Find Company', company);
    await this.clickElement(EquipmentPageUI.FIND_COMPANY_BUTTON);
  }

  async selectProvidedCompany(company: string): Promise<void> {
    await this.clickElement(EquipmentPageUI.DYNAMIC_PROVIDED_COMPANY_CHECKBOX, company);
  }

  async inputFieldsInPrice(retailPrice: string, priceOne: string, priceTwo: string, priceOwn: string): Promise<void> {
    await this.inputTextFieldByLabel('Retail Price', retailPrice);
    await this.inputTextFieldByLabel('Price One', priceOne);
    await this.inputTextFieldByLabel('Price Two', priceTwo);
    await this.inputTextFieldByLabel('Price Own', priceOwn);
  }

  async clickSaveButton(): Promise<void> {
    await this.clickElementByText('Save Changes');
  }

  async leaveRequireFields(): Promise<void> {
  }

  async isDeviceNameValidationDisplayed(): Promise<boolean> {
    return await this.isElementByTextDisplayed('Incorrect Device Name');
  }

  async isDeviceExistingOnList(deviceName: string): Promise<boolean> {
    await this.type(EquipmentPageUI.DEVICE_NAME_HEADER_TXT, deviceName);
    await this.clickElement(EquipmentPageUI.DEVICE_SUGGESTION_LIST, deviceName);
    return await this.isElementByTextDisplayed(deviceName);
  }

  async userGoToEquipmentGroupsPage(): Promise<void> {
    await this.navigateByLeftMenu("INVENTORY", "Equipment Groups");
  }

  async userGoToEquipmentPage(): Promise<void> {
    await this.navigateByLeftMenu("INVENTORY", "Equipments");
  }

  async clickSaveChangeButton(): Promise<void> {
    await this.scrollDownToElement(InventoryPageUI.SAVE_CHANGE_BUTTON);
    await this.clickElement(InventoryPageUI.SAVE_CHANGE_BUTTON);
  }

  async verifyIncorrectNamePopupAppeared(): Promise<boolean> {
   return await this.isElementDisplayed(InventoryPageUI.INCORRECT_DEVICE_NAME_MESSAGE);
  }

  async closeIncorrectDeviceNamePopup(): Promise<void> {
    await this.clickElement(InventoryPageUI.CLOSE_INCORRECT_DEVICE_NAME_POPUP);
  }

  async clickNewEquipmentGroupButton(): Promise<void> {
    await this.clickElement(InventoryPageUI.CREATE_NEW_EQUIPMENT_GROUP_BUTTON);
  }

  async inputTitleNewEquipment(value: string): Promise<void> {
    await this.type(InventoryPageUI.NEW_EQUIPMENT_TITLE, value);
  }

  async inputCompanyName(value: string): Promise<void> {
    await this.type(InventoryPageUI.COMPANY_FIELD, value);
    await this.pressEnterKey();
    await this.sleep(3);
  }

  async clickFindDeviceButton(): Promise<void> {
    await this.clickElement(InventoryPageUI.FIND_DEVICES_BUTTON);
  }

  async clickShowMoreDetailsButton(): Promise<void> {
    await this.clickElement(InventoryPageUI.SHOW_MORE_DETAILS_BUTTON);
  }

  async clicDetailsCheckbox(): Promise<void> {
    await this.clickElement(InventoryPageUI.CARRIER_CHECKBOX);
    await this.clickElement(InventoryPageUI.PROVIDER_CHECKBOX);
    await this.clickElement(InventoryPageUI.CAPACITY_CHECKBOX);
    await this.clickElement(InventoryPageUI.STYLE_CHECKBOX);
  }

  async clickSelectedDeviceButton(): Promise<void> {
    await this.clickElement(InventoryPageUI.SELECTED_DEVICE_BUTTON);
  }

  async clickSavePreSentButton(): Promise<void> {
    await this.clickElement(InventoryPageUI.SAVE_PRESET_BUTTON);
  }

  async isPresetCreated(value: string): Promise<boolean> {
    return await this.isElementByTextDisplayed(value);
  }
}
