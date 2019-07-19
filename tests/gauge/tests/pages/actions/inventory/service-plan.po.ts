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

  async clickSaveButton(): Promise<void> {
    await this.clickElementByText('Save Changes');
  }

  async isNewServiceValidationDisplayed(validationMessage: string): Promise<boolean> {
    return await this.isElementByTextDisplayed(validationMessage);
  }
}
