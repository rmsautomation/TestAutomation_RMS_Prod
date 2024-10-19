function verifyQuotes() {
  
  var initial_total_quotes_text = Project.Variables.initial_totalRates;
  var match = initial_total_quotes_text.match(/of\s+(\d+)/);
  if (match) {
    var initial_total_quotes = Number(match[1]);
    if (!isNaN(initial_total_quotes)) {
      Log.Message("Total Quotes is: " + initial_total_quotes);
      var final_quotes_var = Project.Variables.total_quotes;
      var final_quotes_string = final_quotes_var.match(/of\s+(\d+)/);
      if (final_quotes_string) {
        var total_quotes = Number(final_quotes_string[1]);
        if (!isNaN(total_quotes)) {
          Log.Message("Total quotes: " + total_quotes);

          // Verificar que total_quotes es igual a initial_total_quotes + 1
          if (total_quotes === initial_total_quotes + 1) {
            Log.Checkpoint("Total Quotes is correct " + total_quotes);
          } else {
            Log.Error("Expected: " + (initial_total_quotes + 1) + ", but got " + total_quotes);
          }
        } else {
          Log.Error("Error");
        }
      } else {
        Log.Error("Error");
      }
    } else {
      Log.Error("Error");
    }
  } else {
    Log.Error("Error");
  }
}

function verifyTotalRatesCommodity() {
  var initialRates = Project.Variables.totalAfterFilterSearch;
var finalRates = Project.Variables.ratesAfterCommodityFilter;

  if (initialRates === finalRates) {
    Log.Checkpoint("The variables are equal: " + finalRates);
  } else {
    Log.Error("The variables are not equal. Expected: " + initialRates + ", but got: " + finalRates);
  }
}

