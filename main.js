const { app, BrowserWindow, shell, Menu, dialog } = require('electron');
const path = require('path');

app.disableHardwareAcceleration();

function create() {
  Menu.setApplicationMenu(null);
  const w = new BrowserWindow({
    width: 1280,
    height: 850,
    backgroundColor: '#eef1f8',
    autoHideMenuBar: true,
    webPreferences: { contextIsolation: true }
  });
  const f = path.join(app.getAppPath(), 'index.html');
  w.loadFile(f).catch(e => dialog.showErrorBox('خطا در بارگذاری', f + '\n' + e.message));
  w.webContents.on('did-fail-load', (ev, code, desc) => dialog.showErrorBox('did-fail-load', code + ' ' + desc + '\n' + f));
  w.webContents.on('render-process-gone', (ev, d) => dialog.showErrorBox('render-process-gone', d.reason));
  w.webContents.on('before-input-event', (ev, i) => {
    if (i.type === 'keyDown' && i.key === 'F12') w.webContents.toggleDevTools();
  });
  w.webContents.setWindowOpenHandler(({ url }) => { shell.openExternal(url); return { action: 'deny' }; });
}

app.whenReady().then(create);
app.on('window-all-closed', () => app.quit());
