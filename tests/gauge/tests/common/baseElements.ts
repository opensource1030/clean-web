import { format } from "util";
import { $, button, ElementWrapper, locator } from "taiko";

export default class BaseElements {

  async findElement(locator: string, param?: string): Promise<ElementWrapper> {
    let control: locator;
    locator = param ? format(locator, param) : locator;
    if (locator.startsWith("xpt=") || locator.startsWith("css=")) {
      locator = locator.substring(4);
      control = await $(locator);
    } else if (locator.startsWith("button=")) {
      locator = locator.substring(7);
      control = await button(locator);
    }
    return control;
  }
}
