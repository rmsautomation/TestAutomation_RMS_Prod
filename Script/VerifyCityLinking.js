function VerifyCityLinking(baseUrl) {
  var xpath = "//div[contains(@class, 'mat-mdc-tooltip-trigger ng-star-inserted')]";
  
  // Combine the base URL with the relative path to the city linking page
  var fullUrl = baseUrl + "qms/#/control-panel/city-linking";
  
  // Access the page using the dynamic URL
  var elements = Sys.Browser("chrome").Page(fullUrl).EvaluateXPath(xpath);

  if (elements !== null) {
    for (var i = 0; i < elements.length; i++) {
      var element = elements[i];
      if (element.contentText.trim() === 'USLAX') {
        element.Click();
        
        // Perform the deletion actions
        Aliases.browser.pageQms.buttonDelete_PrepaidCollect.click();
        Aliases.browser.pageQms.buttonYes_DeletePrepaidCollect.ClickButton();
        Aliases.browser.pageQms.panelCityLinkingSuccessfully2.click();
        
        Log.Message('"USLAX" was deleted');
        break; // Exit the loop after clicking
      }
    }
  } else {
    Log.Warning("No elements found matching the XPath.");
  }
}
