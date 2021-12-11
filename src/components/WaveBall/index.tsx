import React, {useEffect, useState} from "react";
import hm002 from '../../images/icon-hm-002.b909bb5e.png';
import './index.scss'


export const Index = () => {
    const [width, setWidth] = useState(0)
    const [top, setTop] = useState(0)
    useEffect(() => {
        //画波浪球id:dom节点id, rate:占比, color1-4:由外到内圆的颜色
        function drawRate(id, rate, color1, color2, color3, color4) {
            //创建画布
            let canvas: any = document.getElementById(id);
            let ctx = canvas.getContext('2d');
            //canvas属性
            let clientW = document.documentElement.clientWidth > 1000 ? document.documentElement.clientWidth : 1000;  //由于画布width和height自适应宽高
            let cW = canvas.width = 200 / 1920 * clientW;
            let cH = canvas.height = 200 / 1920 * clientW;
            let lineWidth = 2;
            //内圆属性
            let r = 0.8 * cW / 2;   //半径
            let cR = r - 2 * lineWidth;
            setWidth(cR * 2 + 16)
            //sin曲线属性
            let sX = 0;   //sin函数的初始x值
            let axisLength = cW; //轴长
            let waveWidth = 0.035; //波浪宽度,数越小越宽 
            let waveHeight = 8; //波浪高度,数越大越高
            let speed = 0.05; //波浪速度，数越大速度越快
            let xOffset = 0; //波浪x偏移量

            ctx.lineWidth = lineWidth;

            //画圈函数
            let IsdrawCircled = false;
            let drawCircle = function () {
                ctx.beginPath();
                ctx.strokeStyle = '#08397d';
                ctx.arc(cW / 2, cH / 2, cR + 1, 0, 2 * Math.PI);
                setTop(cH / 16)
                ctx.stroke();
                ctx.beginPath();
                ctx.arc(cW / 2, cH / 2, cR, 0, 2 * Math.PI);
                ctx.fillStyle = color2;
                ctx.fill();
                ctx.clip();
                IsdrawCircled = true
            }

            //画sin 曲线函数
            let drawSin = function (xOffset, color) {
                ctx.save();
                ctx.rect(0, 0, cW, cH);
                // ctx.fillStyle = ;
                ctx.fill();
                let points = []; //用于存放绘制Sin曲线的点
                ctx.beginPath();
                //在整个轴长上取点
                for (let x = sX; x < sX + axisLength; x += 20 / axisLength) {
                    //此处坐标(x,y)的取点，依靠公式 “振幅高*sin(x*振幅宽 + 振幅偏移量)”
                    let y = Math.sin((-sX - x) * waveWidth + xOffset);
                    let dY = cH * (1 - rate / 100) - 10;
                    points.push([x, dY + y * waveHeight]);
                    ctx.lineTo(x, dY + y * waveHeight);
                }
                //封闭路径
                ctx.lineTo(axisLength, cH);
                ctx.lineTo(sX, cH);
                ctx.lineTo(points[0][0], points[0][1]);
                ctx.fillStyle = color; //波浪填充色
                ctx.fill();
                ctx.restore();
            };

            //写百分比文本函数
            let drawText = function () {
                ctx.save();

                let size = 0.3 * cR;
                ctx.font = size + 'px Microsoft Yahei';
                ctx.textAlign = 'center';
                ctx.fillStyle = "#ffffff";
                ctx.fillText(rate + '%', cW / 2, cW / 2 + size / 2);

                ctx.restore();
            };

            let render = function () {
                ctx.clearRect(0, 0, cW, cH);
                if (IsdrawCircled == false) {
                    drawCircle();
                }

                //drawSin(xOffset + Math.PI * 0.7);
                drawSin(xOffset, '#08397d');
                drawSin(xOffset + 15, '#007eab');
                drawText();
                xOffset += speed;
                requestAnimationFrame(render);
            }
            render();
        }

        setInterval(() => {

        }, 1000)
        drawRate('canvas', '30', '#e9faff', 'transparent', 'red', '#29caff');
    }, [])
    return <>
        <div className='wave-ball bordered'>
            <img src={hm002} style={{width: width + 'px', top: top + 'px'}} alt=""/>
            <canvas id='canvas'/>
        </div>
    </>
}

export default Index