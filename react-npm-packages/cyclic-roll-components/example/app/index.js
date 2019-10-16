
import React from 'react';


import CyclicRollList from '../cyclic-roll-list'

import './scss/index.scss'


const data = [
    { id: 1, state: 1, name: '速度传感器续接11111' },
    { id: 2, state: 0, name: '状态信号反馈错误2222' },
    { id: 3, state: 1, name: '速度传感器续接3333' },
    { id: 4, state: 0, name: '气动阀内泄漏44444' },
    { id: 5, state: 2, name: '速度传感器续接55555' },
    { id: 6, state: 0, name: '速度传感器续接6666' },
    { id: 7, state: 1, name: '速度传感器续接7777' },
    { id: 8, state: 2, name: '速度传感器续接8888' },
    { id: 9, state: 2, name: '速度传感器续接9999' },
    { id: 10, state: 2, name: '速度传感器续接1000' },
    { id: 11, state: 2, name: '速度传感器续接1100' },
    { id: 12, state: 2, name: '速度传感器续接1200' },
    { id: 13, state: 2, name: '速度传感器续接1300' },
    { id: 14, state: 2, name: '速度传感器续接1400' },
]

const itemHeight = 54
const timer = 3000 // 滚动间隔
const type = 2

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            resizeFlag: false,
            cyclicHeight: '40%'
        }
    }


    resetResizeFlag = () => {
        this.setState({
            resizeFlag: false
        })
    }

    handleClick = () => {
        const {cyclicHeight} = this.state
        if(cyclicHeight === 400) {
            this.setState({
                cyclicHeight: 600,
                resizeFlag: true
            })
        } else {
            this.setState({
                cyclicHeight: 400,
                resizeFlag: true
            })
        }
    }

    render() {
        const { resizeFlag, cyclicHeight } = this.state
        return (
            <div className="container">
                <div className="cyclic-box" style={{height: cyclicHeight}}>
                    <CyclicRollList
                        rollData={data}
                        timer={timer}
                        itemHeight={itemHeight}
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
