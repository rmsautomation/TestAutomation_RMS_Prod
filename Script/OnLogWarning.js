function Event_OnLogWarningObjectReplaced(Sender, LogParams)
{
  // Check if the message includes either of the desired substrings
  var objectReplaced = aqString.Find(LogParams.Str, "object was replaced with a similar object.") != -1;
  var actionIncorrect = aqString.Find(LogParams.Str, "The action may be performed incorrectly, because the control is disabled.") != -1;

  if (objectReplaced!= -1 || actionIncorrect!= -1)
  {
    // If found, block the message
    LogParams.Locked = true;
  }
  else
  {
    // Else, post the message
    LogParams.Locked = false;
  }
}



