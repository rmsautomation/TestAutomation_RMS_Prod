function Tariff_page(){
  // Supongamos que originalText es una variable que contiene el texto
var total_tariff_text = Project.Variables.tariffBefore_add;
var match = total_tariff_text.match(/of\s+(\d+)/);
if (match) {
  var total_tariffBefore = Number(match[1]);
  if (!isNaN(total_tariffBefore)) {
    Log.Message("Total Tariff Before Add is: " + total_tariffBefore);
  var tariff_afterAdd=Project.Variables.tariffAfter_add;
  var tariffAfter_string = tariff_afterAdd.match(/of\s+(\d+)/);
  var total_tariff = Number(tariffAfter_string[1]);
    if (total_tariffBefore+1 === total_tariff) {
      Log.Message("Total Tariff" + total_tariff + " is correct. The test Pass");
    } else {
      Log.Error("Total Tariff" + total_tariff + " is incorrect. The test FAIL");
    }
  } 
  else {
    Log.Error("The value is not correct");
  }
} else {
  Log.Error("The is not a number after of");
  }
}