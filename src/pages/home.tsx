import React from 'react';
import './home.scss';
import headerBg from '../images/head_bg.png';
import homeBg from '../images/bj.png';
import titleBg from '../images/icon-title-bg@2x.d93aae1d.png';
import kaiguanji from '../images/kaiguanji.png';
import yunxingzhuangtai from '../images/yunxingzhuangtai.png';
import WaveBall from '../components/WaveBall';
import Thermometer from '../components/Thermometer';
import {Chart1} from '../components/chart-1';
import {Chart2} from '../components/chart-2';
import {Chart3} from '../components/chart-3';
import {Chart4} from '../components/chart-4';
import {Chart5} from '../components/chart-5';
import {Chart6} from '../components/chart-6';
import {Chart7} from '../components/chart-7';
import {Chart8} from '../components/chart-8';
import {Chart9} from '../components/chart-9';
import {Chart10} from '../components/chart-10';
import {Chart11} from '../components/chart-11';
import {Chart12} from '../components/chart-12';
import {Chart13} from '../components/chart-13';
import {Chart14} from '../components/chart-14';
import {Chart15} from '../components/chart-15';


const TitleBg = ({title}) => <div className='box-title'>
    <img src={titleBg} alt=""/>
    <span> {title} </span>
</div>
export const Home = () => {
    const year = new Date().getFullYear();

    function GetDateDiff(startDate) {
        let startTime = new Date(Date.parse(startDate.replace(/-/g, "/"))).getTime();
        let endTime = Date.now()
        let res = parseInt(Math.abs((startTime - endTime)) / (1000 * 60 * 60 * 24) + '')
        return res;
    }

    const time = GetDateDiff('2019-01-01')
    return (
        <div className="home" style={{backgroundImage: `url(${homeBg})`}}>
            <header style={{backgroundImage: `url(${headerBg})`}}>
                <span className='header-time'>已安全运行 {time} 天 </span>
                <span className='header-title'>
                    xxx系统
                </span>
                <div className='header-logout'>退出登录</div>
            </header>
            <main>
                {/*
                <section className="section1">
                    <div>1</div>
                    <div>2</div>
                    <div>3</div>

                    <Chart1/>
                    <Chart2/>

                </section>
                <section className="section2">
                    <div>1</div>
                    <div>2</div>
                    <div>3</div>

                    <Chart3/>
                    <Chart4/>

                </section>
*/}
                <section className="section3">
                    <div className="bordered 温湿度">
                        <h2>温湿度监控</h2>
                        <div className="charts">
                            <Chart15/>
                        </div>
                        <div className="charts section3-wrapper">
                            <div className="bordered2">
                                <img src={kaiguanji} alt=""/>
                                <span>开关机状态</span>
                                <div className='button'>开机</div>
                            </div>
                            <div className="bordered2">
                                <img src={yunxingzhuangtai} alt=""/>
                                <span>运行状态</span>
                                <div className='button'>驾驶模式</div>
                            </div>
                        </div>
                    </div>
                    {/*
                    <div className="案发街道 bordered">
                        <h2>温湿度监控</h2>
                        <div className="charts">
                            <div></div>
                            <div></div>
                        </div>
                    </div>
*/}
                    <div className="年龄段 bordered">
                        <h2>空调监控</h2>
                        <div>
                            《
                            <span>空调机1</span>
                            》
                        </div>
                        <div className="charts section3-wrapper">
                            <div className="bordered2">
                                <img src={kaiguanji} alt=""/>
                                <span>开关机状态</span>
                                <div className='button'>开机</div>
                            </div>
                            <div className="bordered2">
                                <img src={yunxingzhuangtai} alt=""/>
                                <span>运行状态</span>
                                <div className='button'>驾驶模式</div>
                            </div>
                        </div>
                    </div>
                    {/*<Chart5/>*/}
                </section>
                <section className="section4">
                    <Chart6/>
                    <div className="bordered 年龄段">
                        {/*<TitleBg title='犯罪人员年龄分布'/>*/}
                        <Chart5/>
                    </div>
                </section>
                <section className="section5">
                    <div className='bordered'>
                        <Chart3/>
                        <div className="案发街道">
                            <div className="charts">
                                <WaveBall/>
                                <Thermometer/>
                            </div>
                        </div>
                    </div>
                    <div className="bordered 年龄段">
                        {/*<h2>作案手段分析</h2>*/}
                        {/*<Chart14/>*/}
                    </div>
                </section>
            </main>
        </div>
    );
};
