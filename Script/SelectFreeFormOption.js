function SelectFreeFormList() {
  var unselectedSwitches = Aliases.browser.pageQms.FindElements(
    "//button[@role='switch' and @type='button' and contains(@class, 'mdc-switch mdc-switch--unselected') and @aria-checked='false']"
  );

  var switchesArray = Array.prototype.slice.call(unselectedSwitches);

  switchesArray.forEach(function(switchElement) {
    switchElement.Click();
  });
}

