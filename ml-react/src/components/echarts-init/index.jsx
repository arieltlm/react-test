/**
 * 功能: echarts
 * 作者: 唐李梅
 * 日期: 2019.11.07
 */

import { React, PropTypes, } from 'framework/Util'
import echarts from 'echarts'

const createOption = datas => ({
    // title: {
    //     text: '人群收入分布',
    //     textStyle: {
    //         fontSize: 14,
    //         color: '#111',
    //     }
    // },
    grid: {
        top: 30,
        left: 15,
        right: 10,
        bottom: 0,
        // containLabel: true
    },
    series: [{
        name: '',
        type: 'pie',
        radius: ['35%', '60%'],
        center: ['50%', '50%'],
        // startAngle: 60,
        color: ['#8484D4', '#0B80D7', '#0E8B87', '#22C6C0', '#34259F'],
        itemStyle: {
            normal: {
                borderWidth: 1, 
                borderColor: '#fff',
            }
        },
        labelLine: {
            normal: {
                show: true,
                length: 2,
                length2: 75,
                lineStyle: {
                    // color: '#d3d3d3',
                    width: 2,
                },
                align: 'right'
            },
            color: '#000',
            emphasis: {
                show: true
            }
        },
        label: {
            normal: {
                formatter: '{b|{b}}\n{c|{c}%}',
                padding: [0, -75],
                rich: {
                    b: {
                        width: 175,
                        fontSize: 11,
                        color: '#999',
                        padding: [-15, 7],
                    },
                    hr: {
                        borderColor: '#CCCCCC',
                        width: '100%',
                        borderWidth: 2,
                        height: 0,
                    },
                    c: {
                        width: 30,
                        fontSize: 14,
                        align: 'center',
                        padding: 2,
                        fontWeight: 800,
                        verticalAlign: 'top'
                    }
                }
            }
        },
        data: datas,
    }]
})
 
const Chart = function ({ datas }){
    const chartRef = React.useRef(null)
    React.useEffect(() => {
        const myChart = echarts.init(chartRef.current)
        function chartResize() {
            if (myChart) {
                myChart.resize()
            }
        }
        if (myChart) {
            myChart.resize()
            myChart.hideLoading()
            myChart.setOption(
                createOption(datas)
            )
            window.addEventListener('resize', chartResize)
        }
        
        return () => { // 组件卸载时清除
            window.removeEventListener('resize', chartResize)
        }
    }) 
    return (
        <div ref={chartRef} style={{ width: '100%', height: '100%' }} />
    )
}
 
Chart.propTypes = {
    datas: PropTypes.array.isRequired,
}
 
 
export default Chart
