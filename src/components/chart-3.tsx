import React, { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';
import { createEchartsOptions } from '../shared/create-echarts-options';
import { px } from '../shared/px';

export const Chart3 = ({ callback }) => {
	const [temp, setTemp] = useState(0)
	const [humidity, setHumidity] = useState(0)
	const divRef = useRef(null);
	const mychart = useRef(null)
	useEffect(() => {
		var myChart = echarts.init(divRef.current);
		mychart.current = echarts.init(divRef.current);
		myChart.setOption(createEchartsOptions({
			legend: {
				bottom: px(10),
				textStyle: { color: 'white' },
				itemWidth: px(30),
				itemHeight: px(16)
			},
			grid: {
				x: px(20),
				x2: px(20),
				y: px(20),
				y2: px(70),
				containLabel: true
			},

			xAxis: {
				type: 'category',
				boundaryGap: false,
				data: [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24],
				splitLine: { show: true, lineStyle: { color: '#073E78' } },
				axisTick: { show: false },
				axisLine: { show: false },
			},
			yAxis: {
				type: 'value',
				max: 1,
				splitLine: { lineStyle: { color: '#073E78' } },
				axisLabel: {
					formatter(val) {
						return val * 100 + '%';
					}
				}
			},
			tooltip: {
				trigger: 'axis',
				formatter(val) {
					const time = val[0].axisValue
					setTemp(val[0].value)
					setHumidity(val[1].value)
					return `<div>
						<div>时间：${time}</div>
						<div>${val[0].seriesName}:${val[0].value}</div>
						<div>${val[1].seriesName}:${val[1].value}</div>
					</div>`;
				}
			},
			triggerLineEvent: true,
			series: [
				{
					name: '温度',
					type: 'line',
					areaStyle: {
						color: 'rgba(184, 157, 157, 0.2)'
					},
					// itemStyle: {
					// 	normal: {
					// 		lineStyle: {
					// 			color: 'red'
					// 		}
					// 	}
					// },
					data: [0.2, 0.5, 0.9, 0.3, 0.1, 0.8, 0.7, 0.2, 0.6].reverse(),
				},
				{
					name: '湿度',
					type: 'line',
					areaStyle: {
						color: 'rgba(184, 157, 157, 0.2)'
					},
					data: [0.5, 0.9, 0.2, 0.3, 0.7, 0.5, 0.2, 0.9, 0.1].reverse()
				},
			].map(obj => ({
				...obj,
				symbol: 'circle',
				symbolSize: px(12),
				lineStyle: { width: px(2) }
			}))
		}));
	}, []);

	const t = useRef(null)
	useEffect(() => {
		mychart.current.getZr().on('click', function () {
			if (t.current) {
				clearTimeout(t.current)
			}
			t.current = setTimeout(() => {
				callback({ temp, humidity })
			}, 200)
		});
	}, [temp, humidity])

	return (
		<div className="发案趋势">
			<h2>温湿度曲线</h2>
			<div ref={divRef} className="chart" />
		</div>
	);
};
