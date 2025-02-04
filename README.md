
# Capilendar

**Capilendar** is a simple task management application for two partners, built using Google Apps Script. It connects to Google Sheets to store tasks and offers a clean and responsive design optimized for both desktop and mobile.

## 🚀 Features

- **User Authorization**: Only specified emails can access the app.
- **Task Management**: Add and display tasks.
- **Color Coding**:
  - `babyblue` for Partner 1.
  - `babypink` for Partner 2.
  - `lightyellow` for shared tasks.
- **Image Support**: Tasks display icons or images based on ownership.
- **Date Grouping**: Tasks are organized and sorted by date.

## 📋 Requirements

1. **Google Account** with access to Google Apps Script.
2. **Google Sheet** named `Tasks` with these columns:
   - `ID`, `Name`, `Owner`, `Date`, `Time`, `Image URL`.

## 🛠 Setup

1. Open **Google Apps Script** and add the backend code (`Code.gs`).
2. Create a new file named **index.html** for the frontend.
3. Set the `allowedEmails` variable to include authorized users.
4. Deploy as a **web app**:
   - Go to **Deploy → New Deployment → Web App**.
   - Copy the deployment URL and share it with authorized users.

## 📂 Project Structure

- **Code.gs**: Backend for task logic.
- **index.html**: Frontend UI.
- **Google Sheets**: Stores tasks.

---

Feel free to use or customize! 🎉
