function Hooks_OnStartTestCase(Sender, StartTestCaseParams)
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