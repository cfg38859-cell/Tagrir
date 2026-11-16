const { app, BrowserWindow, shell, Menu } = require('electron');
const path = require('path');
function create() {
  Menu.setApplicationMenu(null);
  const w = new BrowserWindow({ width: 1280, height: 850, autoHideMenuBar: true, webPreferences: { contextIsolation: true } });
  w.loadFile(path.join(__dirname, '..', 'www', 'index.html'));
  w.webContents.setWindowOpenHandler(({ url }) => { shell.openExternal(url); return { action: 'deny' }; });
}
app.whenReady().then(create);
app.on('window-all-closed', () => app.quit());
