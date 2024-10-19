function SelectCatapultList() {
  var switches = Aliases.browser.pageQms.FindElements("//button[@role='switch' and @type='button' and contains(@class, 'mdc-switch') and contains(@class, 'mdc-switch--selected')]");

  for (var i = 0; i < switches.length; i++) {
    var switchElement = switches[i];

    if (switchElement.getAttribute("aria-checked") === "true") {
      switchElement.Click();
    }
  }
}