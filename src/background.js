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
        ctx.arc(w / 2 + particle.x, h / 2 + particle.y, 4, 0, Math.PI * 2)
        ctx.fill()
        ctx.closePath()

        ctx.strokeStyle = "rgba(255,255,255,0.4)"
        ctx.strokeWidth = 1

        particles.forEach(other => {
            const strength = Math.sqrt((particle.x - other.x) * (particle.x - other.x) + (particle.y - other.y) * (particle.y - other.y))

            if (strength < 100) {
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

for (let i = 0; i < 100; i++) {
    particles.push({
        x: (Math.random() - 0.5) * background.clientWidth,
        y: (Math.random() - 0.5) * background.clientHeight,
    })
}

drawFrame()