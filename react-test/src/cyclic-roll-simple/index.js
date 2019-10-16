
import React from 'react';
import CyclicRollList from '../cyclic-roll-test/list-item'

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

const progressItemHeight = 54
const timer = 1000 // 滚动间隔

function CyclicList() {
    return (
        <div style={{height:300}}>
            <CyclicRollList
                rollData={data}
                itemHeight={progressItemHeight}
                timer={timer}
            />
        </div>
    )
}

export default CyclicList
