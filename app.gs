function doGet() {
  return HtmlService.createHtmlOutputFromFile('index');
}

function getTasks() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Tasks");
  var data = sheet.getDataRange().getValues();
  var tasks = {};

  for (var i = 1; i < data.length; i++) {
    var date = data[i][3]; // Datum úkolu
    if (!tasks[date]) {
      tasks[date] = [];
    }
    var color = data[i][2] == 1 ? "babyblue" : data[i][2] == 2 ? "babypink" : "lightyellow";
    tasks[date].push({
      id: data[i][0],
      name: data[i][1],
      owner: data[i][2],
      duration: data[i][4],
      color: color
    });
  }
  return tasks;
}

function addTask(name, owner, date, duration) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Tasks");
  var color = owner == 1 ? "babyblue" : owner == 2 ? "babypink" : "lightyellow";
  sheet.appendRow([Date.now(), name, owner, date, duration, color]);
}

function deleteTask(taskId) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Tasks");
  var data = sheet.getDataRange().getValues();
  for (var i = 1; i < data.length; i++) {
    if (data[i][0] == taskId) {
      sheet.deleteRow(i + 1);
      return;
    }
  }
}
