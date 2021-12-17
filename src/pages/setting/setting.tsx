import React, {useEffect, useState, useRef, useMemo} from "react"
import demoImage from '../../images/demo_picture.png'
import {px} from '../../shared/px';
import './setting.scss'


export const Setting = () => {
    const sid = useRef(null)
    const [image, setImage] = useState(demoImage)
    const [selectedId, setSelectedId] = useState<any>(null)
    const wrapper = useRef(null)
    const plan = useRef(null)
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [visible, setVisible] = useState(false)
    const [planWidth, setPlanWidth] = useState<any>(0)
    const [planHeight, setPlanHeight] = useState<any>(0)
    const [cardList, setCardList] = useState([
        {id: 1, title: '标题1', content: 'card', translateX: 0, translateY: 0},
        // {id: 2, title: '标题2', content: 'card2', translateX: 0, translateY: 0},
    ])

    useEffect(() => {

    }, [plan.current])

    useEffect(() => {
        if (plan.current) {
            setTimeout(() => {
                setPlanWidth(plan.current.clientWidth)
                setPlanHeight(plan.current.clientHeight)
            }, 200)
        }
    }, [plan.current])

    const listenerFn = (e: any) => {
        let left = 0
        let top = 0
        let _e = e
        const id = _e.target.id;
        const target: any = id === sid.current ? _e.target : document.getElementById(`card-${sid.current}`)
        let diffX = _e.clientX - target.offsetLeft // 鼠标点击物体那一刻相对于物体左侧边框的距离=点击时的位置相对于浏览器最左边的距离-物体左边框相对于浏览器最左边的距离
        let diffY = _e.clientY - target.offsetTop

        /* 低版本ie bug:物体被拖出浏览器可是窗口外部时，还会出现滚动条，
        解决方法是采用ie浏览器独有的2个方法setCapture()\releaseCapture(),这两个方法，
        可以让鼠标滑动到浏览器外部也可以捕获到事件，而我们的bug就是当鼠标移出浏览器的时候，
        限制超过的功能就失效了。用这个方法，即可解决这个问题。注：这两个方法用于onmousedown和onmouseup中 */
        if (typeof target.setCapture !== 'undefined') {
            target.setCapture()
        }

        wrapper.current.onmousemove = function (e: any) {
            let __e = e
            left = __e.clientX - diffX
            top = __e.clientY - diffY

            // 控制拖拽物体的范围只能在浏览器视窗内，不允许出现滚动条
            if (left < 0) {
                left = 0
            } else if (left > wrapper.current.clientWidth - target.offsetWidth) {
                left = wrapper.current.innerWidth - target.offsetWidth
            }
            if (top < 0) {
                top = 0
            } else if (top > wrapper.current.clientHeight - target.offsetHeight) {
                top = wrapper.current.innerHeight - target.offsetHeight
            }
            // 移动时重新得到物体的距离，解决拖动时出现晃动的现象
            document.getElementById(`card-${sid.current}`).style.left = left + 'px'
            document.getElementById(`card-${sid.current}`).style.top = top + 'px'
            // _e.target.style.left = left + 'px'
            // _e.target.style.top = top + 'px'

        }
        wrapper.current.onmouseup = function (e) { // 当鼠标弹起来的时候不再移动
            this.onmousemove = null
            this.onmouseup = null // 预防鼠标弹起来后还会循环（即预防鼠标放上去的时候还会移动）
            sid.current = null
            // 修复低版本ie bug
            if (typeof this.releaseCapture !== 'undefined') {
                this.releaseCapture()
            }
        }
    }

    const SelectedCard = (item) => {
        sid.current = item.id
        setSelectedId(item.id)
        setContent(item.content)
        setTitle(item.title)
    }
    const DeleteCard = () => {
        const copy = JSON.parse(JSON.stringify(cardList))
        copy.forEach((c, index) => {
            if (c.id === selectedId) {
                copy.splice(index)
            }
        })
        setCardList(JSON.parse(JSON.stringify(copy)))
    }

    useEffect(() => {
        if (selectedId) {
            setVisible(true)
        } else {
            setVisible(false)
        }
    }, [selectedId])

    const GetData = () => {

        const divS: any = document.getElementsByClassName('card')
        const divArray = Array.prototype.slice.apply(divS)
        const copy = JSON.parse(JSON.stringify(cardList))
        divArray.forEach(div => {
            const id = parseInt(div.id.split('-')[1])
            const left = parseInt((div.style.left).replace('px', ''))
            const top = parseInt((div.style.top).replace('px', ''))
            copy.forEach(c => {
                if (c.id === id) {
                    console.log(planWidth);
                    console.log(left / planWidth);
                    Object.assign(c, {
                        translateX: left / planWidth,
                        translateY: top / planHeight
                    })
                }
            })
        })
        localStorage.setItem('list', (JSON.stringify(copy)))
        setCardList(JSON.parse(JSON.stringify(copy)))
    }
    useEffect(() => {
        cardList.forEach(item => {
            const drag: any = document.getElementById(`card-${item.id}`)
            drag.addEventListener('mousedown', listenerFn, true)
        }, [])
    }, [cardList.length])

    const onSubmit = e => {
        e.preventDefault();
        if (title && content) {
            if (selectedId) {
                const copy = JSON.parse(JSON.stringify(cardList))
                copy.forEach(i => {
                    if (i.id === selectedId) {
                        Object.assign(i, {
                            title: title,
                            content: content
                        })
                    }
                })
                setCardList(copy)
            } else {
                setCardList([...cardList, {
                    id: parseInt(Math.random() * 1000 + ''),
                    title: title,
                    content: content,
                    translateX: 0,
                    translateY: 0
                }])
            }
        }
        setContent('')
        setTitle('')
    }

    const Add = () => {
        InputInit()
        setVisible(true)
    }

    const Cancel = () => {
        InputInit()
        setVisible(false)

    }

    const InputInit = () => {
        setTitle('')
        setContent('')
        setSelectedId(null)
        sid.current = null
    }

    const onTitleChange = (e) => {
        setTitle(e.target.value);
    }
    const onContentChange = (e) => {
        setContent(e.target.value);
    }


    return <>
        <div className="setting">
            <div className="img-wrapper">
                <div id='wrapper' ref={wrapper}>
                    <img src={image} ref={plan} className='canvas-img' id='image' draggable='false' onClick={
                        () => {
                            setSelectedId(null)
                            sid.current = null
                        }
                    }/>
                    {cardList.map((item: any) =>
                        <div className={`card ${item.id === selectedId ? 'active' : ''}`} key={item.id}
                             style={{
                                 top: (item.translateY * planHeight) + 'px',
                                 left: (item.translateX * planWidth) + 'px'
                             }}
                             id={'card-' + item.id} onClick={() => SelectedCard(item)}>
                            <span className="card-title">{item.title}</span>
                            <ul>
                                {item.content.split(';').map((c, index) =>
                                    c ? <li key={index}>{c}</li> : null
                                )}
                            </ul>
                        </div>)}
                </div>
            </div>
            <div className='right'>
                <div>
                    <div>背景图尺寸</div>
                    <div>
                        <input type="number" width='4em'/> x
                        <input type="number" width='30px'/>
                        <button>确定</button>
                    </div>
                </div>
                <button onClick={Add}>新增</button>
                <button onClick={GetData}>获取数据</button>
                {visible ?
                    <div className="input-wrapper">
                        <div>
                            <div>标题: <input value={title} onChange={onTitleChange} name='title' type="text"/></div>
                            <div>内容: <textarea value={content} onChange={onContentChange} name='content'/></div>
                            <div>
                                <button className='submit' onClick={onSubmit}>确定</button>
                                <button onClick={DeleteCard}>删除</button>
                                <button onClick={Cancel}>取消</button>
                            </div>
                        </div>
                    </div> : null
                }
            </div>
        </div>
    </>
}

export default Setting