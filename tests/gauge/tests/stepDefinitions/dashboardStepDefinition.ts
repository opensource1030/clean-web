import { Step } from "gauge-ts";
import { expect } from "chai";
import DashboardPage from "../pages/actions/dashboard.po";
import AbstractPage from "../pages/actions/abstract.po";

const dashboardPage: DashboardPage = new DashboardPage();
const abstractPage: AbstractPage = new AbstractPage();

export default class InventoryStepDefinition {
  @Step("User click Upgrade Device button")
  public async clickUpgradeDeviceButton() {
    await dashboardPage.clickGotItButton();
    await dashboardPage.clickUpgradeDeviceButton();
  }

  @Step("Verify Upgrade Device pop up appears")
  public async verifyUpgradeDevicePopUpDisplay() {
    expect(await dashboardPage.isUpgradeDevicePopupAppears()).to.be.true;
  }
  @Step("User click Bill Details button")
  public async clickBillDetailsButton() {
    await dashboardPage.clickGotItButton();
    await dashboardPage.clickBillDetailsButton();
  }

  @Step("Verify Bill Details pop up appears")
  public async verifyBillDetailsPopUpDisplayed() {
    expect(await dashboardPage.isBillMonthTextDisplayed()).to.be.true;
  }

  @Step("Select issue at Contact support dropdown")
  public async selectContactSupportIssue() {
    await dashboardPage.clickGotItButton();
    await dashboardPage.selectContactSupportOption();
  }

  @Step("Input all required filed")
  public async inputAllRequiredField() {
    await dashboardPage.inputDescription();
    await dashboardPage.inputMobilenumber();
  }

  @Step("Click Submit Ticket button")
  public async clickSubmitTicketButton() {
    await dashboardPage.clickSubmitTicketButton();
  }

  @Step("Verify user can submit ticket successful")
  public async verifyUserCanSubmitTicket() {
    expect(await dashboardPage.isSucessSubmitTicketDisplayed()).to.be.true;
  }

  @Step("User click Report on left menu")
  public async userClickReportButton() {
    await dashboardPage.clickGotItButton();
    await abstractPage.navigateByLeftMenu('REPORT');
  }

  @Step("Veriy Report left menu appears")
  public async verifyReportLefyMenuDisplayed() {
    expect(await dashboardPage.isChargeButtonDisplay()).to.be.true;
  }
  @Step("User click Inventory on left menu")
  public async implementation3211ab181ca479695ecc() {
    await abstractPage.navigateByLeftMenu('INVENTORY');
  }

  @Step("Veriy Inventory left menu appears")
  public async verifyInventoryLeftMenuDisplayed() {
    expect(await dashboardPage.isEquipmentsButonisplayed()).to.be.true;
  }

  @Step("User click Package on left menu")
  public async implementation702ad569a3d9d285da43() {
    await abstractPage.navigateByLeftMenu('PACKAGES');
  }

  @Step("Veriy Package left menu appears")
  public async verifyPackageLeftMenuisplayed() {
    expect(await dashboardPage.isViewAllPackageButtonextDisplayed()).to.be.true;
  }

  @Step("User click Continue button - upgarde for himself")
  public async clickContinueButtonForHimself() {
    await dashboardPage.clickOrderForMyselfContinueButton();
  }

  @Step("User click Continue button  - upgarde for other")
  public async clickContinueButtonForOther() {
    await dashboardPage.clickOrderForOtherContinueButton();
  }

  @Step("User select Subsided Device")
  public async selectSubsidedDevice() {
    await dashboardPage.selectDeviceCapacity();
    await dashboardPage.selectColorForDevice();
    await dashboardPage.clickRequestDeviceButton();
  }
  @Step("User select Carrier Category")
  public async selectCarrierCategory() {
    await dashboardPage.selectCategoryCarrier();
  }

  @Step("User submit Order request")
  public async clickSubmitOrderRequest() {
    await dashboardPage.clickSubmitOrderButton();
  }

  @Step("Verify Submit Order successful")
  public async verifySubmitOrderSuccessful() {
    expect(await dashboardPage.isOrderSubmittedPopUpDisplayed()).to.be.true;
    await dashboardPage.clickGotItOrderButton();
  }

  @Step("User switch Change carrier to Yes")
  public async switchCarrierToYest() {
    await dashboardPage.changeSwitchButtonToYes();
  }

  @Step("User select User for Order")
  public async selectUserForOrder() {
    await dashboardPage.selectUserForOrder();
  }

  @Step("User click Transfer Wireless Services Liability button")
  public async clickTransferWirelessServicesLiabilityButton() {
    await dashboardPage.clickGotItButton();
    await dashboardPage.clickTransferWirelessServicesLiabilityButton();
  }

  @Step("User input all valid information")
  public async inputValidInformation() {
    await dashboardPage.inputExistingCarrier();
    await dashboardPage.inputPhoneNumber();
    await dashboardPage.inputAccountName();
    await dashboardPage.inputAccountNumber();
    await dashboardPage.inputBillingPassword();
    await dashboardPage.selectTranserType();
  }

  @Step("User keep existing wireless")
  public async userKeepExistingWireless() {
    await dashboardPage.changeSwitchButtonToYes();
    await dashboardPage.clickNextButton();
  }

  @Step("User change option Need a new device to Yes and click Next button")
  public async userChangeToNeedANewDevice() {
    await dashboardPage.changeSwitchButtonToYes();
    await dashboardPage.clickNextButton();
  }
  @Step("User change option Need a new device to Yes and select Category")
  public async userChangeToNeedANewDeviceAndSelectCategort() {
    await dashboardPage.clickNextButton();
    await dashboardPage.changeSwitchButtonToYes();
    await dashboardPage.selectCategoryCarrier();
  }

  @Step("User click Next button without input information")
  public async clickNextButton() {
    await dashboardPage.clickNextButton();
  }

  @Step("Verify error message is appeared")
  public async verifyErrorMessageDisplayed() {
    expect(await dashboardPage.isErrorMessageDisplayed()).to.be.true;
  }
}
