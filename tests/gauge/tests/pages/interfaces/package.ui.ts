export default class PackagePageUI {
  // static LABEL_CONDITION_DROPDOWN = 'xpt=//span[contains(text(),"Select a Label")]';
  static LABEL_CONDITION_DROPDOWN = 'xpt=//strong[contains(text(),"Label")]/..//div/span';
  static LABEL_CONDITION_VALUE ='xpt=//span[contains(text(),"Cost Center")]';
  static CONDITION_DROPDOWN = 'xpt=//strong[contains(text(),"Condition")]/..//div/span';
  static CONDITION_VALUE ='xpt=//span[text()="contains"]';
  static VALUE_DROPDOWN = 'xpt=//strong[contains(text(),"Value")]/..//div/span';
  static VALUE_VALUE ='xpt=//span[text()="100"]';
  static PRESET ='xpt=//div[contains(text(),"preset-01")]';
  static SAMPLE_DEVICE = 'xpt=//div[@class="card-body"]/div[text()="Sample Name"]';
  static IPHONE_DEVICE = 'xpt=//div[@class="card-body"]/div[text()="iPhone 8 plus"]';
  static FIRST_SERVICE = 'xpt=(//h4[text()="Carriers Available"]/..//div[@class="card-body"])[1]';
  static ADDRESS = 'xpt=//div[@class="card-body" and contains(text(),"Washington")]';
  static APPROVAL_FIELD = 'xpt=//input[@class="form-control"]';
  static TITLE_FIELD ='xpt=//strong[contains(text(),"Title")]/../input';
  static CREATE_PACKAGE_BUTTON ='xpt=//button/span[contains(text(),"Create Package")]';
  static PACKAGE_CREATED_MESSAGE ='xpt=//div[contains(text(),"Requested Package is created.")]';
  static OK_BUTTON='xpt=//button[text()="OK"]';
  static EDIT_BUTTON = 'xpt=(//a[@class="btn btn-warning"]/i)[1]';
  static UPDATE_PACKAGE_BUTTON ='xpt=//button/span[contains(text(),"Update Package")]';
  static PACKAGE_UPDATED_MESSAGE ='xpt=//div[contains(text(),"Requested Package is updated.")]';
  static DELETE_BUTTON = 'xpt=(//a[@class="btn btn-danger"])[1]';
  static PACKAGE_NAME = 'xpt=(//table//tbody/tr/td)[3]';
}