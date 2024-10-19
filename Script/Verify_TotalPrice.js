function Verify_TotalPrice(margin) {
 // Remove " USD" from original_margin and convert to number
  var originalTotalPrice = Project.Variables.total_price.replace(" USD", "");
  

  // Perform the addition
  var actualResult = Project.Variables.new_totalPrice.replace(" USD", "");
  var originalTotalPrice_num = parseFloat(originalTotalPrice);
  var expectedResult = margin + originalTotalPrice_num;

  // Verify the result
  if (actualResult == expectedResult) {
    Log.Message("The result is correct: " + actualResult);
    return true;
  } else {
    Log.Error("The result is incorrect. Expected: " + expectedResult + ", but got: " + actualResult);
    return false;
  }
}

function Verify_EFTChargePrice(percent, min, max) {
 // Remove " USD" from original_price?base?rate and convert to number
 var originalBR_Price_string = Project.Variables.original_base_rate.replace(" USD", "");
 var originalBR_Price = parseFloat(originalBR_Price_string);
  let calculated_expectedPrice = (originalBR_Price * percent) / 100;

    if (calculated_expectedPrice < min) {
        calculated_expectedPrice = min;
    } else if (calculated_expectedPrice > max) {
        calculated_expectedPrice = max;
    }
var actualPrice_EFTCharge_string = Project.Variables.charge_price.replace(" USD", "");
var actualPrice_EFTCharge = parseFloat(actualPrice_EFTCharge_string);
 if (actualPrice_EFTCharge ==calculated_expectedPrice ){
     if (actualPrice_EFTCharge >= min && actualPrice_EFTCharge <= max) {
    Log.Message("The Price is CORRECT");
     } else {
    Log.Error("MIN MAX is INCORRECT");
      }
    }
 else{
  Log.Error("The calculated Price is INCORRECT");
}
}



