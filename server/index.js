const screenshot = require("screenshot-desktop")
const robot = require("robotjs")
const dgram = require("node:dgram")
const server = dgram.createSocket("udp4")

var port = 2222

var test = null
var screen = null

function startScreen({port, address}){
    screen = setInterval(async ()=>{
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
    }, 50 / 1000)
}

function testConnectionTo(port, address){
    test = setInterval(()=>{
        server.send(Buffer.from("{with:false}"), port, address, err=>{
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

const events = {
    keydown(key){
        robot.keyToggle(key, "down")
    },
    keyup(key){
        robot.keyToggle(key, "up")
    },
    mousemove({x, y}){
        robot.moveMouse(x, y)
    },
    mousedown(mouse){
        let btn = "middle"
        if(mouse == 0) btn = "left"
        else if(mouse == 2) btn = "right"

        robot.mouseToggle("down", btn)
    },
    mouseup(mouse){
        let btn = "middle"
        if(mouse == 0) btn = "left"
        else if(mouse == 2) btn = "right"

        robot.mouseToggle("up", btn)
    },
    wheel({x, y}){
        robot.scrollMouse(x, y)
    }
}

server.on("message", (msg, info)=>{
    msg = JSON.parse(msg.toString())
    
    if(screen == null) startScreen(info)

    events[msg[0]]?.(msg[1])
})

server.bind(port)
