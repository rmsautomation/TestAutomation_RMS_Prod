function VerifyValuesAfterRefreshingQuote() {
    var values = [
        {name: "contract_id", original: Project.Variables.contract_id_original, new: Project.Variables.new_contract_id},
        {name: "commodity", original: Project.Variables.commodity_original, new: Project.Variables.new_commodity}
    ];
    
    for (var i = 0; i < values.length; i++) {
        var name = values[i].name;
        var original = values[i].original;
        var newValue = values[i].new;
        
        if (aqString.Compare(original, newValue, true) === 0) {
            Log.Message(name + " values are equal: " + original);
        } else {
            Log.Error(name + " values are not equal. Original: " + original + ", New: " + newValue);
        }
    }
    
}

