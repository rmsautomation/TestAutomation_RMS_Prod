// Event handler function to be called when an error occurs
function OnLogError(Sender, LogParams) {
    
    var browser = Aliases.browser;
    if (browser.Exists) {
        browser.Close();
        Log.Message("Browser window has been closed.");
    } else {
        Log.Message("Browser window was not found.");
    }
}


function Hooks_OnStartTest(Sender, LogParams) {
    
    var browser = Aliases.browser;
    if (browser.Exists) {
        browser.Close();
        Log.Message("Browser window has been closed.");
    } else {
        Log.Message("Browser window was not found.");
    }
}

function Hooks_OnStopTest(Sender, LogParams) {
    
    var browser = Aliases.browser;
    if (browser.Exists) {
        browser.Close();
        Log.Message("Browser window has been closed.");
    } else {
        Log.Message("Browser window was not found.");
    }
}


