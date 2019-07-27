import { Step, BeforeSuite } from "gauge-ts";
import { openBrowser, goto, $ } from "taiko";
import { expect } from "chai";
import LoginPage from '../pages/actions/login.po';
import Constants from "../common/constants";
import ServicesAndPlansPage from "../pages/actions/inventory/service-plan.po";
const loginPage: LoginPage = new LoginPage();
const servicePlanPage: ServicesAndPlansPage = new ServicesAndPlansPage();
let newServiceTitle = "";
export default class ServicesAndPlanPageStepDefinition {

    @Step("Enter the email <email>")
    public async inputEmail(email: string) {
        await loginPage.inputIntoEmail(email);
        await loginPage.clickSignInButton();
    }

    @Step("Verify the error message is <errorMsg>")
    public async verifyTheErrorMsg(errorMsg: string) {
        expect(await loginPage.getErrorMessage(), errorMsg);
    }

    @Step("User inputs all information of Service")
     public async inputAllInformationServices() {
        newServiceTitle = 'New title ' + await servicePlanPage.genRandomString();
        await servicePlanPage.inputField(newServiceTitle, 'Title');
        await servicePlanPage.inputField('Plan Code ' + await servicePlanPage.genRandomString(), 'Plan Code');
        await servicePlanPage.inputField('Cost ' + await servicePlanPage.genRandomString(), 'Cost');
        await servicePlanPage.inputDescription('Description ' + await servicePlanPage.genRandomString());
        await servicePlanPage.clickSaveButton();
        await servicePlanPage.sleep(3);
    }

    @Step("Verify user can create new Service")
    public async verifyNewServiceAppeared() {
       await servicePlanPage.clickElementByText("Services & Plans");
       expect (servicePlanPage.isElementByTextDisplayed(newServiceTitle));
    }
}