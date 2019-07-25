import PackagePageUI from "../interfaces/package.ui";
import AbstractPage from "./abstract.po";
import { press, dropDown } from "taiko";

export default class PackagePage extends AbstractPage {
  constructor() {
    super();
  }
  async clickPackageButton(): Promise<void> {
    await this.clickElementByText('PACKAGES');
  }

  async clickCreatePackageButton(): Promise<void> {
    await this.clickElementByText('Create a Package');
  }

  async selectLabelConditions(): Promise<void> {
    await this.clickElement(PackagePageUI.LABEL_CONDITION_DROPDOWN);
    await this.clickElement(PackagePageUI.LABEL_CONDITION_VALUE);
  }

  async selectCondition(): Promise<void> {
    await this.clickElement(PackagePageUI.CONDITION_DROPDOWN);
    await this.clickElement(PackagePageUI.CONDITION_VALUE);
  }

  async selectValue(): Promise<void> {
    await this.clickElement(PackagePageUI.VALUE_DROPDOWN);
    await this.clickElement(PackagePageUI.VALUE_VALUE);
  }

  async selectPreset(): Promise<void> {
    await this.clickElement(PackagePageUI.PRESET);
  }

  async selectSampleDevice(): Promise<void> {
    await this.clickElement(PackagePageUI.SAMPLE_DEVICE);
  }

  async selectIphoneDevice(): Promise<void> {
    await this.clickElement(PackagePageUI.IPHONE_DEVICE);
  }

  async selectService(): Promise<void> {
    await this.clickElement(PackagePageUI.FIRST_SERVICE);
  }

  async selectAdress(): Promise<void> {
    await this.clickElement(PackagePageUI.ADDRESS);
  }
  
  async inputApprovalField(value: string): Promise<void> {
    await this.type(PackagePageUI.APPROVAL_FIELD, value);
  }

  async inputTitleField(value: string): Promise<void> {
    await this.type(PackagePageUI.TITLE_FIELD, value);
  }

  async clickCreatePackageButton2(): Promise<void> {
    await this.clickElement(PackagePageUI.CREATE_PACKAGE_BUTTON);
  }

  async isCreatePackagedMessageDisplayed(): Promise<boolean> {
    return await this.isElementDisplayed(PackagePageUI.PACKAGE_CREATED_MESSAGE);

  }

  async clickOkButton(): Promise<void> {
    await this.clickElement(PackagePageUI.OK_BUTTON);
  }

  async clickViewAllPackageButton(): Promise<void> {
    await this.clickElementByText('View All Packages');
  }

  async clickEditButton(): Promise<void> {
    await this.clickElement(PackagePageUI.EDIT_BUTTON);
  }

  async clickUpdatePackageButton(): Promise<void> {
    await this.clickElement(PackagePageUI.UPDATE_PACKAGE_BUTTON);
  }

  async isUpdatedPackagedMessageDisplayed(): Promise<boolean> {
    return await this.isElementDisplayed(PackagePageUI.PACKAGE_UPDATED_MESSAGE);
  }

  async deletePackage(): Promise<void> {
    await this.clickElement(PackagePageUI.DELETE_BUTTON);
  }

  async getName1stPackage(): Promise<string> {
    return await this.getText(PackagePageUI.PACKAGE_NAME);
  }

  async isPackageDisplayed(name: string): Promise<boolean> {
    return await this.isElementByTextDisplayed(name);
  }
}
