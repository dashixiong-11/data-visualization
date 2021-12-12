import React, {useEffect, useRef} from 'react';
import * as echarts from 'echarts';
import {createEchartsOptions} from '../shared/create-echarts-options';

export const Chart15 = () => {
    const divRef = useRef(null);
    const option = {
        series: [
            {
                type: 'gauge',
                progress: {
                    show: true,
                    width: 8
                },
                axisLine: {
                    lineStyle: {
                        width: 8
                    }
                },
                center: ['20%', '60%'],
                radius:'50%',
                axisTick: {
                    show: true,
                    splitNumber: 5,
                    length: '3%',
                    distance: 6
                },
                splitLine: {
                    length: '10%',
                    lineStyle: {
                        width: 1,
                        color: '#999'
                    }
                },
                axisLabel: {
                    show: false,
                    distance: 15,
                    color: '#999',
                    fontSize: 10
                },
                pointer: {
                    show: false
                },
                title: {
                    show: false
                },
                detail: {
                    valueAnimation: true,
                    color: '#fff',
                    fontSize: 15,
                    offsetCenter: [0, '70%'],
                    formatter: "{value}%"
                },
                data: [
                    {
                        value: 60
                    }
                ]
            },
            {
                type: 'gauge',
                progress: {
                    show: true,
                    width: 8
                },
                axisLine: {
                    lineStyle: {
                        width: 8
                    }
                },
                axisTick: {
                    show: true,
                    splitNumber: 5,
                    length: '3%',
                    distance: 6
                },
                splitLine: {
                    length: '10%',
                    lineStyle: {
                        width: 1,
                        color: '#999'
                    }
                },
                axisLabel: {
                    show: false,
                    distance: 15,
                    color: '#999',
                    fontSize: 10
                },
                pointer: {
                    show: false
                },
                title: {
                    show: false
                },
                detail: {
                    valueAnimation: true,
                    color: '#fff',
                    fontSize: 20,
                    offsetCenter: [0, '70%'],
                    formatter: "{value}%"
                },
                data: [
                    {
                        value: 70
                    }
                ]
            },
            {
                type: 'gauge',
                progress: {
                    show: true,
                    width: 8
                },
                center: ['80%', '60%'],
                radius:'50%',
                axisLine: {
                    lineStyle: {
                        width: 8
                    }
                },
                axisTick: {
                    show: true,
                    splitNumber: 5,
                    length: '3%',
                    distance: 6
                },
                splitLine: {
                    length: '10%',
                    lineStyle: {
                        width: 1,
                        color: '#999'
                    }
                },
                axisLabel: {
                    show: false,
                    distance: 15,
                    color: '#999',
                    fontSize: 10
                },
                pointer: {
                    show: false
                },
                title: {
                    show: false
                },
                detail: {
                    valueAnimation: true,
                    color: '#fff',
                    fontSize: 15,
                    offsetCenter: [0, '70%'],
                    formatter: "{value}%"
                },
                data: [
                    {
                        value: 70
                    }
                ]
            }
        ]
    };
    useEffect(() => {
        let myChart = echarts.init(divRef.current);
        setInterval(function () {
            const random = +(Math.random() * 60).toFixed(2);
            myChart.setOption({
                series: [
                    {
                        data: [
                            {
                                value: random
                            }
                        ]
                    },
                ],
                ...option
            });
        }, 2000);
    }, []);
    return (<div ref={divRef} className="chart"/>);
};
