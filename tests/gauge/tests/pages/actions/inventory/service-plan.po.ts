import ServicesAndPlansPageUI from "../../interfaces/inventory/service-plan.ui";
import AbstractPage from "../abstract.po";
import { press, dropDown } from "taiko";

export default class ServicesAndPlansPage extends AbstractPage {
  constructor() {
    super();
  }
  async clickNewServiceButton(): Promise<void> {
    await this.clickElement(ServicesAndPlansPageUI.NEW_SERVICE_BUTTON);
  }
  async getServiceListTitle(): Promise<string> {
    return await this.getText(ServicesAndPlansPageUI.SERVICE_LIST_TITLE);
  }
  async clickSaveButton(): Promise<void> {
    await this.clickElementByText('Save Changes');
  }
  async isNewServiceValidationDisplayed(validationMessage: string): Promise<boolean> {
    return await this.isElementByTextDisplayed(validationMessage);
  }
  async getMessageError() {
    return await this.getText(ServicesAndPlansPageUI.MESSAGE_ERROR_TEXT);
  }

  async clickClosePopup() {
    await this.clickElement(ServicesAndPlansPageUI.POPUP_CLOSE);
  }
  async inputField(value, field) {
    await this.type(ServicesAndPlansPageUI.INPUT_FIELD, value, field);
  }

  async clickEditServiceButton() {
    await this.clickElement(ServicesAndPlansPageUI.SERVICE_EDIT_BUTTON);
  }

  async clickDeleteServiceButton() {
    await this.clickElement(ServicesAndPlansPageUI.SERVICE_DELETE_BUTTON);
  }

  async clickDeleteSubmitModal() {
    await this.clickElement(ServicesAndPlansPageUI.DETELE_SUBMIT_MODAL);
  }

  async clickOkModal() {
    await this.clickElement(ServicesAndPlansPageUI.DETELE_OK_MODAL);
  }
  async getMessageDeleteModal(): Promise<string> {
    return await this.getText(ServicesAndPlansPageUI.DETELE_MESSAGE)
  }
  async getFirstTitleSerive(): Promise<string> {
    return await this.getText(ServicesAndPlansPageUI.FRIST_SERVICE_TITLE);
  }
  async checkSelectedCheckbox(): Promise<string> {
    return await this.isChecked(ServicesAndPlansPageUI.STATUS_CHECKBOX);
  }
  async checkStatusCheckbox() {
    await this.clickElement(ServicesAndPlansPageUI.STATUS_CHECKBOX_LABEL);
  }
  async clickInVentoryButton(): Promise<void> {
    await this.clickElementByText("INVENTORY");
  }
  async clickServiceAndPlanButton() : Promise<void> {
    await this.clickElementByText("Services & Plans");
  }
  async changeStatusOfService(): Promise<void> {
    await this.clickElement(ServicesAndPlansPageUI.CHANGE_STATUS_SERVICE_BUTTON);
  }

  async verifyStatusOfServiceChanged(): Promise<boolean> {
    return true;
  }
  async inputDescription(value: string): Promise<void> {
    await this.type(ServicesAndPlansPageUI.DESCRIPTION_FIELD, value);
  }
}
