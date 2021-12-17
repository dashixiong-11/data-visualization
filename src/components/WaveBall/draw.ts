export const Draw = ({id, height, width, color, value}) => {
    const canvas: any = document.getElementById(id)
    const ctx = canvas.getContext('2d')

    const cw = canvas.width = width
    const ch = canvas.height = height

    let step = 0
    const lines = 3


    ctx.beginPath();
    ctx.strokeStyle = '#08397d';
    ctx.arc(cw / 2, ch / 2, cw / 2 + 1, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(cw / 2, ch / 2, cw / 2, 0, 2 * Math.PI);
    ctx.fillStyle = 'transparent';
    ctx.fill();
    ctx.clip();

    function loop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        const h = 1 - value / 100
        step++
        for (let i = 0; i < lines; i++) {
            ctx.fillStyle = color[i]
            let angle = (step + i * 180 / lines) * Math.PI / 90
            let deltaHeight = Math.sin(angle) * 20
            let deltaHeightRight = Math.cos(angle) * 20
            ctx.beginPath()
            ctx.moveTo(0, canvas.height * h + deltaHeight)
            ctx.bezierCurveTo(canvas.width / 2, canvas.height * h + deltaHeight, canvas.width / 2, canvas.height * h + deltaHeightRight, canvas.width, canvas.height * h + deltaHeightRight)
            // ctx.bezierCurveTo(0, canvas.height * h + deltaHeight, canvas.width / 4, canvas.height * h + deltaHeightRight+ 50, canvas.width/2, canvas.height * h + deltaHeightRight)
            // ctx.bezierCurveTo(canvas.width/2, canvas.height * h + deltaHeightRight, canvas.width * 3/4, canvas.height * h + deltaHeightRight- 50, canvas.width, canvas.height * h + deltaHeightRight)
            ctx.lineTo(canvas.width, canvas.height)
            ctx.lineTo(0, canvas.height)
            ctx.lineTo(0, canvas.height * h + deltaHeight)
            ctx.closePath()
            ctx.fill()
        }
        requestAnimationFrame(loop)

        ctx.save();
        let size = 0.3 * cw / 2;
        ctx.font = size * 1.5 + 'px Microsoft Yahei';
        ctx.textAlign = 'center';
        ctx.fillStyle = "#ffffff";
        ctx.fillText(value + '%', cw / 2, cw / 2 + size - 10);
        ctx.font = size * 0.68 + 'px Microsoft Yahei';
        ctx.fillText('当前湿度', cw / 2, cw / 2 + size + 10);
        ctx.restore();

    }

    loop()
}

