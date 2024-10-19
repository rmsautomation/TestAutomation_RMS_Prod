//NEW
function CheckQuotedByColumn() {
  // XPath to locate all relevant cells
  var cellsXPath = "//mat-cell[contains(@class, 'cdk-column-user_request-app_user-user_first_name--user_request-app_user-user_last_name')]";
  var cells = Aliases.browser.pageQms.FindElements(cellsXPath);
  
  if (cells.length === 0) {
    Log.Error("No cells found for the specified XPath.");
    return;
  }
  
  var foundDifferentText = false;
  
  // Loop through each cell and check the text content
  for (var i = 0; i < cells.length; i++) {
    var cellText = cells[i].textContent.trim(); // Get the text content and trim extra spaces
    
    // Check if the text is different from 'Aylin_UPS Rodriguez Magaya'
    if (cellText !== "Aylin_UPS Rodriguez Magaya") {
      foundDifferentText = true;
      Log.Message("Found different text: " + cellText + ". Test Passed.");
      break; // Exit the loop as we've found a different text
    }
  }
  
  // If no different text was found, fail the test
  if (!foundDifferentText) {
    Log.Error("No different text found. Test Failed.");
  }
}


