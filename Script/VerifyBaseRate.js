
function VerifyBaseRate(margin) {
  // Remove " USD" from original_margin and convert to number
  var originalBR =Number(Project.Variables.original_base_rate);

  // Perform the addition
  var actualResult = Number(Project.Variables.new_baseRate);
  var expectedResult = margin + originalBR;

  // Verify the result
  if (actualResult == expectedResult) {
    Log.Message("The result is correct: " + actualResult);
    return true;
  } else {
    Log.Error("The result is incorrect. Expected: " + expectedResult + ", but got: " + actualResult);
    return false;
  }
}