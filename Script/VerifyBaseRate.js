﻿
function VerifyBaseRate(margin) {
  // Remove " USD" from original_margin and convert to number
  var originalBR =Number(Project.Variables.original_base_rate);

  // Perform the addition
  var actualResult = Number(Project.Variables.new_baseRate);
  var expectedResult = margin + originalBR;
  var decimalExpected = parseFloat(expectedResult.toFixed(2));
  var decimalActual = parseFloat(actualResult.toFixed(2));

  // Verify the result
  if (decimalActual == decimalExpected) {
    Log.Message("The result is correct: " + decimalActual);
    return true;
  } else {
    Log.Error("The result is incorrect. Expected: " + decimalExpected + ", but got: " + decimalActual);
    return false;
  }
}