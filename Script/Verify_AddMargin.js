
function Verify_AddMarginOLD(margin) {
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

function Verify_AddMargin(margin) {

  // Force numeric conversion
  margin = parseFloat(margin);

  if (isNaN(margin)) {
    Log.Error("Margin parameter is not numeric: " + margin);
    return false;
  }

  if (!Project.Variables.original_margin || !Project.Variables.new_margin) {
    Log.Error("One or more margin variables are null");
    return false;
  }

  var originalMargin = parseFloat(
    Project.Variables.original_margin.replace(/[^\d.-]/g, "")
  );

  var actualResult = parseFloat(
    Project.Variables.new_margin.replace(/[^\d.-]/g, "")
  );

  var expectedResult = originalMargin + margin;

  var decimalExpected = parseFloat(expectedResult.toFixed(2));
  var decimalActual = parseFloat(actualResult.toFixed(2));

  Log.Message(
    "DEBUG → original: " + originalMargin +
    " | margin added: " + margin +
    " | expected: " + decimalExpected +
    " | actual: " + decimalActual
  );

  if (decimalActual === decimalExpected) {
    Log.Message("✔ The result is correct");
    return true;
  } else {
    Log.Error(
      "✖ The result is incorrect",
      "Expected: " + decimalExpected + " | Actual: " + decimalActual
    );
    return false;
  }
}

