export default class AbstractPageUI {
  static DYNAMIC_ELEMENT_BY_TEXT = 'xpt=//*[normalize-space(text())="%s"]';
  static DYNAMIC_TEXT_FIELD_BY_LABEL = 'xpt=//label[*[text()="%s"]]//input';
  static DYNAMIC_RADIO_BUTTON_BY_LABEL = 'xpt=//*[normalize-space(text())="%s"]/..//input';
  static BREADCRUMB = 'css=.breadcrumb';

    // Left menu
  static LOGO_IMG = 'css=img[title="Client Logo"]';
  static HAMBURGER_BUTTON = 'css=button[display=md] span[class= navbar-toggler-icon]';
  static DYNAMIC_ELEMENT_LEFT_MENU_BY_TEXT = 'xpt=//nav[@class="sidebar-nav"]//*[normalize-space(text())="%s"]';

}
