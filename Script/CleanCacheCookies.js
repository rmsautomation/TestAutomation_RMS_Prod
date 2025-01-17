function Hooks_OnStartTestCaseOLD(Sender, StartTestCaseParams)
{
   //Opens the specified URL in a running instance of the specified browser.
  Browsers.Item(btChrome).Navigate(Project.Variables.urlEnvironment);
  //Runs a script routine.
  var options = "--user-data-dir=C:\\Temp\\TestProfile --disable-cache";
  var browser = Browsers.Item(btChrome);
  browser.RunOptions = options;
  browser.Run();
  
  Log.Message("Chrome launched with a clean profile to ensure no cookies are retained.");
  //Closes the 'BrowserWindow' window.
  Aliases.browser.BrowserWindow.Close();
}
function cleanCacheAndCookies() {
  var browser = Browsers.Item(btChrome);
  if (browser.Exists) {
    Aliases.browser.BrowserWindow.Close();
    Log.Message("Closed any existing Chrome instances.");
  }
  var options = "--disable-cache --clear-token-service --disable-application-cache";
  browser.RunOptions = options;
  browser.Run();
  Log.Message("Chrome launched with cache and cookies cleared.");
  browser.Navigate("about:blank");
  Log.Message("Navigated to 'about:blank' to complete the cache and cookies cleaning.");
  Aliases.browser.BrowserWindow.Close();
  Log.Message("Browser closed after cleaning cache and cookies.");
}
function Hooks_OnStartTestCase(Sender, StartTestCaseParams) {
 
  cleanCacheAndCookies();
  var browser = Browsers.Item(btChrome);
  browser.Run();
  Log.Message("Chrome launched for testing.");
  browser.Navigate(Project.Variables.urlEnvironment);
  Log.Message("Navigated to the specified environment URL: " + Project.Variables.urlEnvironment);
}