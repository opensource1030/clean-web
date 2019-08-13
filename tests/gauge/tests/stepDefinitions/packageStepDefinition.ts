import { Step } from "gauge-ts";
import { expect } from "chai";
import PackagePage from "../pages/actions/package.po";
import AbstractPage from "../pages/actions/abstract.po";
import PackageUI from "../pages/interfaces/package.ui";
import { dropDown } from "taiko";

const packagePage: PackagePage = new PackagePage();
const abstractPage: AbstractPage = new AbstractPage();
let packageNameVerify;
export default class PackageStepDefinition {

    @Step("User open Package dropdown")
    public async userOpenPackageDropdown() {
        await packagePage.clickPackageButton();
    }

    @Step("User go to Create Package page")
    public async userGotoCreatePackagePage() {
        await packagePage.clickCreatePackageButton();
    }

    @Step("User set the procurement condition")
    public async userSetProcurementCondition() {
        await packagePage.selectLabelConditions();
        await packagePage.selectCondition();
        await packagePage.selectValue();
    }

    @Step("User select Preset")
    public async userSelectPreset() {
        await packagePage.selectPreset();
    }

    @Step("User select 1st device")
    public async userSelect1stDevice() {
        await packagePage.selectSampleDevice();
    }

    @Step("User select 2nd device")
    public async userSelect2ndDevice() {
        await packagePage.selectIphoneDevice();
    }

    @Step("User select Service")
    public async userSelectService() {
        await packagePage.selectService();
    }

    @Step("User select Address")
    public async userSelecAdress() {
        await packagePage.selectAdress();
    }

    @Step("User input EazyVista at approval code")
    public async inputApproval() {
        await packagePage.inputApprovalField("EazyVista");
    }

    @Step("User input Title field")
    public async inputTitleField() {
        let title = "";
        title = await packagePage.genRandomString();
        await packagePage.inputTitleField("Automation Testing" + title);
    }

    @Step("User click Create Package button")
    public async clickCreatePackageButton2() {
        await packagePage.clickCreatePackageButton2();
    }

    @Step("Verify admin can create new package and approval code is EazyVista")
    public async VerifyPackageCreated() {
        expect(await packagePage.isCreatePackagedMessageDisplayed()).to.be.true;
        await packagePage.clickOkButton();
    }

    @Step("User click View All Package Button")
    public async clickViewAllPackageButton() {
        await packagePage.clickViewAllPackageButton();
    }

    @Step("User click Edit button")
    public async click1stEditButton() {
        await packagePage.clickEditButton();
    }

    @Step("User update title")
    public async updateTitle() {
        let title = "";
        title = await packagePage.genRandomString();
        await packagePage.inputTitleField("Title Update " + title);
    }

    @Step("User click Update button")
    public async clickUpdatePackageButton() {
        await packagePage.clickUpdatePackageButton();
    }

    @Step("Verify title is updated")
    public async VerifyPackageUpdated() {
        expect(await packagePage.isUpdatedPackagedMessageDisplayed()).to.be.true;
        await packagePage.clickOkButton();
    }

    @Step("User click delete package button")
    public async deletePackage() {
        packageNameVerify = await packagePage.getName1stPackage();
        await packagePage.deletePackage();
    }

    @Step("Verify package is deleted")
    public async VerifyPackageDeleted() {
        await console.log("This bug is fail follow but User can not delete a package #503");
        expect(await packagePage.isPackageDisplayed(packageNameVerify)).to.be.false;
    }
}
