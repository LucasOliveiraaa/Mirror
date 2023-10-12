const dgram = require("node:dgram")
const cl = dgram.createSocket("udp4")

const port = 2222,
      address = "0.0.0.0"

var can = false
var test = null
var timeLost = 0
var pressed = []

function tryConnect(){
    test = setInterval(()=>{
        if(timeLost >= 15000){
            showMessage("Can't connect to the server on 0.0.0.0:2222. Verify if the server is on and try again.")
            clearInterval(test)
        }

        cl.send(Buffer.from(`["connection tester"]`), port, address, (err)=>{
            if(err) return
        
            timeLost = 0
            can = true
            setView(true)
            clearInterval(test)
        })
        timeLost += 350
    }, 350)
}

function setView(show){
    document.querySelector("img").style.display = show?"flex":"none"
    document.querySelector("p").style.display = show?"none":"flex"
}

function showMessage(msg){
    const p = document.querySelector("p")
    p.innerHTML = msg
    setView(false)
}

function send(data){
    if(!can) return

    console.log(data)

    cl.send(Buffer.from(data), port, address, err=>{
        if(!err) return
        can = false

        showMessage("Connection lost. Reconnecting...<br><br>"+err)
        tryConnect()
    })
}

window.addEventListener("DOMContentLoaded", ()=>{
    cl.on("message", (data)=>{
        data = JSON.parse(data)
    
        if(!data.with) return
    
        const img = document.querySelector("img")
        img.src = data.image
    
        // TODO: Support audio source
    })

    tryConnect()

    const layer = document.querySelector("#control")

    document.addEventListener("keydown", ev=>{
        ev.preventDefault()

        if(pressed.includes(ev.key)) return

        send(`[0, "${ev.key.toLowerCase()}"]`)

        pressed.push(ev.key)
    })
    document.addEventListener("keyup", ev=>{
        ev.preventDefault()
        
        var i = pressed.indexOf(ev.key)
        if(i > -1){
            delete pressed[i]
        }

        send(`[1, "${ev.key.toLowerCase()}"]`)
    })

    layer.addEventListener("mousemove", ev=>{
        ev.preventDefault()
        send(`[2, ${ev.offsetX}, ${ev.offsetY}]`)
    })
    layer.addEventListener("mousedown", ev=>{
        console.log(ev)

        //send(`[3, ${ev.button}, ${ev.offsetX}, ${ev.offsetY}]`)
    })
    layer.addEventListener("mouseup", (ev)=>{
        send(`[4, ${ev.button}, ${ev.offsetX}, ${ev.offsetY}]`)
    })
    layer.addEventListener("wheel", ev=>{
        ev.preventDefault()
        send(`[5, ${ev.deltaX}, ${ev.deltaY}]`)
    })
})
