const { BrowserWindow, app } = require("electron")
const dgram = require("node:dgram")

function createWindow(){
    const win = new BrowserWindow({
        width: 900,
        height: 700,
        autoHideMenuBar: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            preload: __dirname + "/html/preload.js"
        }
    })

    win.maximize()
    
    win.loadFile(__dirname + "/html/index.html")
}

app.whenReady()
    .then(()=>{
        createWindow()
    })
