/**
 * 功能:
 * 作者: tanglimei
 * 日期: 2019.11.29
 */
import {
    React,
    PureComponent
    // PropTypes,
} from 'framework/Util'
// import {  } from 'antd'
import './scss/index.scss'
import echarts from 'echarts'



import datas from './map-data.js'
import barDatas from './bar-data.js'

import zhong from './images/company1.png'
import mlamp from './images/company1.png'

const geoJson = require('@/common/beijing.json')
const mapName = 'beijing'

echarts.registerMap('beijing', geoJson)

const geoCoordMap = []
const mapFeatures = echarts.getMap(mapName).geoJson.features
mapFeatures.forEach(v => {
    // 地园名称
    const { name } = v.properties
    // 地区经纬度
    geoCoordMap[name] = v.properties.cp
})

const scatterColor = {
    海淀园: '#f22953',
    朝阳园: '#f87d35',
    昌平园: '#f87d35',
    东城园: '#02efef',
    西城园: '#009eff',
    丰台园: '#13e577',
    石景山园: 'purple',
    门头沟园: '#02efef',
    房山园: '#9d5efc',
    通州园: '#009eff',
    顺义园: '#9d5efc',
    大兴园: '#02efef',
    怀柔园: '#13e577',
    平谷园: '#13e577',
    密云县: '#f87d35',
    延庆县: '#9d5efc',

}



function setSerious(data,color, bardata,year,total){

    // const dat1 = data.filter((item,index)=>index % 3 === 0)
    // const dat2 = data.filter((item,index)=>index % 3 === 1)
    // const dat3 = data.filter((item,index)=>index % 3 === 2)
    return {
        title: [
            {
                text: year + "年企业总数：" + total,
                left: "10%",
                textStyle: {
                    color: "rgb(46, 234, 255)",
                    fontSize: 30
                },
                top: "7%"
            },
            {
                id: "statistic",
                text: year + "年数据统计情况",
                left: "75%",
                top: "7%",
                textStyle: {
                    color: "rgb(46, 234, 255)",
                    fontSize: 24
                }
            }
        ],
        yAxis: {
            type: "category",
            inverse: true,
            nameGap: 16,
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                interval: 0,
                margin: 85,
                textStyle: {
                    color: "#fff",
                    align: "left",
                    fontSize: 14
                }
            },
            data: bardata
                .sort((a, b) => b.value - a.value)
                .map(item => item.name)
        },
        series: [
            {
                type: "map",
                name: "企业分布",
                map: mapName,
                geoIndex: 0, // 设置了此参数，series-map.map 属性，以及 series-map.itemStyle 等样式配置不再起作用
                aspectScale: 0.8, // 长宽比
                showLegendSymbol: false, // 存在legend时显示
                roam: true,
                itemStyle: {
                    normal: {
                        areaColor: "#EBEFFF",
                        borderColor: "#fffff"
                    },
                    emphasis: {
                        areaColor: "#efb23c"
                    }
                },
                animation: false,
                geoCoordMap,
                data
            },
            {
                name: "企业分布",
                type: "scatter",
                coordinateSystem: "geo",
                data: data,
                zlevel: 2,
                animation: true,
                animationEasing: "backInOut",
                animationDelay: function(idx) {
                    return idx * 10;
                },
                animationDurationUpdate: function(idx) {
                    return idx ;
                },
                symbolSize: 12,
                itemStyle: {
                    normal: {
                        color: function(params) {
                            return scatterColor[params.data.name];
                        },
                        opacity: 0.8
                    }
                }
            },
            {
                name: "企业总数",
                type: "bar",
                data: bardata.map(item => item.value),
                zlevel: 1.5,
                label: {
                    normal: {
                        show: false,
                        position: "right",
                        verticalAlign: "bottom",
                        offset: [0, 8],
                        color: "#457aff",
                        fontSize: 12,
                        fontFamily: "arial"
                    }
                },
                barWidth: 15,
                itemStyle: {
                    normal: {
                        color: function(params) {
                            return scatterColor[params.name];
                        },
                        barBorderRadius: 4
                    }
                }
            }
        ]
    };
}


function total (arr) { 
    return arr.reduce(function(prev, cur, index, arr) {
         //输出的是第一项的值或上一次叠加的结果，正在被处理的元素，正在被处理的元素的索引值
         return prev + cur.value;
    }, 0)
  
}
class echartsPage extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {}
        this.mapRef=React.createRef()
    }

    componentDidMount() {
        this.getMapChartOption()
        window.addEventListener('resize', this.chartResize)
    }
    getMapChartOption = () => {
        this.chart = echarts.init(this.mapRef.current)
        this.chart.resize()
        
        const {d2012,d2013,d2014,d2015,d2016,d2017,d2018} = datas
        const d2012d = [...d2012]
        const d2013d = [...d2012,...d2013]
        const d2014d = [...d2012,...d2013,...d2014]
        const d2015d = [...d2012,...d2013,...d2014,...d2015]
        const d2016d = [...d2012,...d2013,...d2014,...d2015,...d2016]
        const d2017d = [...d2012,...d2013,...d2014,...d2015,...d2016,...d2017]
        const d2018d = [...d2012,...d2013,...d2014,...d2015,...d2016,...d2017,...d2018]

        this.chart.setOption({
            "baseOption": {
                tooltip: {
                    formatter: function(params){
                        if(params.value.length> 2){ 
                            return params.name+':('+params.value[0]+','+params.value[1]+')'
                        }

                    }
                },
                xAxis: {
                    show: true,
                    axisLine: {
                        show: false,
                    },
                    boundaryGap: false,
                    splitLine: {
                        show: false
                    },
                    axisTick: {
                        show: false,
                    },
                    scale: true,
                    position: 'top',
                    min: 0,
                    axisLabel: {
                        margin: 2,
                        textStyle: {
                            color: '#92c3fe'
                        }
                    },
                },
                grid: {
                    right: '5%',
                    top: '16%',
                    bottom: '10%',
                    width: '20%'
                },
                geo: {
                    roam: true,
                    map: 'beijing',
                    zoom: 1,
                    top: 40,
                    left:'16%',
                    bottom: 120,
                    label: {
                        show: true,
                        color: '#F7F9FB',
                        fontSize: 14,
                        offset: [10, 40],
                        formatter(param){
                            return param.name.slice(0, -1)
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    itemStyle: {
                        normal: {
                            areaColor: '#013659',
                            // areaColor: '#ccc',
                            borderColor: '#007FD0',
                        },
                        emphasis: {
                            areaColor: 'transparent'
                        }
                    },
                },
                timeline: {
                    axisType: 'category',
                    autoPlay: true,
                    playInterval: 2500,
                    left: '10%',
                    right: '40%',
                    bottom: '3%',
                    width: '55%',
                    label: {
                        normal: {
                            textStyle: {
                                color: '#92c3fe'
                            }
                        },
                        emphasis: {
                            textStyle: {
                                color: '#fff'
                            }
                        }
                    },
                    symbolSize: 10,
                    lineStyle: {
                        color: '#92c3fe'
                    },
                    checkpointStyle: {
                        borderColor: '#13e577',
                        borderWidth: 2, 
                        color: '#13e577',
                    },
                    controlStyle: {
                        showNextBtn: true,
                        showPrevBtn: true,
                        normal: {
                            color: '#02efef',
                            borderColor: '#02efef'
                        },
                        emphasis: {
                            color: '#aaa',
                            borderColor: '#aaa'
                        }
                    },
                    "data": ["2012", "2013", "2014", "2015", "2016", "2017", "2018"]
                }
            },
            "options": [
                setSerious( d2012d,'#05C3F9', barDatas.d2012, 2012,1120),
                setSerious( d2013d,'red', barDatas.d2013,2013,1208),
                setSerious( d2014d,'yellow', barDatas.d2014,2014,1357),
                setSerious( d2015d,'pink', barDatas.d2015,2015,1505),
                setSerious( d2016d,'blue', barDatas.d2016,2016,1575),
                setSerious( d2017d,'red', barDatas.d2017,2017,1593),
                setSerious( d2018d,'green', barDatas.d2018,2018,1615),
            ]
        });

    }

    chartResize() {
        if (this.chart) {
            this.chart.resize()
        }
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.chartResize)
    }
    
   
    

    render() {
        return (
            <div className="main-box">
                <div className="header">
                    <div className="title">2019XXXXXXXXXXXXXXXXXXX</div>
                    <div className="right-title">
                        <div className="lian">联合发布</div>
                        <div className="img1"><img src={zhong} alt=""/></div>
                        <div className="img2"><img src={mlamp} alt=""/></div>
                    </div>
                </div>
                <div className="map-box">
                    {/* <div className="total-view">企业总数</div> */}
                    <div className="maps">
                        <div className="map" ref={this.mapRef}></div>
                    </div>
                </div>
            </div>
        )
    }
}

// echartsPage.propTypes = {
//
// }

// echartsPage.defaultProps = {
//
// }

export default echartsPage
