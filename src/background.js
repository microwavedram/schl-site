const canvas = document.getElementById("canvas")
const background = document.getElementById("background")
const ctx = canvas.getContext("2d")

particles = []

let mousex = 0
let mousey = 0
let mouse_held = false

function drawFrame() {
    canvas.width = background.clientWidth
    canvas.height = background.clientHeight

    const w = background.clientWidth
    const h = background.clientHeight

    ctx.fillStyle = "rgba(255,255,255,1)"

    
    
    particles.forEach(particle => {
        ctx.beginPath()
        ctx.moveTo(w / 2 + particle.x, h / 2 + particle.y)
        ctx.arc(w / 2 + particle.x, h / 2 + particle.y, 2, 0, Math.PI * 2)
        ctx.fill()
        ctx.closePath()

        ctx.strokeStyle = "rgba(255,255,255,0.4)"
        ctx.strokeWidth = 1

        particle.x += particle.xv
        particle.y += particle.yv

        if (particle.x < -w/2) particle.xv = Math.abs(particle.xv)
        if (particle.x > w/2) particle.xv = -Math.abs(particle.xv)
        if (particle.y < -h/2) particle.yv = Math.abs(particle.yv)
        if (particle.y > h/2) particle.yv = -Math.abs(particle.yv)

        particle.xv *= 0.99
        particle.yv *= 0.99

        const mdx = particle.x + (w / 2) - mousex
        const mdy = particle.y + (h / 2) - mousey

        const d = mdx * mdx + mdy * mdy

        if (d < 50000) {
            if (mouse_held) {
                particle.xv -= mdx * 0.0005
                particle.yv -= mdy * 0.0005
            } else {
                particle.xv += mdx * 0.0005
                particle.yv += mdy * 0.0005
            }

        }

        particles.forEach(other => {
            const dx = particle.x - other.x
            const dy = particle.y - other.y
            
            const strength = dx*dx + dy*dy


            if (strength < 5000) {
                particle.xv += dx * 0.0001
                particle.yv += dy * 0.0001
                other.xv += -dx * 0.0001
                other.yv += -dy * 0.0001

                
            }
            if (strength < 20000) {
                ctx.strokeStyle = `rgba(255,255,255,${(10000-strength)/10000})`
                ctx.beginPath()
                ctx.moveTo(w / 2 + particle.x, h / 2 + particle.y)
                ctx.lineTo(w / 2 + other.x, h / 2 + other.y)
                ctx.stroke()
                ctx.closePath()
            }
        })
    })

    requestAnimationFrame(drawFrame)
}

const TAU = Math.PI

const count = 400
const C = TAU/count
for (let i = 0; i < count; i++) {
    particles.push({
        x: Math.cos(i/C) * 500,
        y: Math.sin(i/C) * 500,
        xv: Math.cos(i/C) * -5,
        yv: Math.sin(i/C) * -5,
    })
}

addEventListener("mousemove", event => {
    mousex = event.x
    mousey = event.y
})

addEventListener("touchmove", event => {
    mousex = event.x
    mousey = event.y
})

addEventListener("mousedown", () => {mouse_held = true})
addEventListener("touchstart", () => {mouse_held = true})
addEventListener("mouseup", () => {mouse_held = false})
addEventListener("touchend", () => {mouse_held = false})

drawFrame()