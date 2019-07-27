import BaseElements from "./baseElements";
import { click, write, clear, ElementWrapper, waitFor, currentURL, evaluate } from "taiko";
import Constants from "./constants";

const defaultOption = Constants.timeout;
export default class BaseAction extends BaseElements {
  constructor() {
    super();
  }
  async clickElement(locator: string, param?: string): Promise<void> {
    try {
      const element: ElementWrapper = param ? await this.findElement(locator, param) : await this.findElement(locator);
      await click(element, defaultOption);
    } catch (error) {
      console.log(error);
    }
  }

  async type(locator: string, value: string, param?: string): Promise<void> {
    try {
      const element: ElementWrapper = param ? await this.findElement(locator, param) : await this.findElement(locator);
      await clear(element, defaultOption);
      await write(value, element, defaultOption);
    } catch (error) {
      console.log(error);
    }
  }

  async waitForElementExisting(locator: string, param?: string): Promise<void> {
    try {
      const element: ElementWrapper = param ? await this.findElement(locator, param) : await this.findElement(locator);
      await waitFor(async () => (await element.exists()), defaultOption.navigationTimeout);
    } catch (error) {
      console.log(error);
    }
  }

  async getText(locator: string, param?: string): Promise<string> {
    try {
      let returnText = "";
      const element: ElementWrapper = param ? await this.findElement(locator, param) : await this.findElement(locator);
      await element.exists();
      returnText = await element.text();
      return returnText;
    } catch (error) {
      console.log(error);
    }
  }

  async isElementDisplayed(locator: string, param?: string): Promise<boolean> {
    try {
      const element: ElementWrapper = param ? await this.findElement(locator, param) : await this.findElement(locator);
      return await element.exists();
    } catch (error) {
      return false;
    }
  }

  async isChecked(locator: string, param?: string): Promise<string> {
    try {
      const element: ElementWrapper = param ? await this.findElement(locator, param) : await this.findElement(locator);
      return await evaluate(element, (elem) => elem.getAttribute('value'));
    } catch (e) {
      console.log(e);
    }
  }

  async getCurrentUrl(): Promise<string> {
    try {
      return await currentURL();
    } catch (error) {
      console.log(error);
    }
  }

  async sleep(second: number) {
    return await new Promise(resolve => setTimeout(resolve, second * 1000));
  }

  async genRandomString(): Promise<string> {
    try {
    let returnText = "";
    returnText = Math.floor((Math.random() * 10000) + 1).toString();
    return returnText;
    } catch (error) {
      console.log(error);
    }
  }
}
