import {app, BrowserWindow, screen} from 'electron';
import path from 'node:path';
import {fileURLToPath} from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const createWindow = () => {
  const {width: screenWidth} = screen.getPrimaryDisplay().workAreaSize;

  let windowWidth, windowHeight;
  if (screenWidth <= 576) {
    windowWidth = 360;
    windowHeight = 640;
  } else if (screenWidth <= 1024) {
    windowWidth = 800;
    windowHeight = 640;
  } else {
    windowWidth = 1024;
    windowHeight = 768;
  }

  const win = new BrowserWindow({
    width: windowWidth,
    height: windowHeight,
    resizable: true,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  win.loadFile(path.join(__dirname, 'dist/index.html')).catch(() => {
  });

  if (screenWidth <= 576) {
    win.maximize();
  }

  win.webContents.openDevTools();
};

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});