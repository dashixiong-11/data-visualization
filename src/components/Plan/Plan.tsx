import React, {useEffect, useMemo, useRef, useState} from "react";
import demoImage from '../../images/demo_picture.png'
import './Plan.scss'

export const Plan = () => {
    const plan2 = useRef<any>(null)
    const [planWidth, setPlanWidth] = useState<any>(0)
    const [planHeight, setPlanHeight] = useState<any>(0)

    useEffect(() => {
        if (plan2.current) {
            setTimeout(()=>{
                setPlanWidth(plan2.current.clientWidth)
                setPlanHeight(plan2.current.clientHeight)
            },200)
        }
    }, [plan2.current])


    const list = useMemo(() => {
        return JSON.parse(localStorage.getItem('list'))
    }, [localStorage.getItem('list')])

    return <>
        <div className='plan'>
            <img src={demoImage} ref={plan2} className='canvas-img' id='image' draggable='false'/>
            {list.map((item: any) =>
                <div className='card' key={item.id}
                     style={{top: (item.translateY * planHeight) + 'px', left: (item.translateX * planWidth) + 'px'}}
                     id={'card-' + item.id}>
                    <span className="card-title">{item.title}</span>
                    <ul>
                        {item.content.split(';').map((c, index) =>
                            c ? <li key={index}>{c}</li> : null
                        )}
                    </ul>
                </div>)}
        </div>
    </>
}

export default Plan