function VerifyAddPercentage(margin_percent) {
  var initial_BR= Number(Project.Variables.original_base_rate);
  var margin_value = (initial_BR * margin_percent) / 100;
  var new_BR_expected = initial_BR+margin_value;
var new_BR_actual=Number(Project.Variables.new_baseRate);


  if (new_BR_expected === new_BR_actual) {
    Log.Message("new_BR_actual is OK ");
  } else {
    Log.Error("new_BR_actual is wrong");
    aqObject.CheckTrue(false, "Actual value is not equal to expected value");
  }
}