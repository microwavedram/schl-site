const canvas = document.getElementById("canvas")
const background = document.getElementById("background")
const ctx = canvas.getContext("2d")

particles = []

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

        particles.forEach(other => {
            const strength = Math.sqrt((particle.x - other.x) * (particle.x - other.x) + (particle.y - other.y) * (particle.y - other.y))

            if (strength < 100) {
                ctx.strokeStyle = `rgba(255,255,255,${(100-strength)/100})`
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

for (let i = 0; i < 200; i++) {
    particles.push({
        x: Math.cos(i/TAU) * 100,
        y: Math.sin(i/TAU) * 100,
        xv: (Math.random() - 0.5) * 10,
        yv: (Math.random() - 0.5) * 10
    })
}


drawFrame()