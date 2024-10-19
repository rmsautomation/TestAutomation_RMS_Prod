function VarifyNAC_AfterRuleUser() {
  var total_quotesAfterRule_text = Project.Variables.actualRates_afterRule
   var expected_quotes_afterRule = Project.Variables.expectedRates_afterRule;
   if (total_quotesAfterRule_text === expected_quotes_afterRule) {
    Log.Checkpoint("The variables are equal: " + total_quotesAfterRule_text);
  } else {
    Log.Error("The variables are not equal. Expected: " + expected_quotes_afterRule + ", but got: " + total_quotesAfterRule_text);
  }
}

function verifyTotalRatesAnotherUser() {
  var initialRates = Project.Variables.ratesBeforeRule;
var totalRatesAnotherUser = Project.Variables.totalRates_anotherUser;

  if (initialRates === totalRatesAnotherUser) {
    Log.Checkpoint("The variables are equal: " + initialRates);
  } else {
    Log.Error("The variables are not equal. Expected: " + initialRates + ", but got: " + totalRatesAnotherUser);
  }
}