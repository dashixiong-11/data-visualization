import React, { useEffect, useRef, useState } from "react";
import './index.scss'


export const Index = ({ value }) => {
	const mycanvas = useRef<any>(null)

	const thermograph = (obj) => {
		let c = mycanvas.current.getContext('2d');
		let divWith = document.getElementById('thermometer').clientWidth
		let divHeight = document.getElementById('charts-wrapper').clientHeight
		let cw = mycanvas.current.width = divWith
		let ch = mycanvas.current.height = divHeight
		let objr = ch / 20
		let L = objr * 12
		//整体调整温度计相对canvas画布的位置
		c.translate(cw / 3, ch - ((ch - L) / 2));
		//    预定义全部线条样式
		c.lineWidth = objr / 10;
		c.strokeStyle = obj.borderColor;
		c.beginPath();
		// 起始角度
		var startAngle = -Math.PI / 3;
		var endAngle = Math.PI - startAngle; //与开始角度y轴轴对称角度
		//温度计外轮廓底部圆弧
		c.arc(0, 0, objr, startAngle, endAngle, false);
		c.stroke(); //渲染填充轮廓
		// 圆弧起点
		var startX = objr * Math.cos(startAngle)
		var startY = objr * Math.sin(startAngle)
		// 温度计整体高度
		//温度计外轮廓右侧直线
		c.moveTo(startX, startY);
		c.lineTo(startX, startY - L);
		c.stroke();
		//温度计外轮廓左侧直线
		c.moveTo(-startX, startY);
		c.lineTo(-startX, startY - L);
		c.stroke();
		c.beginPath();
		//温度计外轮廓顶部圆弧
		// var startAngle = -Math.PI / 3;
		// var endAngle = Math.PI - startAngle; //与开始角度y轴轴对称角度
		//温度计外轮廓底部圆弧
		c.arc(0, startY - L, startX, 0, Math.PI, true);
		c.stroke(); //渲染填充轮廓


		// 内部轮廓  一个圆叠加一个矩形  圆形静态  矩形底部和圆形一个颜色  顶部是高温颜色
		c.beginPath();
		c.fillStyle = obj.temColor1; //预定义填充颜色
		// 内外圆间隙
		var space = objr * 0.2;
		var r = objr - space; //内圆半径
		c.arc(0, 0, r, 0, Math.PI * 2); //阳鱼体外圆弧
		c.fill(); //渲染填充轮廓

		// 温度区间
		var t1 = 0;
		var t2 = 100;

		var y1 = -r * 1.8; // 温度条上面刻度线开始Y坐标
		var y2 = -r - L * 1.0;

		var temL = y1 + -(y1 - y2) * (obj.t - t1) / (t2 - t1); //温度对应像素高度位置
		c.beginPath();

		var temWidth = (startX - space) * 2 // 温度条宽度  解析和内外圈间隙保持一致

		// 颜色线性渐变  温度条温度不同 颜色渐变效果不同
		var grd = c.createLinearGradient(0, -r, 0, -r - L);
		grd.addColorStop(0, obj.temColor1);
		grd.addColorStop(0.5, '#00FF4D');

		grd.addColorStop(1, obj.temColor2);
		c.fillStyle = grd;

		c.rect(-temWidth / 2, temL, temWidth, -temL);
		c.fill(); //渲染填充轮廓


		// 刻度线批量创建


		//    文字样式、位置设置
		c.fillStyle = "#fff"; //文本填充颜色
		c.font = `normal ${objr * 1.2}px 微软雅黑`; //字体样式设置
		c.textBaseline = "middle"; //文本与fillText定义的纵坐标
		c.textAlign = "center"; //文本居中(以fillText定义的横坐标)


		// 分割25分
		var num = 25
		for (var i = 0; i < num + 1; i++) {
			c.beginPath();
			c.lineWidth = 1; //obj.R / 40
			c.strokeStyle = '#fff';
			c.moveTo(-startX, y1 + (y2 - y1) / num * i);
			c.lineTo(-startX * 1.5, y1 + (y2 - y1) / num * i);
			c.stroke();
		}
		// 分割5份
		var NUM = 5
		for (var i = 0; i < NUM + 1; i++) {
			c.beginPath();
			c.lineWidth = 1; //obj.R / 40
			c.strokeStyle = '#fff';
			c.moveTo(-startX, y1 + (y2 - y1) / NUM * i);
			c.lineTo(-startX * 2, y1 + (y2 - y1) / NUM * i);
			c.stroke();
			c.fillText(t1 - (t1 - t2) / NUM * i + "", -startX * 3, y1 + (y2 - y1) / NUM * i);
		}
		c.fillText("℃", startX * 2, y2 - r);
		c.fillText('当前温度', cw / 3, y2 / 3);
		c.font = `normal ${objr * 3}px 微软雅黑`; //字体样式设置
		c.fillText(obj.t + "℃", cw / 3, y2 / 2);
	}

	useEffect(() => {
		let temObj = {
			R: 6, // 参数化尺寸基准值  温度计底部圆圈半径
			temColor1: "#0080FF", //低温
			temColor2: "#FF3D3D", //高温
			borderColor: "#CCE6FF", //边框颜色  CCE6FF  0088cc
			lineColor: "#ffffff", //刻度颜色
			t: value * 100, //当前温度  可以输入温度  -10   0  40可以完全正常显示  能够与刻度线对齐
		}
		thermograph(temObj)
	}, [value])

	return <>
		<div className='thermometer charts' id='thermometer'>
			<canvas id='canvas2' ref={mycanvas} />
		</div>
	</>
}

export default Index