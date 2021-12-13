import React, { useState } from 'react';
import './home.scss';
import headerBg from '../images/head_bg.png';
import homeBg from '../images/bj.png';
import titleBg from '../images/icon-title-bg@2x.d93aae1d.png';
import kaiguanji from '../images/kaiguanji.png';
import yunxingzhuangtai from '../images/yunxingzhuangtai.png';
import shuiweibaoj from '../images/shuiweibaoj.png';
import wenduji from '../images/wenduji.png';
import kongtiao from '../images/kongtiao.png';
import left from '../images/left.svg';
import right from '../images/right.svg';
import WaveBall from '../components/WaveBall';
import Thermometer from '../components/Thermometer';
import { Chart1 } from '../components/chart-1';
import { Chart2 } from '../components/chart-2';
import { Chart3 } from '../components/chart-3';
import { Chart4 } from '../components/chart-4';
import { Chart5 } from '../components/chart-5';
import { Chart6 } from '../components/chart-6';
import { Chart7 } from '../components/chart-7';
import { Chart8 } from '../components/chart-8';
import { Chart9 } from '../components/chart-9';
import { Chart10 } from '../components/chart-10';
import { Chart11 } from '../components/chart-11';
import { Chart12 } from '../components/chart-12';
import { Chart13 } from '../components/chart-13';
import { Chart14 } from '../components/chart-14';
import { Chart15 } from '../components/chart-15';


const TitleBg = ({ title }) => <div className='box-title'>
	<img src={titleBg} alt="" />
	<span> {title} </span>
</div>
export const Home = () => {
	const [temp, setTemp] = useState(0)
	const [humidity, setHumidity] = useState(0)

	function GetDateDiff(startDate) {
		let startTime = new Date(Date.parse(startDate.replace(/-/g, "/"))).getTime();
		let endTime = Date.now()
		let res = parseInt(Math.abs((startTime - endTime)) / (1000 * 60 * 60 * 24) + '')
		return res;
	}
	const time = GetDateDiff('2019-01-01')

	const GetData = (value) => {
		setHumidity(value.humidity)
		setTemp(value.temp)
		console.log(value);

	}
	return (
		<div className="home" style={{ backgroundImage: `url(${homeBg})` }}>
			<header style={{ backgroundImage: `url(${headerBg})` }}>
				<span className='header-time'>已安全运行 {time} 天 </span>
				<span className='header-title'>
					xxx系统
				</span>
				<div className='header-logout'>退出登录</div>
			</header>
			<main>
				<section className="section3">
					<div className="bordered 温湿度">
						<h2>恒温一体机</h2>
						<div className='switch-bar'>
							<img src={left} alt="" />
							<span>空调机1</span>
							<img src={right} alt="" />
						</div>
						<div className="charts">
							<Chart15 />
						</div>
						<div className="charts section3-wrapper">
							<div className="bordered2">
								<img src={kaiguanji} alt="" />
								<span>开关机状态</span>
								<div className='button'>开机</div>
							</div>
							<div className="bordered2">
								<img src={yunxingzhuangtai} alt="" />
								<span>运行状态</span>
								<div className='button'>驾驶模式</div>
							</div>
							<div className="bordered2">
								<img src={shuiweibaoj} alt="" />
								<span>水位报警</span>
								<div className='button'>上水位</div>
							</div>
						</div>
					</div>
					<div className="空调监控 bordered">
						<h2>空调监控</h2>
						<div className='switch-bar'>
							<img src={left} alt="" />
							<span>空调机1</span>
							<img src={right} alt="" />
						</div>
						<div className="charts section3-wrapper">
							<div className="bordered2">
								<img src={kaiguanji} alt="" />
								<span>开关机状态</span>
								<div className='button'>开机</div>
							</div>
							<div className="bordered2">
								<img src={wenduji} alt="" />
								<span>设定温度</span>
								<div className='button'>20°C</div>
							</div>
							<div className="bordered2">
								<img src={kongtiao} alt="" />
								<span>当前室温</span>
								<div className='button'>28°C</div>
							</div>
						</div>
					</div>
				</section>
				<section className="section4">
					<Chart6 />
					<div className="bordered 空调监控">
						<Chart5 />
					</div>
				</section>
				<section className="section5">
					<div className='bordered'>
						<Chart3 callback={GetData} />
						<div className="温湿度">
							<div className="charts">
								<WaveBall value={humidity} />
								<Thermometer value={temp} />
							</div>
						</div>
					</div>
					<div className="bordered 空调监控">
					</div>
				</section>
			</main>
		</div>
	);
};
