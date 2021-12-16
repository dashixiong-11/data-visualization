
export const Draw = ({ id, height, width }) => {
	const canvas: any = document.getElementById(id)
	const ctx = canvas.getContext('2d')

	const ch = canvas.width = width
	const cw = canvas.height = height

	ctx.fillStyle = "rgba(255,118,87,.6)"
	let step = 0
	const lines = 3

	function loop() {
		step++
		ctx.clearRect(0, 0, cw, ch)
		ctx.clearRect(0, 0, canvas.width, canvas.height)
		step++
		const angle = step * Math.PI / 180
		const deltaHeight = Math.sin(angle) * 50
		const deltaHeightRight = Math.cos(angle) * 50

		ctx.beginPath()
		ctx.moveTo(0, canvas.height / 2 + deltaHeight)
		ctx.bezierCurveTo(canvas.width / 2, canvas.height / 2 + deltaHeight - 50, canvas.width / 2, canvas.height / 2 + deltaHeightRight - 50, canvas.width, canvas.height / 2 + deltaHeightRight)
		ctx.lineTo(canvas.width, canvas.height)
		ctx.lineTo(0, canvas.height)
		ctx.lineTo(0, canvas.height / 2 + deltaHeight)
		ctx.closePath()
		ctx.fill()

		requestAnimationFrame(loop)
	}

	loop()
}

