function hoverAtHigherPositionOnChart() {
  // Locate the <canvas> element
  var canvasElement = Aliases.browser.pageQms.FindElement("//canvas[@basechart]");
  // Check if the canvas element was found
  if (canvasElement != null) {
    // Get the dimensions of the canvas
    var canvasWidth = canvasElement.GetAttribute("width");
    var canvasHeight = canvasElement.GetAttribute("height");
    // Convert dimensions to integers
    var width = parseInt(canvasWidth);
    var height = parseInt(canvasHeight);
    // Calculate the new coordinates: 2 cm higher and 1 mm to the left
    var xCoordinate = width - 4; // 1 mm to the left (rounded to 4 pixels)
    var yCoordinate = height / 2 - 76; // 2 cm higher (rounded to 76 pixels)
 
    // Optional: Add a delay before hovering
    Delay(2000); // Delay of 2 seconds before hovering (adjust as needed)
 
    // Hover over the specified coordinates
    canvasElement.HoverMouse(xCoordinate, yCoordinate);
    // Add a delay after hovering to ensure any tooltips or interactions appear
    Delay(5000); // Delay of 5 seconds after hovering (adjust as needed)
    // Log the action
    Log.Message("Hovered at the right edge of the chart");
  } else {
    Log.Error("Canvas element not found.");
  }
}
 
 
function hoverAndGetTooltipAtCorner() {
  // Locate the <canvas> element
  var canvasElement = Aliases.browser.pageQms.FindElement("//canvas[@basechart]");
  // Check if the canvas element was found
  if (canvasElement != null) {
    // Get the dimensions of the canvas
    var canvasWidth = canvasElement.GetAttribute("width");
    var canvasHeight = canvasElement.GetAttribute("height");
    // Calculate the coordinates of the corner where the tooltip appears
    // Adjust these coordinates if necessary
    var xCoordinate = parseInt(canvasWidth) - 10; // X coordinate near the right edge
    var yCoordinate = parseInt(canvasHeight) - 10; // Y coordinate near the bottom edge

    canvasElement.HoverMouse(canvasWidth - 5, canvasHeight/2.7);

    var tooltipElement = Aliases.browser.pageQms.WaitElement("//div[@id='chartjs-tooltip']", 1000);

    if (tooltipElement != null) {
      // Get the full text from the tooltip
      var fullText = tooltipElement.textContent;
      // Use a regular expression to extract the number after "LT: "
      var ltValueMatch = fullText.match(/LT:\s*(\d+)/);
      if (ltValueMatch != null && ltValueMatch.length > 1) {
        var ltValue = ltValueMatch[1];
        Log.Message("The value after LT: is " + ltValue);
        return ltValue;
      } else {
        Log.Error("Value after 'LT: ' not found.");
      }
    } else {
      Log.Error("Tooltip not found or it is not visible.");
    }
  } else {
    Log.Error("Canvas element not found.");
  }
}
 
 
function processTooltipAndCompare() {
  // Access the variable from the project
  var xeneta_LT = Project.Variables.xeneta_LT;
 
  // Ensure xeneta_LT is a string and log its value
  if (typeof xeneta_LT === 'string') {
    Log.Message("xeneta_LT value: " + xeneta_LT);
 
    // Remove the dollar sign and any other non-numeric characters, and convert to a number
    var numericXeneta_LT = parseFloat(xeneta_LT.replace(/[^0-9.]/g, ''));
 
    // Log the numeric value to verify
    Log.Message("Numeric xeneta_LT value: " + numericXeneta_LT);
 
    // Call the hoverAndGetTooltipAtCorner function to get the tooltip value
    var tooltipValue = hoverAndGetTooltipAtCorner();
 
    // Check if tooltipLtValue is available and convert it to a number
    if (tooltipValue !== null) {
      var numericTooltipLtValue = parseFloat(tooltipValue);
      // Log the numeric tooltip value to verify
      Log.Message("Numeric tooltip LT value: " + numericTooltipLtValue);
 
      // Compare the values
      if (numericTooltipLtValue === numericXeneta_LT) {
        Log.Message("The LT value from the tooltip matches the xeneta_LT value.");
      } else {
        Log.Error("The LT value from the tooltip does not match the xeneta_LT value.");
      }
    } else {
      Log.Error("LT value from the tooltip is not available.");
    }
  } else {
    Log.Error("xeneta_LT is not a string or is undefined.");
  }
}