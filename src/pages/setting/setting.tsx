import React, {useEffect, useState, useRef} from "react"
import demoImage from '../../images/demo_picture.png'
import './setting.scss'


export const Setting = () => {
    const lock = useRef(false)
    const moveLock = useRef(false)
    const [image, setImage] = useState(demoImage)
    const [selectedId, setSelectedId] = useState<any>(null)
    const wrapper = useRef(null)
    const [preId, setPreId] = useState<any>(null)
    const [cardList, setCardList] = useState([
        {id: 1, content: 'card', translateX: 0, translateY: 0},
        {id: 2, content: 'card2', translateX: 0, translateY: 0},
    ])

    const listenerFn = (e: any) => {
        let left = 0
        let top = 0
        let _e = e
        const id = _e.target.id;
        let diffX = _e.clientX - _e.target.offsetLeft // 鼠标点击物体那一刻相对于物体左侧边框的距离=点击时的位置相对于浏览器最左边的距离-物体左边框相对于浏览器最左边的距离
        let diffY = _e.clientY - _e.target.offsetTop

        /* 低版本ie bug:物体被拖出浏览器可是窗口外部时，还会出现滚动条，
                        解决方法是采用ie浏览器独有的2个方法setCapture()\releaseCapture(),这两个方法，
                        可以让鼠标滑动到浏览器外部也可以捕获到事件，而我们的bug就是当鼠标移出浏览器的时候，
                        限制超过的功能就失效了。用这个方法，即可解决这个问题。注：这两个方法用于onmousedown和onmouseup中 */
        if (typeof e.target.setCapture !== 'undefined') {
            e.target.setCapture()
        }

        wrapper.current.onmousemove = function (e: any) {
            let __e = e
            left = __e.clientX - diffX
            top = __e.clientY - diffY

            // 控制拖拽物体的范围只能在浏览器视窗内，不允许出现滚动条
            if (left < 0) {
                left = 0
            } else if (left > wrapper.current.clientWidth - _e.target.offsetWidth) {
                left = wrapper.current.innerWidth - _e.target.offsetWidth
            }
            if (top < 0) {
                top = 0
            } else if (top > wrapper.current.clientHeight - _e.target.offsetHeight) {
                top = wrapper.current.innerHeight - _e.target.offsetHeight
            }
            // 移动时重新得到物体的距离，解决拖动时出现晃动的现象
            _e.target.style.left = left + 'px'
            _e.target.style.top = top + 'px'

        }
        wrapper.current.onmouseup = function (e) { // 当鼠标弹起来的时候不再移动
            this.onmousemove = null
            this.onmouseup = null // 预防鼠标弹起来后还会循环（即预防鼠标放上去的时候还会移动）
            /*
                            const copy = JSON.parse(JSON.stringify(cardList))
                            copy.forEach(item => {
                                if (item.id === selectedId) {
                                    item.translateX = left
                                    item.translateY = top
                                }
                            })
                            setCardList(copy)
            */

            // 修复低版本ie bug
            if (typeof this.releaseCapture !== 'undefined') {
                this.releaseCapture()
            }
        }
    }


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

    const GetData = () => {
        const divS:any = document.getElementsByClassName('card')
        const divArray = Array.prototype.slice.apply(divS)
        divArray.forEach( div => {
            console.log(div.id.split('-')[1]);
            console.log(div.style.left);
            console.log(div.style.top);
        })
        /*
                divS.forEach( d => {
                    console.log(d)
                })
        */

    }
    useEffect(() => {
        cardList.forEach(item => {
            const drag: any = document.getElementById(`card-${item.id}`)
            drag.addEventListener('mousedown', listenerFn)
        }, [])
    }, [cardList])


    return <>
        <div className="setting">
            <div className="img-wrapper">
                <div id='wrapper' ref={wrapper}>
                    <img src={image} className='canvas-img' draggable='false' onClick={() => setSelectedId(null)}/>
                    {cardList.map((item: any) =>
                        <div className={`card ${item.id === selectedId ? 'active' : ''}`} key={item.id}
                             style={{top: item.translateY + 'px', left: item.translateX + 'px'}}
                             id={'card-' + item.id} onClick={() => SelectedCard(item.id)}> {item.content} </div>)}
                </div>
            </div>
            <div className='right'>
                <button>添加背景图</button>
                <button onClick={GetData}>获取数据</button>
            </div>
        </div>
    </>
}

export default Setting