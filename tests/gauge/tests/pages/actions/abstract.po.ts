import BaseAction from "../../common/baseAction";
import AbstractPageUI from "../interfaces/abstract.ui";
import { format } from "util";
import { dropDown } from "taiko";

export default class AbstractPage extends BaseAction {
  constructor() {
    super();
  }

  async clickHamburgerButton(): Promise<void> {
    await this.waitForElementExisting(AbstractPageUI.HAMBURGER_BUTTON);
    await this.sleep(3);
    await this.clickElement(AbstractPageUI.HAMBURGER_BUTTON);
  }

  async getTextBreadcrumb(): Promise<string> {
    await this.waitForElementExisting(AbstractPageUI.BREADCRUMB);
    return await this.getText(AbstractPageUI.BREADCRUMB);
  }

  async inputTextFieldByLabel(label: string, value: string): Promise<void> {
    await this.type(AbstractPageUI.DYNAMIC_TEXT_FIELD_BY_LABEL, value, label);
  }

  async selectDropdownByLocatorAndValue(locator: string, value: string) {
    await dropDown().select(value);
    // TODO need update later
  }

  async clickCheckboxByLabel(label: string) {
    await this.clickElement(AbstractPageUI.DYNAMIC_RADIO_BUTTON_BY_LABEL, label);
  }

  async navigateByLeftMenu(menu: string, submenu?: string): Promise<void> {
    console.log("\nNavigate to " + menu + " > " + submenu);
    await this.waitForElementExisting(AbstractPageUI.LOGO_IMG);
    await this.waitForElementExisting(AbstractPageUI.DYNAMIC_ELEMENT_LEFT_MENU_BY_TEXT, menu);
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
