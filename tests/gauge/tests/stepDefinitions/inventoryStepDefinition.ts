import { Step } from "gauge-ts";
import { expect } from "chai";
import EquipmentPage from "../pages/actions/inventory/equipment.po";
import ServicesAndPlansPage from "../pages/actions/inventory/service-plan.po";
import AbstractPage from "../pages/actions/abstract.po";
import { dropDown } from "taiko";
import { goBack } from "taiko";
import InventoryPage from "../pages/actions/inventory.po";

const equipmentPage: EquipmentPage = new EquipmentPage();
const abstractPage: AbstractPage = new AbstractPage();
const servicePlanPage: ServicesAndPlansPage = new ServicesAndPlansPage();
const inventoryPage: InventoryPage = new InventoryPage();
let presetsName = " ";

export default class InventoryStepDefinition {

    @Step("User open New Device page")
     public async userOpenNewDevicePage() {
        await abstractPage.navigateByLeftMenu('INVENTORY', 'Equipments');
        await equipmentPage.clickNewDeviceButton();
    }

    @Step("User open New Service page")
    public async userOpenNewServicePage() {
        await abstractPage.navigateByLeftMenu('INVENTORY', 'Services & Plans');
        await servicePlanPage.clickNewServiceButton();
    }

    @Step("User can access to Service list page")
    public async userCanAccessToServicePage() {
      await abstractPage.navigateByLeftMenu('INVENTORY', 'Services & Plans');
      expect(await servicePlanPage.getServiceListTitle()).to.contain('Service plans');
    }

    @Step("User can access New Service page")
    public async verifyUserCanAcessNewServicePage() {
        expect(await equipmentPage.getTextBreadcrumb()).to.contain('Services\nCreate');
    }

    @Step("User can access New Device page")
    public async verifyUserCanAcessNewDevicePage() {
        expect(await equipmentPage.isNewDevicePageDisplayed()).to.be.true;
    }

    @Step("User inputs Device Name: <deviceName>")
    public async UserInputsDeviceName(deviceName: string) {
        await equipmentPage.inputTextFieldByLabel('Device Name', deviceName);
    }

    @Step("User inputs all information for Device Overview <table>")
    public async UserInputsAllInformationForDeviceOverview(table) {
        const defaultPrice = table.rows[0].cells[0];
        const deviceType = table.rows[0].cells[1];
        const manufacturer = table.rows[0].cells[2];
        const model = table.rows[0].cells[3];
        const technical = table.rows[0].cells[4];

        await equipmentPage.inputFieldsInDeviceOverview(defaultPrice, deviceType, manufacturer, model, technical);
    }

    @Step("User inputs all information for Attributes with Capacity: <capacity>, Color: <color>")
    public async UserInputsAllInformationForAttributes(capacity: string, color: string) {
        await equipmentPage.openSectionInNewDevicePage('Attributes');
        await equipmentPage.inputFieldsInAttributes(capacity, color);
    }

    @Step("User selects provided information for Attributes with Capacity: <capacity>, Color: <color>")
    public async UserSelectsProvidedInformationForAttributes(capacity: string, color: string) {
        await equipmentPage.openSectionInNewDevicePage('Attributes');
        await equipmentPage.selectProvidedOptionInAttributes(capacity, color);
    }

    @Step("User inputs all information for Vendor with Vendor: <vendor>")
    public async UserInputsAllInformationForVendor(vendor: string) {
        await equipmentPage.openSectionInNewDevicePage('Vendors');
        await equipmentPage.inputFieldsInVendor(vendor);
    }

    @Step("User inputs all information for Companies with Company: <company>")
    public async UserInputsAllInformationForCompanies(company: string) {
        await equipmentPage.openSectionInNewDevicePage('Companies');
        await equipmentPage.inputFieldsInCompanies(company);
    }

    @Step("User selects provided company from the list of checkbox: <company>")
    public async UserSelectsProvidedCompanies(company: string) {
        await equipmentPage.openSectionInNewDevicePage('Companies');
        await equipmentPage.selectProvidedCompany(company);
    }


    @Step("User inputs all information for Prices <table>")
    public async UserInputsAllInformationForPrices(table) {
        const retailPrice = table.rows[0].cells[0];
        const priceOne = table.rows[0].cells[1];
        const priceTwo = table.rows[0].cells[2];
        const priceOwn = table.rows[0].cells[3];
        const cap = table.rows[0].cells[4];
        const color = table.rows[0].cells[5];
        const vendor = table.rows[0].cells[6];
        const company = table.rows[0].cells[7];

        await equipmentPage.openSectionInNewDevicePage('Prices');
        await equipmentPage.inputFieldsInPrice(retailPrice, priceOne, priceTwo, priceOwn);
        await dropDown({"class": "capacity"}).select(cap);
        await dropDown({"class": "style"}).select(color);
        await dropDown({"class": "carrier"}).select(vendor);
        await dropDown({"class": "company"}).select(company);
    }

    @Step("User clicks Save button at New Device page")
    public async UserClicksSaveButton() {
        await equipmentPage.clickSaveButton();
    }

    @Step("User clicks Save button at New Service page")
    public async UserClicksSaveButtonAtNewServicePage() {
        await servicePlanPage.clickSaveButton();
    }

    @Step("Verify new device <newDevice> is submitted to the database with correct information")
    public async VerifyNewDeviceIsSubmitted(newDevice: string) {
        expect(await equipmentPage.isDeviceExistingOnList(newDevice)).to.be.true;
    }

    // @Step(["User leaves required fields blank at New Device page", "User leaves required fields blank at New Service page"])
    // public async UserLeaveRequiredFields() {
    //     // await equipmentPage.leaveRequireFields();
    //     // Do nothing here
    // }

    @Step("Verify show <message> when user empty Title field at New Serive page")
    public async UserEmptyTitleField(message: string) {
      await servicePlanPage.clickSaveButton();
      expect(await servicePlanPage.getMessageError()).to.contain(message);
      await servicePlanPage.clickClosePopup();
    }

    @Step("Verify show <message> when user empty Plan Code field at New Serive page")
    public async UserEmptyPlanCodeField(message: string) {
      await servicePlanPage.inputField('title', 'Title');
      await servicePlanPage.clickSaveButton();
      expect(await servicePlanPage.getMessageError()).to.contain(message);
      await servicePlanPage.clickClosePopup();
    }

    @Step("Verify show <message> when user empty Cost field at New Serive page")
    public async UserEmptyCostField(message: string) {
      await servicePlanPage.inputField('plan code', 'Plan Code');
      await servicePlanPage.clickSaveButton();
      expect(await servicePlanPage.getMessageError()).to.contain(message);
      await servicePlanPage.clickClosePopup();
    }

    @Step("Verify show <message> when user empty Description field at New Serive page")
    public async UserEmptyDescriptionField(message: string) {
      await servicePlanPage.inputField('cost', 'Cost');
      await servicePlanPage.clickSaveButton();
      expect(await servicePlanPage.getMessageError()).to.contain(message);
      await servicePlanPage.clickClosePopup();
    }

    @Step("Verify user can modify an existing Service")
    public async UserCanModifyAnExistingService() {
      // tslint:disable-next-line:prefer-const
      let titleUpdate = 'Title update ' + await servicePlanPage.genRandomString();
      await servicePlanPage.clickEditServiceButton();
      await servicePlanPage.inputField(titleUpdate, 'Title');
      await servicePlanPage.clickSaveButton();
      await abstractPage.sleep(3); // waiting for value update
      expect (await servicePlanPage.isElementByTextDisplayed(titleUpdate));
    //   expect(await servicePlanPage.getFirstTitleSerive()).to.contain('123');
    }

    @Step("Verify user can delete an existing Service")
    public async UserCanDeleteAnExistingService() {
      await servicePlanPage.clickDeleteServiceButton();
      await servicePlanPage.clickDeleteSubmitModal();
      await abstractPage.sleep(10);
      expect(await servicePlanPage.getMessageDeleteModal()).to.contain('Deleted!');
      await servicePlanPage.clickOkModal();
    }

    @Step("Verify user can change status of an existing Service list")
    public async UserCanChangeStatus() {
      let oldStatus = await servicePlanPage.checkSelectedCheckbox();
      await servicePlanPage.checkStatusCheckbox();
      await servicePlanPage.clickNewServiceButton();
      await goBack();
    //   oldStatus === "true"
        // ? expect(await servicePlanPage.checkSelectedCheckbox()).to.contain('false')
        // : expect(await servicePlanPage.checkSelectedCheckbox()).to.contain('true');
        try {
            // tslint:disable-next-line:prefer-const
            let newStatus = await servicePlanPage.checkSelectedCheckbox();
            if (oldStatus = newStatus) {
                return false;
             } else {
                return true;
             }
        } catch (error) {
            console.log(error);
          }
    }

    @Step("Verify validations appeared on required fields at New Device page")
    public async VerifyValidationsAppearedOnRequiredFields() {
        expect(await equipmentPage.isDeviceNameValidationDisplayed()).to.be.true;
    }

    @Step("Verify <message> appeared on New Service page")
    public async VerifyValidationsAppearedInNewServicePage(message: string) {
        expect(await servicePlanPage.isNewServiceValidationDisplayed(message)).to.be.true;
    }
    @Step("User can access Equipment Groups page")
    public async userCanAccessEquipmentGroupsPage() {
        await inventoryPage.userGoToEquipmentGroupsPage();
        expect(await inventoryPage.getCurrentUrl()).includes("presets");
    }

    @Step("User can access Equipment page")
    public async userCanAccessEquipmentPage() {
        await inventoryPage.userGoToEquipmentPage();
        expect(await inventoryPage.getCurrentUrl()).includes("devices");
    }

    @Step("Verify validate message appeared incase user hasn’t finished with the form information")
    public async verifyValidateMessageAppeared() {
        await inventoryPage.clickSaveChangeButton();
        expect(await inventoryPage.verifyIncorrectNamePopupAppeared()).to.true;
        await inventoryPage.closeIncorrectDeviceNamePopup();
    }

    @Step("User access create new equipment group page")
    public async userOpenNewEquipmentGroupPage() {
       await abstractPage.navigateByLeftMenu('INVENTORY', 'Equipment Groups');
       await inventoryPage.clickNewEquipmentGroupButton();
   }

   @Step("User input all new equipment information")
   public async userInputAllNewEquipmentInformation() {
      presetsName = "New Equiment " + await inventoryPage.genRandomString();
      await inventoryPage.inputTitleNewEquipment(presetsName);
      await inventoryPage.inputCompanyName("Oyster Labs");
      await inventoryPage.clickFindDeviceButton();
      await inventoryPage.clickShowMoreDetailsButton();
      await inventoryPage.clicDetailsCheckbox();
      await inventoryPage.clickSelectedDeviceButton();
      await inventoryPage.clickSavePreSentButton();
  }

  @Step("Verify can create new equipment group successfully")
  public async verifyNewEquipmentCreated() {
    await inventoryPage.isPresetCreated(presetsName);
 }
}
