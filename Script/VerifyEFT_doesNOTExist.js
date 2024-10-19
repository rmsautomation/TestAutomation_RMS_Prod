
function VerifyElementDoesNotExist() {
  var page = Aliases.browser.pageQms;
  var elementExists = page.FindChild(["contentText"], [Project.Variables.surcharge_versionProject], 1000).Exists;
  Log.Message(elementExists);
  if (elementExists) {
    Log.Error("The EFT exists.Test Fail");
  } else {
    Log.Message("The element does not exist. Test Pass");
  }
}