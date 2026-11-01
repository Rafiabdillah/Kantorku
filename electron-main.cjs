const { app, BrowserWindow, shell } = require('electron');
const path = require('path');

const createWindow = () => {
  const icon = path.join(__dirname, 'public', 'pwa-512x512.png');
  const window = new BrowserWindow({
    width: 1366,
    height: 768,
    minWidth: 360,
    minHeight: 640,
    title: 'KantorKu',
    backgroundColor: '#0f172a',
    icon,
    autoHideMenuBar: true,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
    },
  });

  window.loadFile(path.join(__dirname, 'dist', 'index.html'));

  window.webContents.setWindowOpenHandler(({ url }) => {
    if (/^https?:/.test(url)) {
      shell.openExternal(url);
      return { action: 'deny' };
    }
    return { action: 'allow' };
  });
};

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
