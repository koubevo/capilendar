function doGet(e) {
  var allowedEmails = ["email@gmail.com", "email2@gmail.com"];
  var userEmail = Session.getActiveUser().getEmail();

  if (allowedEmails.includes(userEmail)) {
    return HtmlService.createHtmlOutputFromFile('index');
  } else {
    return HtmlService.createHtmlOutput("Permission denied.");
  }
}

function getTasks() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Tasks");
  var data = sheet.getDataRange().getValues();
  var tz = Session.getScriptTimeZone();
  var today = new Date();
  today.setHours(0, 0, 0, 0);

  var tasksArr = data.slice(1).map(function(row) {
    var taskDate = new Date(row[3]);
    taskDate.setHours(0, 0, 0, 0);
    var time = row[4];
    var timeValue = time instanceof Date ? time.getTime() : 0;
    var color = row[2] == 1 ? "babyblue" : row[2] == 2 ? "babypink" : "lightyellow";
    var imageUrl = row[5] ? row[5] : "";

    return {
      id: row[0],
      name: row[1],
      owner: row[2],
      date: taskDate,
      time: row[4],
      timeValue: timeValue,
      color: color,
      image: imageUrl,
      isToday: taskDate.getTime() === today.getTime()
    };
  }).filter(function(task) {
    return task.date.getTime() >= today.getTime();
  });

  tasksArr.sort(function(a, b) {
    if (a.isToday && !b.isToday) return -1;
    if (!a.isToday && b.isToday) return 1;
    if (a.date.getTime() === b.date.getTime()) {
      return a.timeValue - b.timeValue;
    }
    return a.date - b.date;
  });

  var groups = [];
  tasksArr.forEach(function(task) {
    var groupKey = Utilities.formatDate(task.date, tz, "yyyy-MM-dd");
    var group = groups.find(function(g) { return g.date === groupKey; });
    if (!group) {
      group = { date: groupKey, tasks: [] };
      groups.push(group);
    }

    if (task.time instanceof Date) {
      task.time = Utilities.formatDate(task.time, tz, "HH:mm");
    } else {
      task.time = "";
    }

    group.tasks.push({
      id: task.id,
      name: task.name,
      owner: task.owner,
      time: task.time,
      color: task.color,
      image: task.image
    });
  });

  groups.sort(function(a, b) {
    var dateA = new Date(a.date);
    var dateB = new Date(b.date);
    if (dateA.getTime() === today.getTime() && dateB.getTime() !== today.getTime()) return -1;
    if (dateB.getTime() === today.getTime() && dateA.getTime() !== today.getTime()) return 1;
    return dateA - dateB;
  });

  return groups;
}

function addTask(name, owner, date, time, imageUrl) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Tasks");
  var color = owner == 1 ? "babyblue" : owner == 2 ? "babypink" : "lightyellow";
  imageUrl = owner == 1 
    ? "https://raw.githubusercontent.com/koubevo/capis/3073285420d70120069c84cc3f3003f4376f0ffd/blue.webp" 
    : owner == 2 
      ? "https://raw.githubusercontent.com/koubevo/capis/refs/heads/main/pink.webp" 
      : "https://raw.githubusercontent.com/koubevo/capis/refs/heads/main/yellow.webp";

  if (time) {
    time = new Date(`1970-01-01T${time}:00`);
  }

  sheet.appendRow([Date.now(), name, owner, date, time, imageUrl, color]);
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
