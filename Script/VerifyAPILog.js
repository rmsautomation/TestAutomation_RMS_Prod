function VerifyAPILog(jsonData, effectiveExpDate, totalOriginDetention) {
  try {
    var foundAll = false;

    for (var i = 0; i < jsonData.length; i++) {
      var rule = jsonData[i];

      // ✅ Safe property access without optional chaining
      var descriptionRule = rule.tariff ? rule.tariff.name : undefined;
      var minDay = (rule.afterFreeDaysCharges && rule.afterFreeDaysCharges.length > 0) ? rule.afterFreeDaysCharges[0].minDay : undefined;
      var maxDay = (rule.afterFreeDaysCharges && rule.afterFreeDaysCharges.length > 0) ? rule.afterFreeDaysCharges[0].maxDay : undefined;
      var priceFreeTime = (rule.afterFreeDaysCharges && rule.afterFreeDaysCharges.length > 0 && rule.afterFreeDaysCharges[0].rate) 
                          ? rule.afterFreeDaysCharges[0].rate.amount 
                          : undefined;
      var freeDaysNumber = rule.freeDays ? rule.freeDays.number : undefined;
      var validityDateFrom = rule.validityDateFrom; // "2025-07-26"

      Log.Message("Checking rule: " + descriptionRule);

      // ✅ Compare descriptionRule
      if (descriptionRule !== Project.Variables.descriptionRule) {
        Log.Warning("DescriptionRule mismatch. Expected: " + Project.Variables.descriptionRule + " | Found: " + descriptionRule);
        continue;
      }

      // ✅ Compare minDay
      if (minDay !== Project.Variables.minDay) {
        Log.Warning("minDay mismatch. Expected: " + Project.Variables.minDay + " | Found: " + minDay);
        continue;
      }

      // ✅ Compare maxDay
      if (maxDay !== Project.Variables.maxDay) {
        Log.Warning("maxDay mismatch. Expected: " + Project.Variables.maxDay + " | Found: " + maxDay);
        continue;
      }

      // ✅ Compare priceFreeTime
      if (priceFreeTime !== Project.Variables.priceFreeTime) {
        Log.Warning("PriceFreeTime mismatch. Expected: " + Project.Variables.priceFreeTime + " | Found: " + priceFreeTime);
        continue;
      }

      // ✅ Compare freeDays.number with totalOriginDetention
      if (freeDaysNumber !== totalOriginDetention) {
        Log.Warning("FreeDays mismatch. Expected: " + totalOriginDetention + " | Found: " + freeDaysNumber);
        continue;
      }

      // ✅ Compare validityDateFrom with effectiveExpDate
      var expectedDate = new Date(validityDateFrom); // from JSON: yyyy-mm-dd
      var regex = /([A-Za-z]{3}) (\d{1,2}), (\d{4})/;
      var match = effectiveExpDate.match(regex);
      if (match) {
        var months = {
          Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
          Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11
        };
        var parsedDate = new Date(match[3], months[match[1]], match[2]);

        if (expectedDate.getFullYear() !== parsedDate.getFullYear() ||
            expectedDate.getMonth() !== parsedDate.getMonth() ||
            expectedDate.getDate() !== parsedDate.getDate()) {
          Log.Warning("ValidityDate mismatch. Expected: " + expectedDate.toISOString().split("T")[0] +
                      " | Found: " + match[0]);
          continue;
        }
      } else {
        Log.Warning("Could not parse effectiveExpDate: " + effectiveExpDate);
        continue;
      }

      // ✅ If all checks passed
      Log.Message("All values matched successfully for rule: " + descriptionRule);
      foundAll = true;
      break;
    }

    if (!foundAll) {
      Log.Error("No matching rule found in JSON for all variables.");
    }
  } catch (err) {
    Log.Error("Error in verification: " + err.message);
  }
}



function VerifyAPILogOLD(jsonResponse) {
  try {
    // --- Parse JSON safely ---
    var data = typeof jsonResponse === "string" ? JSON.parse(jsonResponse) : jsonResponse;
    if (!Array.isArray(data)) data = [data];

    var testVars = KeywordTests.TC_54_QMS_16259_CMA_API_InfoPanel_FreeTimeSuccessfulResponse.Variables;

    // --- Helper: Safe rate comparison ignoring currency ---
    function safeCompareRate(jsonValue, expectedValue, name) {
      var expectedNum = parseFloat(expectedValue.replace(/[^0-9.]/g, ""));
      var jsonNum = parseFloat(jsonValue);
      if (!isNaN(jsonNum) && !isNaN(expectedNum)) {
        if (jsonNum === expectedNum) {
          Log.Checkpoint(name + " matches: " + expectedNum);
          return true;
        } else {
          Log.Error(name + " mismatch. Expected: " + expectedNum + " | Found: " + jsonNum);
        }
      } else {
        Log.Warning(name + " could not be compared. JSON: " + jsonValue + " | Variable: " + expectedValue);
      }
      return false;
    }

    // --- Sets to validate: Origin and Destination ---
    var sets = [
      {
        suffix: "",                 // Origin
        jsonField: "origin",
        totalDetentionVar: "totalOriginDetention",
        directionName: "Export",
        tariffNameFilter: null       // no filter for Origin
      },
      {
        suffix: "Destination",      // Destination
        jsonField: "destination",
        totalDetentionVar: "totalDestinationDetention",
        directionName: "Import",
        tariffNameFilter: "Detention" // only tariffs named "Detention"
      }
    ];

    sets.forEach(function(set) {
      // Filter JSON elements by direction and tariff name if needed
      var filteredData = data.filter(function(item) {
        if (!item.direction || !item.tariff) return false;
        if (set.suffix === "Destination") {
          return item.direction.name === set.directionName && item.tariff.name === set.tariffNameFilter;
        } else {
          return item.direction.name === set.directionName;
        }
      });

      if (filteredData.length === 0) {
        Log.Warning("No JSON elements found for direction: " + set.directionName + (set.suffix === "Destination" ? " and tariff: " + set.tariffNameFilter : ""));
        return;
      }

      // --- Variables to track matches ---
      var matchedTariff = false,
          matchedLocation = false,
          matchedFreeDays = false,
          matchedCharges = false,
          matchedValidityDate = false;

      function getVar(name) { 
        return testVars[name + set.suffix]; 
      }

      filteredData.forEach(function(item) {
        var tariff = item.tariff;
        if (!tariff) return;

        // --- Tariff name check ---
        if (!matchedTariff && tariff.name) {
          var totalDetentionStr = getVar(set.totalDetentionVar);
          if (totalDetentionStr && typeof totalDetentionStr === "string" &&
              totalDetentionStr.toLowerCase().includes(tariff.name.toLowerCase())) {
            Log.Checkpoint(set.totalDetentionVar + " contains tariff name: " + tariff.name);
            matchedTariff = true;
          } else {
            Log.Error("Tariff not matched. Detail: The variable '" + totalDetentionStr + "' does not contain the tariff name '" + tariff.name + "' from the JSON.");
          }
        }

        // --- Origin / Destination name check ---
        if (!matchedLocation && tariff[set.jsonField] && tariff[set.jsonField].name === getVar("descriptionRule")) {
          Log.Checkpoint(set.jsonField + " name matches: " + getVar("descriptionRule"));
          matchedLocation = true;
        }

        // --- Conditions by equipment ---
        if (item.conditionsByEquipment && item.conditionsByEquipment.length > 0) {
          item.conditionsByEquipment.forEach(function(condition) {

            // FreeDays
            if (!matchedFreeDays && condition.freeDays && condition.freeDays.number !== undefined && condition.freeDays.number !== null) {
              var totalDetentionStr = getVar(set.totalDetentionVar);
              if (totalDetentionStr) {
                var strClean = totalDetentionStr.toString().trim();
                var extractedNumber = strClean.match(/\d+/);
                if (extractedNumber && extractedNumber.length > 0) {
                  var expectedFreeDays = parseInt(extractedNumber[0], 10);
                  if (condition.freeDays.number === expectedFreeDays) {
                    Log.Checkpoint("FreeDays number matches: " + expectedFreeDays);
                    matchedFreeDays = true;
                  } else {
                    Log.Error("FreeDays mismatch. Expected: " + expectedFreeDays + " | Found: " + condition.freeDays.number);
                  }
                } else {
                  Log.Warning("No number found in " + set.totalDetentionVar + " string: " + strClean);
                }
              } else {
                Log.Warning(set.totalDetentionVar + " is undefined or empty.");
              }
            }

            // After free days charges
            if (!matchedCharges && condition.afterFreeDaysCharges && condition.afterFreeDaysCharges.length > 0) {
              condition.afterFreeDaysCharges.forEach(function(charge) {
                if (charge.dayFrom.toString() === getVar("minDay") &&
                    charge.dayTo.toString() === getVar("maxDay")) {
                  Log.Checkpoint("Found matching dayFrom/dayTo: " + getVar("minDay") + "/" + getVar("maxDay"));
                  if (safeCompareRate(charge.rate, getVar("priceFreeTime"), "Rate")) {
                    matchedCharges = true;
                  }
                }
              });
            }

          });
        }

        // --- Validity Date ---
        if (!matchedValidityDate && tariff.validityDateFrom) {
          var jsonDate = new Date(tariff.validityDateFrom);
          var effectiveDateStr = getVar("effectiveExpDate");
          
          if (effectiveDateStr) {
            // Se limpia la cadena de la variable para eliminar el texto extra
            var cleanVarDateStr = effectiveDateStr.split(' - ')[0].trim();
            var varDate = new Date(cleanVarDateStr);

            if (!isNaN(jsonDate.getTime()) && !isNaN(varDate.getTime())) {
              if (jsonDate.getTime() === varDate.getTime()) {
                Log.Checkpoint("Validity Date matches. JSON: " + jsonDate.toLocaleDateString() + " | Variable: " + varDate.toLocaleDateString());
                matchedValidityDate = true;
              } else {
                Log.Error("Validity Date mismatch. JSON: " + jsonDate.toLocaleDateString() + " | Variable: " + varDate.toLocaleDateString() + " (JSON: YYYY-MM-DD, Variable: M/D/YYYY)");
              }
            } else {
              Log.Error("Invalid date format. Could not parse JSON date: " + tariff.validityDateFrom + " or Variable date: " + effectiveDateStr);
            }
          } else {
            Log.Warning("effectiveExpDate variable undefined or empty for " + set.suffix);
          }
        }

      }); // end filteredData.forEach

      // --- Final checks per set ---
      if (!matchedTariff) Log.Error("Tariff/" + set.totalDetentionVar + " not matched.");
      if (!matchedLocation) Log.Error(set.jsonField + " not matched.");
      if (!matchedFreeDays) Log.Error("FreeDays not matched.");
      if (!matchedCharges) Log.Error("afterFreeDaysCharges not matched.");
      if (!matchedValidityDate) Log.Error("Validity Date not matched.");

    }); // end sets.forEach

  } catch (e) {
    Log.Error("Error in VerifyAPILog: " + e.message);
  }
}