
function AddCurrentDateToExcel() {
    // Create an instance of Excel
    var excelApp = Sys.OleObject("Excel.Application");
    excelApp.Visible = false;  // To keep the Excel interface hidden
    
    // Open the Excel file
    var filePath = Project.Variables.upload_path;;  // Change to your file path
    var workbook = excelApp.Workbooks.Open(filePath);
    var worksheet = workbook.Worksheets("All Rates");  // Change to your actual sheet name

    // Get the last row with data in column A (assuming column A has data)
    var lastRow = worksheet.Cells(worksheet.Rows.Count, 1).End(-4162).Row;  // xlUp = -4162

    // Get the current date
    var currentDate = new Date();
    
    // Find the column index for "Effective Date"
    var headerRow = 1;  // Assuming the first row contains headers
    var effectiveDateColumn = -1;

    // Loop through the header row to find the column index
    for (var col = 1; col <= worksheet.Cells(headerRow, worksheet.Columns.Count).End(-4159).Column; col++) {  // xlToLeft = -4159
        if (worksheet.Cells(headerRow, col).Value === "Effective Date") {
            effectiveDateColumn = col;
            break;
        }
    }

    // Check if "Effective Date" column was found
    if (effectiveDateColumn === -1) {
        Log.Error("Column 'Effective Date' not found!");
        workbook.Close(false);
        excelApp.Quit();
        return;
    }

    // Iterate over all rows and add the date in the "Effective Date" column
    for (var i = 2; i <= lastRow; i++) {
        worksheet.Cells(i, effectiveDateColumn).Value = currentDate;  // Use the found column index
        worksheet.Cells(i, effectiveDateColumn).NumberFormat = "mm/dd/yyyy";  // Set the date format
    }

    // Save changes and close the file
    workbook.Save();
    workbook.Close(false);
    excelApp.Quit();
}

