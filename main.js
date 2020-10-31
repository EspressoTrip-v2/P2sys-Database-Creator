const { app, BrowserWindow, Notification, ipcMain } = require('electron');

require('dotenv').config();

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    height: 600,
    width: 400,
    center: true,
    resizable: false,
    webPreferences: { nodeIntegration: true, enableRemoteModule: true },
  });

  mainWindow.loadFile('index.html');
  // mainWindow.webContents.openDevTools();

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', () => {
  createWindow();
});

ipcMain.on('db-connection', (e, message) => {
  if (message == 'connected') {
    let notification = new Notification({
      body: 'DB CONNECTED',
    });
    notification.show();
    mainWindow.send('db-status', message);
  } else if (message === 'fail') {
    let notification = new Notification({
      body: 'DB ERROR',
    });
    notification.show();
    mainWindow.send('db-status', message);
  }
});
