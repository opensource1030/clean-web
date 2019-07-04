import BaseAction from "../../common/baseAction";
import AbstractPageUI from "../interfaces/abstract.ui";
import { format } from "util";

export default class AbstractPage extends BaseAction {
  constructor() {
    super();
  }

  async clickHamburgerButton(): Promise<void> {
    await this.waitForElementExisting(AbstractPageUI.HAMBURGER_BUTTON);
    await this.sleep(3);
    await this.clickElement(AbstractPageUI.HAMBURGER_BUTTON);
  }

  async inputTextFieldByLabel(label: string, value: string): Promise<void> {
    await this.type(AbstractPageUI.DYNAMIC_TEXT_FIELD_BY_LABEL, value, label);
  }

  async selectDropdownByLocatorAndValue(locator: string, value: string) {
    await this.clickElement(locator);
    await this.sleep(2);
    await this.clickElement(AbstractPageUI.DYNAMIC_ELEMENT_BY_TEXT, value);
  }

  async clickCheckboxByLabel(label: string) {
    await this.clickElement(AbstractPageUI.DYNAMIC_RADIO_BUTTON_BY_LABEL, label);
  }

  async navigateByLeftMenu(menu: string, submenu?: string): Promise<void> {
    await this.clickElement(AbstractPageUI.DYNAMIC_ELEMENT_LEFT_MENU_BY_TEXT, menu);
    if (submenu !== null) {
      await this.clickElement(AbstractPageUI.DYNAMIC_ELEMENT_LEFT_MENU_BY_TEXT, submenu);
    }
  }

  async clickElementByText(text: string): Promise<void> {
    await this.waitForElementExisting(AbstractPageUI.DYNAMIC_ELEMENT_BY_TEXT, text);
    await this.clickElement(AbstractPageUI.DYNAMIC_ELEMENT_BY_TEXT, text);
  }

  async isElementByTextDisplayed(text: string): Promise<boolean> {
    return await this.isElementDisplayed(AbstractPageUI.DYNAMIC_ELEMENT_BY_TEXT, text);
  }
}
