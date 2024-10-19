function Quotes_page(){
  // Supongamos que originalText es una variable que contiene el texto
var total_quotes_text = Project.Variables.total_quotes;
var match = total_quotes_text.match(/of\s+(\d+)/);
if (match) {
  var total_quotes = Number(match[1]);
  if (!isNaN(total_quotes)) {
    Log.Message("The total number of quotes is: " + total_quotes);
  var user_quotes_var=Project.Variables.user_number_quotes;
  var user_quotes_string = user_quotes_var.match(/of\s+(\d+)/);
  var user_quotes = Number(user_quotes_string[1]);
    if (user_quotes < total_quotes) {
      Log.Message("User quotes " + user_quotes + " is less than" + total_quotes + ". Test Pass");
    } else {
      Log.Error("User quotes " + user_quotes + " does not less than " + total_quotes + ". The Test fail.");
    }
  } 
  else {
    Log.Error("The value is not correct");
  }
} else {
  Log.Error("The is not a number after of");
  }
}

