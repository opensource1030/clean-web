import { Step } from "gauge-ts";
import { expect } from "chai";
import InventoryPage from "../pages/actions/inventory.po";
import AbstractPage from "../pages/actions/abstract.po";
import InventoryPageUI from "../pages/interfaces/inventory.ui";
import { dropDown } from "taiko";

const inventoryPage: InventoryPage = new InventoryPage();
const abstractPage: AbstractPage = new AbstractPage();

export default class InventoryStepDefinition {

    @Step("User open New Device page")
    public async userOpenNewDevicePage() {
        await abstractPage.navigateByLeftMenu('INVENTORY', 'Equipments');
        await inventoryPage.clickNewDeviceButton();
    }

    @Step("User can access New Device page")
    public async verifyUserCanAcessNewDevicePage() {
        expect(await inventoryPage.isNewDevicePageDisplayed()).to.be.true;
    }

    @Step("User inputs Device Name: <deviceName>")
    public async UserInputsDeviceName(deviceName: string) {
        await inventoryPage.inputTextFieldByLabel('Device Name', deviceName);
    }

    @Step("User inputs all information for Device Overview <table>")
    public async UserInputsAllInformationForDeviceOverview(table) {
        const defaultPrice = table.rows[0].cells[0];
        const deviceType = table.rows[0].cells[1];
        const manufacturer = table.rows[0].cells[2];
        const model = table.rows[0].cells[3];
        const technical = table.rows[0].cells[4];

        await inventoryPage.inputFieldsInDeviceOverview(defaultPrice, deviceType, manufacturer, model, technical);
    }

    @Step("User inputs all information for Attributes with Capacity: <capacity>, Color: <color>")
    public async UserInputsAllInformationForAttributes(capacity: string, color: string) {
        await inventoryPage.openSectionInNewDevicePage('Attributes');
        await inventoryPage.inputFieldsInAttributes(capacity, color);
    }

    @Step("User selects provided information for Attributes with Capacity: <capacity>, Color: <color>")
    public async UserSelectsProvidedInformationForAttributes(capacity: string, color: string) {
        await inventoryPage.openSectionInNewDevicePage('Attributes');
        await inventoryPage.selectProvidedOptionInAttributes(capacity, color);
    }

    @Step("User inputs all information for Vendor with Vendor: <vendor>")
    public async UserInputsAllInformationForVendor(vendor: string) {
        await inventoryPage.openSectionInNewDevicePage('Vendors');
        await inventoryPage.inputFieldsInVendor(vendor);
    }

    @Step("User inputs all information for Companies with Company: <company>")
    public async UserInputsAllInformationForCompanies(company: string) {
        await inventoryPage.openSectionInNewDevicePage('Companies');
        await inventoryPage.inputFieldsInCompanies(company);
    }

    @Step("User selects provided company from the list of checkbox: <company>")
    public async UserSelectsProvidedCompanies(company: string) {
        await inventoryPage.openSectionInNewDevicePage('Companies');
        await inventoryPage.selectProvidedCompany(company);
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

        await inventoryPage.openSectionInNewDevicePage('Prices');
        await inventoryPage.inputFieldsInPrice(retailPrice, priceOne, priceTwo, priceOwn);
        await dropDown({"class": "capacity"}).select(cap);
        await dropDown({"class": "style"}).select(color);
        await dropDown({"class": "carrier"}).select(vendor);
        await dropDown({"class": "company"}).select(company);
    }

    @Step("User clicks Save button at New Device page")
    public async UserClicksSaveButton() {
        await inventoryPage.clickSaveButton();
    }

    @Step("Verify new device <newDevice> is submitted to the database with correct information")
    public async VerifyNewDeviceIsSubmitted(newDevice: string) {
        expect(await inventoryPage.isDeviceExistingOnList(newDevice)).to.be.true;
    }

    @Step("User leaves required fields blank at New Device page")
    public async UserLeaveRequiredFields() {
        await inventoryPage.leaveRequireFields();
    }

    @Step("Verify validations appeared on required fields at New Device page")
    public async VerifyValidationsAppearedOnRequiredFields() {
        expect(await inventoryPage.isDeviceNameValidationDisplayed()).to.be.true;
    }

}
