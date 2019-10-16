# cyclic-roll
----

## **功能描述：**
实现了一个高阶组件完成列表无缝循环滚动的功能，
并对列表容器因一些如别的模块展开收起使得此模块高度发生变化的情况，以及浏览器大小发生变化的情况做了处理

## **安装：**
```js
npm i cyclic-roll
```
## **git:**

[cyclic-roll-components](https://github.com/arieltlm/react-test/tree/master/react-npm-packages/cyclic-roll-components)

## **使用：**

```js
// cyclic-roll-list.js
import CyclicRoll from 'cyclic-roll'

// 列表每条的显示形式
function ListItem(){
    return ...
}

export default CyclicRoll(ListItem)
```

* **简单调用：**

```js
// app.js
import React from 'react'

import CyclicRollList from './cyclic-roll-list'

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
]

const itemHeight = 54
const timer = 1000 // 滚动间隔

function App() {
    return (
        <div style={{height:300}}>
            <CyclicRollList
                rollData={data}
                timer={timer}
                itemHeight={itemHeight}
            />
        </div>
    )
}

export default App
```


* **列表容器大小发生变化**


```js
import React from 'react';
import CyclicRollList from '../list-item/index'

import './scss/index.scss'

const itemHeight = 54
const timer = 3000 // 滚动间隔
const type = 2

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            resizeFlag: false,
            cyclicHeight: 400
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
```

## 参数说明
| 参数    |        说明     | 类型| 默认值|
|--------- |----------------------- |----------------------- |----------------------- |
|rollData | 列表数据，数组形式|array|[]|
|timer | 定时时间，每隔x毫秒滚动一次|number|5000|
|itemHeight | 列表每条的高度|number|30|
|resizeFlag | 容器高度发生变化的标志--true|boolean|false|
|resetResizeFlag | 将resizeFlag置为false的方法|func|false|


> 特殊说明： resizeFlag为true传入即容器高度每次发生变化--计算容器内显示列表条数，然后将resizeFlag置为false

