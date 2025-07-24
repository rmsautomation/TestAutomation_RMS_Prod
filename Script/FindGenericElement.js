function FindGenericElement(variable) {
  // Build the XPath with the dynamic value
  let xpath = "//div[contains(@class, 'node-content-wrapper') and .//span[contains(normalize-space(.), '" + variable + "')]]";

  // Find the element using the XPath
  let element = Aliases.chrome.pageQms2.FindElement(xpath);

  // Check if the element exists
  if (element.Exists) {
    Log.Message("Element found: " + variable);
    return element;
  } else {
    Log.Error("Element not found: " + variable);
    return null;
  }
}

function clickElementByTextContractID(textParam) {
  // Build the XPath using the input parameter
  let xpath = "//span[@aria-describedby=(//div[.='" + textParam + "']/@id)]";
  
  // Find the element
  let element = Aliases.browser.pageQms.FindElement(xpath);
  
  if (element.Exists) {
    element.Click();
    Log.Message("Clicked on the element associated with: " + textParam);
  } else {
    Log.Error("Element not found for text: " + textParam);
  }
}

function clickAMDByText(textParam) {
  // Construye el XPath con el texto recibido como parámetro
  let xpath = "(//span[@aria-describedby=(//div[.='" + textParam + "']/@id)])[2]";
  
  // Busca el segundo elemento que coincida
  let element = Aliases.browser.pageQms.FindElement(xpath);

  if (element.Exists) {
    element.Click();
    Log.Message("Clicked on the second element associated with: " + textParam);
  } else {
    Log.Error("Second element not found for text: " + textParam);
  }
}



