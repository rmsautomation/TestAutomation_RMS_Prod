﻿function AddText(text) {
    var page = Aliases.browser.pageQms;
    
    // Define the XPaths
    var textCommentXPath = "//textarea[@maxlength='5000' and @rows='8' and contains(@class, 'mat-mdc-input-element')]";
    
    // Wait for the text comment element to be visible
    var textComment = page.WaitElement(textCommentXPath, 5000);
    if (textComment.Exists) {
       textComment.Keys("^a[BS]"); 
        textComment.Keys(text);
    } else {
        Log.Error("Text comment element not found or not visible.");
        return;
    }
}