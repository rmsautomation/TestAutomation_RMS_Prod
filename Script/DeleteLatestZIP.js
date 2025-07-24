function deleteLastDownloadedZipFile() {
  var fso = Sys.OleObject("Scripting.FileSystemObject");
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
    if (fso.GetExtensionName(file.Name).toLowerCase() === "zip" &&
        file.DateLastModified > latestDate) {
      latestDate = file.DateLastModified;
      latestZip = file;
    }
  }

  if (latestZip) {
    var zipPath = latestZip.Path;
    try {
      latestZip.Delete(true); // true = force delete
      Log.Checkpoint("Deleted latest ZIP file: " + zipPath);
    } catch (e) {
      Log.Error("Failed to delete ZIP file: " + zipPath + "\nError: " + e.message);
    }
  } else {
    Log.Warning("No ZIP file found to delete.");
  }
}
