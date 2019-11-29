
import React from 'react';
import CyclicRollList from '../list-item/index'


import './scss/index.scss'


const data = [
    { id: 1,  name: '列表每一条数据显示11111' },
    { id: 2,  name: '列表每一条数据显示2222' },
    { id: 3,  name: '列表每一条数据显示3333' },
    { id: 4,  name: '气列表每一条数据显示4444' },
    { id: 5,  name: '列表每一条数据显示55555' },
    { id: 6,  name: '列表每一条数据显示6666' },
    { id: 7,  name: '列表每一条数据显示7777' },
    { id: 8,  name: '列表每一条数据显示88888' },
    { id: 9,  name: '列表每一条数据显示9999' },
    { id: 10,  name: '列表每一条数据显示1000' },
    { id: 11,  name: '列表每一条数据显示1100' },
    { id: 12,  name: '列表每一条数据显示1200' },
    { id: 13,  name: '列表每一条数据显示1300' },
    { id: 14,  name: '列表每一条数据显示1400' },
]

const itemHeight = 54
const timer = 1000 // 滚动间隔
const type = 2

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            resizeFlag: false,
            cyclicHeight: '40%'
        }
        this.handleClick = this.handleClick.bind(this)
    }

    resetResizeFlag = () => {
        this.setState({
            resizeFlag: false
        })
    }

    handleClick ()  {
        const {cyclicHeight} = this.state
        if(cyclicHeight === '40%') {
            this.setState({
                cyclicHeight: '60%',
                resizeFlag: true
            })
        } else {
            this.setState({
                cyclicHeight: '40%',
                resizeFlag: true
            })
        }
    }

    render() {
        const { resizeFlag, cyclicHeight } = this.state
        return (
            <div className="main-content">
                <div className="cyclic-box" style={{height: cyclicHeight}}>
                    <CyclicRollList
                        rollData={data}
                        itemHeight={itemHeight}
                        timer={timer}
                        resizeFlag={resizeFlag}
                        resetResizeFlag={this.resetResizeFlag}
                    />
                </div>
                <button onClick={this.handleClick}>点击调整列表的高度</button>
            </div>
            
        )
    }
}

export default App
