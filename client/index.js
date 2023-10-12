const { BrowserWindow, app, ipcMain } = require("electron")
const dgram = require("node:dgram")

const port   = 2222,
      host = "0.0.0.0",
      type = "udp4"

const cl = dgram.createSocket(type)

var testCon = null

function createWindow(){
    const win = new BrowserWindow({
        width: 900,
        height: 700,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            preload: __dirname + "/html/preload.js"
        }
    })

    win.maximize()
    
    win.loadFile(__dirname + "/html/index.html")

    testCon = setInterval(()=>{
        cl.send(Buffer.from("{\"testing\":true}"), port, host, err=>{
            if(err) {
                console.log("Server dont initialized")
                return
            }
            console.log("Server Initialized")
            clearInterval(testCon)
            win.webContents.send("can")
        })
    }, 350)

    cl.on("message", (msg, info)=>{
        const data = JSON.parse(msg)
    
        if(!data.with) return
        console.log("data")
        win.webContents.send("data", data)
    })

    ipcMain.on("data", (ev, data)=>{
        const pack = Buffer.from(JSON.stringify(data))
        console.log("sending:",data)
        cl.send(pack, port, host, err=>{
            if(err) console.log("Error to send client data to server")
        })
    })
}

app.whenReady()
    .then(()=>{
        createWindow()
    })
