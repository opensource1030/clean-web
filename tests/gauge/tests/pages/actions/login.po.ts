import AbstractPage from "./abstract.po";
import LoginPageUI from "../interfaces/login.ui";
import Constants from "../../common/constants";

export default class LoginPage extends AbstractPage {
  constructor() {
    super();
  }

  async inputIntoEmail(email: string): Promise<void> {
    await this.waitForElementExisting(LoginPageUI.EMAIL_INPUT);
    await this.type(LoginPageUI.EMAIL_INPUT, email);
  }

  async inputIntoPassword(password: string): Promise<void> {
    await this.type(LoginPageUI.PASSWORD_INPUT, password);
  }

  async clickSignInButton(): Promise<void> {
    await this.clickElement(LoginPageUI.SIGN_IN_BUTTON);
  }

  async getErrorMessage(): Promise<string> {
    return await this.getText(LoginPageUI.ERROR_MSG);
  }

  async loginAsRole(role: string): Promise<void> {
    let email = '';
    switch (role) {
      case 'Admin': {
          email = Constants.COMPANY_ADMIN_EMAIL;
          break;
      }
      case 'Global Admin': {
          email = Constants.GLOBAL_ADMIN_EMAIL;
          break;
      }
    }
    // // Below code for login with company email verification site
    await this.type(LoginPageUI.COMPANY_EMAIL_VALIDATION_INPUT, email);
    await this.clickElement(LoginPageUI.SIGN_IN_BUTTON);

    // await this.type(LoginPageUI.EMAIL_INPUT, email);
    await this.type(LoginPageUI.PASSWORD_INPUT, Constants.PASSWORD);
    await this.clickElement(LoginPageUI.SIGN_IN_BUTTON);
    await this.sleep(5);
  }
}
