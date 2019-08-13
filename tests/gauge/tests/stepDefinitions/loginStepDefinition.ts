import { Step, BeforeSuite } from "gauge-ts";
import { openBrowser, goto, $ } from "taiko";
import { expect } from "chai";
import LoginPage from '../pages/actions/login.po';
import Constants from "../common/constants";
const loginPage: LoginPage = new LoginPage();

export default class LoginStepDefinition {

    @Step("Enter the email <email>")
    public async inputEmail(email: string) {
        await loginPage.inputIntoEmail(email);
        await loginPage.clickSignInButton();
    }

    @Step("Verify the error message is <errorMsg>")
    public async verifyTheErrorMsg(errorMsg: string) {
        expect(await loginPage.getErrorMessage(), errorMsg);
    }

    @Step("User logged as <role>")
    public async userLoggedAs(role: string) {
        await goto(Constants.AUT_LINK);
        await loginPage.loginAsRole(role);
    }




}
