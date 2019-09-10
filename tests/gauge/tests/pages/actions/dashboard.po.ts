import DashboardPageUI from "../interfaces/dashboard.ui";
import AbstractPage from "./abstract.po";
import { press, dropDown } from "taiko";
import { timingSafeEqual } from "crypto";

export default class DashboardPage extends AbstractPage {
  constructor() {
    super();
  }

  async clickGotItButton(): Promise<void> {
    if (await this.isElementDisplayed(DashboardPageUI.GOTIT_BUTTON) == true) {
      await this.clickElement(DashboardPageUI.GOTIT_BUTTON);
    } else {
      /* else block statements */
    }
  }

  async clickUpgradeDeviceButton(): Promise<void> {
    await this.clickElement(DashboardPageUI.UPGRADE_DEVICE_BUTTON);
  }

  async isUpgradeDevicePopupAppears(): Promise<boolean> {
    return await this.isElementDisplayed(DashboardPageUI.UPGRADE_DEVICE_POPUP);
  }
  async clickBillDetailsButton(): Promise<void> {
    await this.clickElement(DashboardPageUI.BILL_DETAILS_BUITTON);
  }

  async isBillMonthTextDisplayed(): Promise<boolean> {
    return await this.isElementDisplayed(DashboardPageUI.BILL_MONTH_TEXT);
  }

  async selectContactSupportOption(): Promise<void> {
    // await this.selectDropdownByValue(DashboardPageUI.CONTACT_SUPPORT_DROPDOWN, "qamms");
    // await this.clickElement(DashboardPageUI.CONTACT_SUPPORT_DROPDOWN);
  }

  async inputDescription(): Promise<void> {
    await this.type(DashboardPageUI.DESCRIPTION_TEXTAREA, "Testing");
  }

  async inputMobilenumber(): Promise<void> {
    await this.type(DashboardPageUI.MOBILE_NUMBER_FIELD, "+84764332329");
  }

  async clickSubmitTicketButton(): Promise<void> {
    await this.clickElement(DashboardPageUI.SUBMIT_TICKET_BUTTON);
  }

  async isSucessSubmitTicketDisplayed(): Promise<boolean> {
    return await this.isElementDisplayed(DashboardPageUI.SUCCESSFUL_SUBMIT_TICKET_POPUP);
  }
  async isChargeButtonDisplay(): Promise<boolean> {
    return await this.isElementDisplayed(DashboardPageUI.CHARGE_BUTTON);
  }

  async isEquipmentsButonisplayed(): Promise<boolean> {
    return await this.isElementDisplayed(DashboardPageUI.EQUIPMENTS_BUTTON);
  }

  async isViewAllPackageButtonextDisplayed(): Promise<boolean> {
    return await this.isElementDisplayed(DashboardPageUI.VIEW_ALL_PACKAGES_BUTTON);
  }

  async clickOrderForMyselfContinueButton(): Promise<void> {
    await this.clickElement(DashboardPageUI.ORDERING_FOR_MYSELF_CONTINUE_BUTTON);
  }

  async clickOrderForOtherContinueButton(): Promise<void> {
    await this.clickElement(DashboardPageUI.ORDERING_FOR_OTHER_USER_CONTINUE_BUTTON);
  }

  async changeCarrierToYes(): Promise<void> {
    if (await this.isElementDisplayed(DashboardPageUI.CHANGE_CARRIER_NO_OPTION) == true) {
      await this.clickElement(DashboardPageUI.CHANGE_CARRIER_SWITCH);
    } else {
      /* else block statements */
    }
  }

  async selectDeviceCapacity(): Promise<void> {
    await this.clickElement(DashboardPageUI.DEVICE_CAPACITY);
  }

  async selectColorForDevice(): Promise<void> {
    if (await this.isElementDisplayed(DashboardPageUI.SPACE_GREY_COLOR) == true) {
        await this.clickElement(DashboardPageUI.SPACE_GREY_COLOR);
    } else if (await this.isElementDisplayed(DashboardPageUI.WHITE_COLOR) == true) {
        await this.clickElement(DashboardPageUI.WHITE_COLOR);
    } else if (await this.isElementDisplayed(DashboardPageUI.BLACK_COLOR) == true) {
        await this.clickElement(DashboardPageUI.BLACK_COLOR);
    } else {
        await this.clickElement(DashboardPageUI.GOLD_COLOR);
    }
  }

  async clickRequestDeviceButton(): Promise<void> {
    await this.clickElement(DashboardPageUI.REQUEST_DEVICE_BUTTON);
  }

  async clickSubmitOrderButton(): Promise<void> {
    await this.clickElement(DashboardPageUI.SUBMIT_ORDER_BUTTON);
    await this.sleep(1);
  }

  async isOrderSubmittedPopUpDisplayed(): Promise<boolean> {
    return await this.isElementDisplayed(DashboardPageUI.ORDER_POPUP_SUCCESSFUL);
  }

  async clickGotItOrderButton(): Promise<void> {
    await this.clickElement(DashboardPageUI.GOT_IT_SUBMIT_ORDER);
  }

  async selectCategoryCarrier(): Promise<void> {
    await this.clickElement(DashboardPageUI.CATEGORY_OPTION);
  }

  async selectUserForOrder(): Promise<void> {
    await this.clickElement(DashboardPageUI.SELECT_USER_DROPDOWN);
    await this.clickElement(DashboardPageUI.THE_FIRST_USER_OPTION);
  }
}
