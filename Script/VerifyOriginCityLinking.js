function VerifyOriginCityLinking(baseUrl) {
    var xpath = "//mat-cell[contains(@class, 'cdk-column-origin_city--origin_state_code')]";
    
    // Combine the base URL with the specific page path
    var fullUrl = baseUrl + "qms/#/rate-search";
    
    var page = Sys.Browser("chrome").Page(fullUrl);
    
    var element = page.WaitElement(xpath, 1000000); // Wait for the element

    if (element !== null) {
        var elements = page.EvaluateXPath(xpath);

        if (elements !== null && element.VisibleOnScreen) {
            var foundDifferentText = false;

            for (var i = 0; i < elements.length; i++) {
                var element = elements[i];
                if (element.contentText.trim() !== 'Los Angeles, CA') {
                    foundDifferentText = true;
                    break; // Exit the loop after finding a different location
                }
            }

            if (foundDifferentText) {
                Log.Message('There is another location different to "Los Angeles". The Test Pass');
            } else {
                Log.Error('The Test Fail, there is no different location');
            }
        } else {
            Log.Error('There are no visible elements.');
        }
    } else {
        Log.Error('Element not found');
    }
}
