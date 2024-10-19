function VerifyQuotes(){
    
var totalElements = 0;
var previousCount = -1;

var xpath = "//div[@class='mat-mdc-tooltip-trigger ng-star-inserted' and contains(text(), 'Aylin_UPS Rodriguez Magaya')]";

var scrollableContainer = Aliases.browser.pageQms.FindChild("XPath", "//div[@class='mat-mdc-tooltip-trigger ng-star-inserted' and contains(text(), 'Aylin_UPS Rodriguez Magaya')]", 0, true);


do {
    
    var foundElements = Aliases.browser.pageQms.FindAllChildren("XPath", xpath);
    
    totalElements += foundElements.length;
    
    
for (var i = 0; i < 20; i++) { 
    Aliases.browser.pageQms.Keys("[PgDn]");
    Delay(1000);
}

    
    previousCount = foundElements.length;
    
} while (previousCount > 0);

Log.Message("Total de elementos encontrados: " + totalElements);

var elementCount = totalElements.length;
Log.Message("Se encontraron " + elementCount + " elementos.");

  
var rangeLabelElement = Aliases.browser.pageQms.FindChild("XPath", "//div[@class='mat-mdc-paginator-range-label']", 5, true);

var rangeLabelText = rangeLabelElement.wText;

var indexOfOf = rangeLabelText.indexOf("of");

var textAfterOf = rangeLabelText.substring(indexOfOf + 3).trim(); 

var pageNumber = parseInt(textAfterOf, 10);

Log.Message("Page number: " + pageNumber);

var pageNumber = 3;  

if (elementCount < pageNumber) {
    Log.Message("El número de elementos es menor que " + expectedCount + ". El test pasa.");
    
} else if (elementCount === expectedCount) {
    Log.Error("El número de elementos es igual a " + expectedCount + ". El test falla.");
  
} else {
    Log.Message("El número de elementos es mayor que " + expectedCount + ". El test pasa.");
   
}

  
}