import React, { useEffect, useState, useRef } from "react"
import demoImage from '../../images/demo_picture.png'
import './setting.scss'


export const Setting = () => {
	const lock = useRef(false)
	const moveLock = useRef(false)
	const [image, setImage] = useState(demoImage)
	const [selectedId, setSelectedId] = useState<any>(null)
	const wrapper = useRef(null)
	const [cardList, setCardList] = useState([
		{ id: 1, content: 'card', translateX: 0, translateY: 0 },
		{ id: 2, content: 'card2', translateX: 0, translateY: 0 },
	])


	useEffect(() => {
		wrapper.current.addEventListener('mouseenter', (e) => {
			lock.current = true
		})
		wrapper.current.addEventListener('mouseout', (e) => {
			lock.current = false
			moveLock.current = false
		})
	}, [wrapper])

	const SelectedCard = (id) => {
		setSelectedId(id)
	}

	// useEffect(() => {
	// 	let startX = 0
	// 	let startY = 0
	// 	const listerer1 = (e) => {
	// 		moveLock.current = true
	// 		startX = e.clientX
	// 		startY = e.clientY
	// 		console.log('鼠标按下');
	// 		console.log(e.clientX);
	// 		console.log(e.clientY);
	// 	}
	// 	const listerer2 = (e) => {
	// 		console.log('鼠标松开');
	// 		moveLock.current = false
	// 	}

	// 	const listerer3 = (e) => {
	// 		if (!selectedId) return
	// 		if (!moveLock.current) return
	// 		const copy = JSON.parse(JSON.stringify(cardList))
	// 		copy.forEach(item => {
	// 			if (item.id === selectedId) {
	// 				item.translateX = e.clientX
	// 				item.translateY = e.clientY
	// 			}
	// 		})
	// 		console.log('移动');
	// 		console.log(e.clientX - startX);
	// 		console.log(e.clientY - startY);
	// 		setCardList(copy)
	// 	}

	// 	if (!selectedId) {
	// 		wrapper.current.removeEventListener('mousedown', listerer1)
	// 		wrapper.current.removeEventListener('mouseup', listerer2)
	// 		wrapper.current.removeEventListener('mousemove', listerer3)
	// 	}
	// 	wrapper.current.addEventListener('mousedown', listerer1)
	// 	wrapper.current.addEventListener('mouseup', listerer2)
	// 	wrapper.current.addEventListener('mousemove', listerer3)
	// }, [selectedId])

	// useEffect(() => {
	// 	drag('card-2')
	// }, [])

	useEffect(() => {
		if (!selectedId) return
		const drag: any = document.getElementById(`card-${selectedId}`)
		let left = 0
		let top = 0
		drag.onmousedown = function (e: any) {
			const id = e.target.id;
			var e = e || window.event // 兼容ie浏览器
			var diffX = e.clientX - drag.offsetLeft // 鼠标点击物体那一刻相对于物体左侧边框的距离=点击时的位置相对于浏览器最左边的距离-物体左边框相对于浏览器最左边的距离
			var diffY = e.clientY - drag.offsetTop

			/* 低版本ie bug:物体被拖出浏览器可是窗口外部时，还会出现滚动条，
							解决方法是采用ie浏览器独有的2个方法setCapture()\releaseCapture(),这两个方法，
							可以让鼠标滑动到浏览器外部也可以捕获到事件，而我们的bug就是当鼠标移出浏览器的时候，
							限制超过的功能就失效了。用这个方法，即可解决这个问题。注：这两个方法用于onmousedown和onmouseup中 */
			if (typeof drag.setCapture !== 'undefined') {
				drag.setCapture()
			}

			document.onmousemove = function (e: any) {
				var e = e || window.event // 兼容ie浏览器
				left = e.clientX - diffX
				top = e.clientY - diffY

				// 控制拖拽物体的范围只能在浏览器视窗内，不允许出现滚动条
				if (left < 0) {
					left = 0
				} else if (left > window.innerWidth - drag.offsetWidth) {
					left = window.innerWidth - drag.offsetWidth
				}
				if (top < 0) {
					top = 0
				} else if (top > window.innerHeight - drag.offsetHeight) {
					top = window.innerHeight - drag.offsetHeight
				}

				// 移动时重新得到物体的距离，解决拖动时出现晃动的现象
				drag.style.left = left + 'px'
				drag.style.top = top + 'px'

			}
			document.onmouseup = function (e) { // 当鼠标弹起来的时候不再移动
				this.onmousemove = null
				this.onmouseup = null // 预防鼠标弹起来后还会循环（即预防鼠标放上去的时候还会移动）
				const copy = JSON.parse(JSON.stringify(cardList))
				copy.forEach(item => {
					if (item.id === selectedId) {
						item.translateX = left
						item.translateY = top
					}
				})
				setCardList(copy)

				// 修复低版本ie bug
				if (typeof drag.releaseCapture !== 'undefined') {
					drag.releaseCapture()
				}
			}
		}


	}, [selectedId])

	const drag = (id) => {
		var drag: any = document.getElementById(id)

		// 点击某物体时，用drag对象即可，move和up是全局区域，也就是整个文档通用，应该使用document对象而不是drag对象(否则，采用drag对象时物体只能往右方或下方移动)
		drag.onmousedown = function (e) {
			var e = e || window.event // 兼容ie浏览器
			var diffX = e.clientX - drag.offsetLeft // 鼠标点击物体那一刻相对于物体左侧边框的距离=点击时的位置相对于浏览器最左边的距离-物体左边框相对于浏览器最左边的距离
			var diffY = e.clientY - drag.offsetTop

			/* 低版本ie bug:物体被拖出浏览器可是窗口外部时，还会出现滚动条，
							解决方法是采用ie浏览器独有的2个方法setCapture()\releaseCapture(),这两个方法，
							可以让鼠标滑动到浏览器外部也可以捕获到事件，而我们的bug就是当鼠标移出浏览器的时候，
							限制超过的功能就失效了。用这个方法，即可解决这个问题。注：这两个方法用于onmousedown和onmouseup中 */
			if (typeof drag.setCapture !== 'undefined') {
				drag.setCapture()
			}

			document.onmousemove = function (e: any) {
				var e = e || window.event // 兼容ie浏览器
				var left = e.clientX - diffX
				var top = e.clientY - diffY

				// 控制拖拽物体的范围只能在浏览器视窗内，不允许出现滚动条
				if (left < 0) {
					left = 0
				} else if (left > window.innerWidth - drag.offsetWidth) {
					left = window.innerWidth - drag.offsetWidth
				}
				if (top < 0) {
					top = 0
				} else if (top > window.innerHeight - drag.offsetHeight) {
					top = window.innerHeight - drag.offsetHeight
				}

				// 移动时重新得到物体的距离，解决拖动时出现晃动的现象
				drag.style.left = left + 'px'
				drag.style.top = top + 'px'
			}
			document.onmouseup = function (e) { // 当鼠标弹起来的时候不再移动
				console.log('this', this)
				this.onmousemove = null
				this.onmouseup = null // 预防鼠标弹起来后还会循环（即预防鼠标放上去的时候还会移动）

				// 修复低版本ie bug
				if (typeof drag.releaseCapture !== 'undefined') {
					drag.releaseCapture()
				}
			}
		}
	}


	return <>
		<div className="setting">
			<div className="img-wrapper" >
				<div id='wrapper' ref={wrapper}>
					<img src={image} className='canvas-img' draggable='false' onClick={() => setSelectedId(null)} />
					{cardList.map((item: any) =>
						<div className={`card ${item.id === selectedId ? 'active' : ''}`} key={item.id}
							style={{ top: item.translateY + 'px', left: item.translateX + 'px' }}
							id={'card-' + item.id} onClick={() => SelectedCard(item.id)}> {item.content} </div>
					)}
				</div>
			</div>
			<div className='right'>
				<button>添加背景图</button>
				<button onClick={() => console.log(cardList)}>获取数据</button>
			</div>
		</div>
	</>
}

export default Setting