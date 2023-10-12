const { ipcRenderer } = require("electron")

var can = false

ipcRenderer.on("can", ()=>{
    document.querySelector("p").style.display = "none"
    document.querySelector("img").style.display = "block"
    can = true
})

ipcRenderer.on("data", (ev, args)=>{
    const img = document.querySelector("img")
    img.src = args.image
})

function send(ev, data){
    if(!can) return
    ipcRenderer.send("data", data)
}

window.addEventListener("DOMContentLoaded", ()=>{
    document.addEventListener("keydown", ev=>{
        send([
            "keydown", ev.key.toLowerCase()
        ])
    })
    document.addEventListener("keypress", ev=>{
        send([
            "keypress", ev.key.toLowerCase()
        ])
    })
    document.addEventListener("keyup", ev=>{
        send([
            "keyup", ev.key.toLowerCase()
        ])
    })

    document.addEventListener("mousemove", ({x, y})=>{
        send([
            "mousemove", {x, y}
        ])
    })
    document.addEventListener("mousedown", ev=>{
        send([
            "mousedown", ev.button
        ])
    })
    document.addEventListener("mouseup", (ev)=>{
        send([
            "mouseup", ev.button
        ])
    })
    document.addEventListener("wheel", ev=>{
        send([
            "wheel", {x: ev.deltaX, y: ev.deltaY}
        ])
    })
})
