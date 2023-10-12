const screenshot = require("screenshot-desktop")
const robot = require("robotjs")
const dgram = require("node:dgram")
const server = dgram.createSocket("udp4")

var port = 2222

var test = null
var screen = null

function startScreen({port, address}){
    screen = setInterval(async ()=>{
        // TODO: Add support to multiscreen share

        screenshot({ format: "png" })
            .then(img=>{
                img = img.toString("base64")
                console.log(img)
                img = `data:image/png;base64,${img}`

                server.send(Buffer.from(JSON.stringify({
                    with: true,
                    image: img
                })), port, address, err=>{
                    if(err) {
                        console.log("Error to send a frame")
                        testConnectionTo(port, address)
                        clearInterval(screen)
                        screen = null
                    }
                    console.log("sended")
                })
            })
    }, 60 / 1000)
}

function testConnectionTo(port, address){
    test = setInterval(()=>{
        server.send(Buffer.from("{\"with\":false}"), port, address, err=>{
            if(err) return

            clearInterval(test)
            test = null
            startScreen({port, address})
        })
    }, 350)
}

server.on("listening", ()=>{
    const address = server.address()

    console.log("Server up on "+address.address+":"+port)
})

const events = [
    (key)=>{
        robot.keyToggle(key, "down")
    },
    (key)=>{
        robot.keyToggle(key, "up")
    },
    (x, y)=>{
        robot.moveMouse(x, y)
    },
    (mouse, x, y)=>{
        let btn = "middle"
        if(mouse == 0) btn = "left"
        else if(mouse == 2) btn = "right"

        robot.moveMouse(x, y)
        robot.mouseToggle("down", btn)
    },
    (mouse, x, y)=>{
        let btn = "middle"
        if(mouse == 0) btn = "left"
        else if(mouse == 2) btn = "right"

        robot.moveMouse(x, y)
        robot.mouseToggle("up", btn)
    },
    (x, y)=>{
        robot.scrollMouse(x, y)
    }
]

server.on("message", msg=>{
    msg = JSON.parse(msg.toString())
    
    if(screen == null) startScreen(info)
    console.log(msg)
    events[msg.shift()]?.(...msg)
})

server.bind(port)
