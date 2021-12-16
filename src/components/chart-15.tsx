import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { createEchartsOptions } from '../shared/create-echarts-options';

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
				center: ['20%', '60%'],
				radius: '50%',
				axisLine: {
					lineStyle: {
						width: 8
					}
				},
				axisTick: {
					show: true,
					splitNumber: 5,
					length: '3%',
					distance: 3
				},
				splitLine: {
					length: '6%',
					distance: 5,
					lineStyle: {
						width: 1,
						color: '#999'
					}
				},
				axisLabel: {
					show: false,
					distance: 5,
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
			},
			{
				type: 'gauge',
				axisLine: {
					lineStyle: {
						width: 10,
						color: [
							[0.3, '#67e0e3'],
							[0.7, '#37a2da'],
							[1, '#fd666d']
						]
					}
				},
				radius: '60%',
				pointer: {
					itemStyle: {
						color: 'auto'
					},
					width: '2%'
				},
				axisTick: {
					distance: -10,
					length: 4,
					lineStyle: {
						color: '#fff',
						width: 1
					}
				},
				splitLine: {
					distance: -9,
					length: 5,
					lineStyle: {
						color: '#fff',
						width: 2
					}
				},
				axisLabel: {
					color: 'auto',
					distance: 20,
					fontSize: 10
				},
				detail: {
					valueAnimation: true,
					formatter: '{value}',
					color: 'auto',
					offsetCenter: [0, '70%']
				},
				data: [
					{
						value: 70,
						name: '当前温度'
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
				radius: '50%',
				axisLine: {
					lineStyle: {
						width: 8
					}
				},
				axisTick: {
					show: true,
					splitNumber: 5,
					length: '3%',
					distance: 3
				},
				splitLine: {
					length: '6%',
					distance: 5,
					lineStyle: {
						width: 1,
						color: '#999'
					}
				},
				axisLabel: {
					show: false,
					distance: 5,
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
		myChart.setOption({ ...option });
	}, []);
	return (<div ref={divRef} className='chart' />);
};
