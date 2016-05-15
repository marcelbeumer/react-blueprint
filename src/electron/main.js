const electron = require('electron'); // eslint-disable-line import/no-unresolved
const settings = require('../../settings/server');
const devServerPort = settings.port;

const useDevServer = parseInt(process.env.ELECTRON_DEV_SERVER, 10) === 1;
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({ width: 1024, height: 750 });
  mainWindow.loadURL(useDevServer ?
     `http://localhost:${devServerPort}/` :
    `file://${__dirname}/../../dist/index.html`);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
