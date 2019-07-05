import InventoryPageUI from "../interfaces/inventory.ui";
import AbstractPage from "./abstract.po";
import { press, dropDown } from "taiko";

export default class InventoryPage extends AbstractPage {
  constructor() {
    super();
  }
  async clickNewDeviceButton(): Promise<void> {
    await this.clickElement(InventoryPageUI.NEW_DEVICE_BUTTON);
  }

  async isNewDevicePageDisplayed(): Promise<boolean> {
    await this.waitForElementExisting(InventoryPageUI.DEVICE_NAME_TXT);
    return await this.isElementDisplayed(InventoryPageUI.DEVICE_NAME_TXT);
  }

  async openSectionInNewDevicePage(section: string): Promise<void> {
    await this.clickElementByText(section);
  }

  async inputFieldsInDeviceOverview(defaultPrice: string, deviceType: string, manufacturer: string, model: string, technical: string): Promise<void> {
    await this.inputTextFieldByLabel('Default Price', defaultPrice);
    await dropDown('Device Type').select(deviceType);
    await this.inputTextFieldByLabel('Manufacturer', manufacturer);
    await this.inputTextFieldByLabel('Model', model);
    await this.type(InventoryPageUI.TECHNICAL_INFORMATION_TXT, technical);
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
    await this.clickElement(InventoryPageUI.DYNAMIC_CAPACITY_CHECKBOX, capacity);
  }

  async selectProvidedColor(color: string) {
    await this.clickElement(InventoryPageUI.DYNAMIC_STYLE_CHECKBOX, color);
  }

  async inputFieldsInVendor(vendor: string): Promise<void> {
    await this.clickCheckboxByLabel(vendor);
  }

  async inputFieldsInCompanies(company: string): Promise<void> {
    await this.inputTextFieldByLabel('Find Company', company);
    await this.clickElement(InventoryPageUI.FIND_COMPANY_BUTTON);
  }

  async selectProvidedCompany(company: string): Promise<void> {
    await this.clickElement(InventoryPageUI.DYNAMIC_PROVIDED_COMPANY_CHECKBOX, company);
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
    await this.type(InventoryPageUI.DEVICE_NAME_HEADER_TXT, deviceName);
    await this.clickElement(InventoryPageUI.DEVICE_SUGGESTION_LIST, deviceName);
    return await this.isElementByTextDisplayed(deviceName);
  }
}
