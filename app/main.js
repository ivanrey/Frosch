const {app, BrowserWindow} = require('electron')
const fs = require('fs');
const homeOrTmp = require('home-or-tmp');

function createWindow() {


    // Create the browser window.
    let win = new BrowserWindow({
        fullscreen : true,
        kiosk      : true,
        toolbar    : false,
        frame      : false,
        alwaysOnTop: true,
        resizable  : false,
        title      : "Frosch",
        icon       : `${__dirname}/icono.png`,

        webPreferences: {
            nodeIntegration: true
        }
    })

    win.webContents.openDevTools();

    // and load the index.html of the app.
    win.loadURL(`file://${__dirname}/main.html`, {
        base: `/${__dirname}`
    });

    win.onerror = (errorMsg, url, lineNumber, colNumber) => {

        const now = new Date();
        const mensaje = now.toString() + ' ' + errorMsg + '@' + url + ':' + lineNumber + '.' + colNumber;
        fs.appendFile(homeOrTmp + '/errores.txt', mensaje);
    };


}

app.whenReady().then(createWindow)
