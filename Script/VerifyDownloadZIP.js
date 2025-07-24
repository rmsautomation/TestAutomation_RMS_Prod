function VerifyZipContents(zipFilePath, expectedFolderName) {
  // Check if the ZIP file exists
  if (!aqFileSystem.Exists(zipFilePath)) {
    Log.Error("ZIP file not found: " + zipFilePath);
    return false;
  }

  // Open the ZIP file
  let zip = aqFile.OpenZipArchive(zipFilePath);
  if (!zip) {
    Log.Error("Failed to open ZIP file.");
    return false;
  }

  let found = false;

  // Iterate through each file/folder inside the ZIP
  let count = zip.Entries.Count;
  Log.Message("ZIP contains " + count + " items.");

  for (let i = 0; i < count; i++) {
    let entry = zip.Entries.Item(i);
    let entryName = entry.Name;

    Log.Message("Found entry: " + entryName);

    // Check if the entry is a folder and contains expected text
    if (entry.IsFolder && entryName.indexOf(expectedFolderName) !== -1) {
      Log.Message("Folder name contains expected text: " + expectedFolderName);
      found = true;
      break;
    }
  }

  zip.Close();

  if (found) {
    Log.Message("✅ Folder with expected name found inside ZIP.");
    return true;
  } else {
    Log.Error("❌ Folder with expected name not found inside ZIP.");
    return false;
  }
}

function VerifyDocumentsInZip(zipFilePath, expectedText) {
  if (!aqFileSystem.Exists(zipFilePath)) {
    Log.Error("ZIP file does not exist: " + zipFilePath);
    return false;
  }

  let zip = aqFile.OpenZipArchive(zipFilePath);
  if (!zip) {
    Log.Error("Could not open ZIP file.");
    return false;
  }

  let count = zip.Entries.Count;
  Log.Message("Total entries in ZIP: " + count);

  let tempFolder = Project.Path + "TempExtracted\\";
  if (!aqFileSystem.Exists(tempFolder)) aqFileSystem.CreateFolder(tempFolder);

  let foundInAll = true;

  for (let i = 0; i < count; i++) {
    let entry = zip.Entries.Item(i);
    let entryName = entry.Name;

    // Skip folders
    if (entry.IsFolder) continue;

    let extractedPath = tempFolder + entryName;
    Log.Message("Extracting file: " + entryName);

    // Extract file
    zip.Extract(entry, extractedPath);

    // Read file content
    let fileContent = aqFile.ReadWholeTextFile(extractedPath, aqFile.ctUTF8);

    // Check if expected text is present
    if (fileContent.indexOf(expectedText) !== -1) {
      Log.Message("✅ Found expected text in: " + entryName);
    } else {
      Log.Error("❌ Expected text not found in: " + entryName);
      foundInAll = false;
    }
  }

  zip.Close();
  return foundInAll;
}


function openLastDownloadedZipFileAndExtractDoc(expectedExtension) {
  Delay(10000);

  var fso = Sys.OleObject("Scripting.FileSystemObject");
  var shell = Sys.OleObject("Shell.Application");

  var userProfilePath = aqEnvironment.GetEnvironmentVariable("USERPROFILE");
  var downloadFolder = userProfilePath + "\\Downloads";

  if (!fso.FolderExists(downloadFolder)) {
    Log.Error("Downloads folder not found: " + downloadFolder);
    return null;
  }

  var folder = fso.GetFolder(downloadFolder);
  var files = new Enumerator(folder.Files);

  var latestZip = null;
  var latestDate = new Date(0);

  for (; !files.atEnd(); files.moveNext()) {
    var file = files.item();
    if (fso.GetExtensionName(file.Name).toLowerCase() == "zip" &&
        file.DateLastModified > latestDate) {
      latestDate = file.DateLastModified;
      latestZip = file;
    }
  }

  if (!latestZip) {
    Log.Error("No ZIP file found in Downloads folder.");
    return null;
  }

  var zipFilePath = downloadFolder + "\\" + latestZip.Name;
  Log.Message("Latest ZIP file found: " + latestZip.Name);

  var extractPath = Project.Path + "ExtractedZip\\";
  if (!fso.FolderExists(extractPath))
    fso.CreateFolder(extractPath);

  // Clean previous content
  var extractedFolder = fso.GetFolder(extractPath);
  var extractedFiles = new Enumerator(extractedFolder.Files);
  for (; !extractedFiles.atEnd(); extractedFiles.moveNext()) {
    extractedFiles.item().Delete(true);
  }

  // Extract ZIP content
  var zipFolder = shell.NameSpace(zipFilePath);
  var destFolder = shell.NameSpace(extractPath);

  if (zipFolder != null && destFolder != null) {
    destFolder.CopyHere(zipFolder.Items(), 16);
    Delay(3000);

    // Check for expected file extension
    var found = false;
    var extractedItems = destFolder.Items();

    for (var i = 0; i < extractedItems.Count; i++) {
      var item = extractedItems.Item(i);
      var ext = fso.GetExtensionName(item.Name).toLowerCase();
      if (ext === expectedExtension.toLowerCase()) {
        found = true;
        Log.Message("Found file with expected extension: " + item.Name);
        break;
      }
    }

    if (!found) {
      Log.Warning("No file with extension ." + expectedExtension + " found in the extracted ZIP.");
    }

    return extractPath;
  } else {
    Log.Error("Error accessing ZIP or destination folder.");
    return null;
  }
}


function openLastDownloadedZipFileAndVerifyNameContains(expectedText) {
  Delay(10000); // Wait for download

  var fso = Sys.OleObject("Scripting.FileSystemObject");
  var shell = Sys.OleObject("Shell.Application");

  var userProfilePath = aqEnvironment.GetEnvironmentVariable("USERPROFILE");
  var downloadFolder = userProfilePath + "\\Downloads";

  if (!fso.FolderExists(downloadFolder)) {
    Log.Error("Downloads folder not found: " + downloadFolder);
    return;
  }

  var folder = fso.GetFolder(downloadFolder);
  var files = new Enumerator(folder.Files);

  var latestZip = null;
  var latestDate = new Date(0);

  for (; !files.atEnd(); files.moveNext()) {
    var file = files.item();
    if (fso.GetExtensionName(file.Name).toLowerCase() == "zip" &&
        file.DateLastModified > latestDate) {
      latestDate = file.DateLastModified;
      latestZip = file;
    }
  }

  if (!latestZip) {
    Log.Error("No ZIP file found in Downloads folder.");
    return;
  }

  var zipFilePath = downloadFolder + "\\" + latestZip.Name;
  Log.Message("Latest ZIP file found: " + latestZip.Name);

  var extractPath = Project.Path + "ExtractedZip\\";
  if (!fso.FolderExists(extractPath))
    fso.CreateFolder(extractPath);

  // Clean old files
  var extractedFolder = fso.GetFolder(extractPath);
  var extractedFiles = new Enumerator(extractedFolder.Files);
  for (; !extractedFiles.atEnd(); extractedFiles.moveNext()) {
    extractedFiles.item().Delete(true);
  }

  // Extract ZIP
  var zipFolder = shell.NameSpace(zipFilePath);
  var destFolder = shell.NameSpace(extractPath);

  if (zipFolder != null && destFolder != null) {
    destFolder.CopyHere(zipFolder.Items(), 16);
    Delay(3000); // Wait for extraction

    var found = false;
    var extractedItems = destFolder.Items();

    for (var i = 0; i < extractedItems.Count; i++) {
      var item = extractedItems.Item(i);
      if (item.Name.toLowerCase().indexOf(expectedText.toLowerCase()) !== -1) {
        found = true;
        Log.Checkpoint("Found file containing: '" + expectedText + "' -> " + item.Name);
        break;
      }
    }

    if (!found) {
      Log.Error("No file in the ZIP contains the text: '" + expectedText + "'");
    }
  } else {
    Log.Error("Error accessing ZIP or destination folder.");
  }
}


