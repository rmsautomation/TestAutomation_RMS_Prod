
function Verify_AddMargin(margin) {
  // Remove " USD" from original_margin and convert to number
  var originalMargin = Number(Project.Variables.original_margin.replace(" USD", ""));

  // Perform the addition
  var actualResult = Number(Project.Variables.new_margin.replace(" USD", ""));
  var expectedResult = margin + originalMargin;
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
