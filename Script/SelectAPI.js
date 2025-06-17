function SelectLCL(){
  SelectAPI("Carotrans LCL", "Vanguard LCL", "ECU Worldwide", "Shipco WWA");
}

function SelectGroundAPIs(){
  SelectAPI("ITG", "Xenon");
}

function SelectFirstGroundAndFCLAPIs(){
  SelectAPI("Evergreen Spot");
}
function SelectLatestGroundAndFCLAPIs(){
  SelectAPI("ITG","Maersk Spot","Xenon");
}
function SelectFCLAPISIncomplete(){
  SelectAPI("Evergreen Spot", "Maersk Spot");
}

function SelectLCLAnd7LPortal(){
  SelectAPI("7L Portal","Carotrans LCL", "Vanguard LCL", "ECU Worldwide", "Shipco WWA");
}

function Select7LPortal(){
  SelectAPI("7L Portal");
}


function SelectAPI() {
    var apiList = [];
     for (var i = 0; i < arguments.length; i++) {
        apiList.push(arguments[i]);
    }

    for (var j = 0; j < apiList.length; j++) {
        var api = apiList[j];
        var xpath = "//span[normalize-space(text())='" + api + "']";
        var element = Aliases.browser.pageQms.FindElement(xpath);
        
        if (element.Exists) {
            element.Click();
            Log.Message("Selected: " + api);
        } else {
            
            Log.Warning("The element was not found " + api);
        }
    }
}

