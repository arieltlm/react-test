/**
 * 功能：循环滚动组件
 * 作者：tlm
 * 日期： 2019/6/14
 */
import React from 'react'
import PropTypes from 'prop-types'

import './scss/index.scss'

const CyclicRollCmp = ListItem =>  
    class extends React.Component {
        constructor(props) {
            super(props)
            this.state = {
                num: 0,
                currentIndex: 0
            }
            this.interval = null
            this.carouselsRef = React.createRef()
        }
        
        componentDidMount() {
            const num = this.getItemNum()
            this.setState({ num })
            window.addEventListener('resize', this.setItemNum)
            this.startInterval()
        }
        
        componentDidUpdate(prevProps) {
            const { resizeFlag, resetResizeFlag } = this.props
            if (resizeFlag && prevProps.resizeFlag !== resizeFlag){
                this.setItemNum()
                resetResizeFlag()
            }
            // 假如数据长度小于1屏要放的个数就停止滚动
            const { rollData } = this.props
            if (prevProps.rollData !== rollData){
                const { num } = this.state
                const len = rollData.length
                if (len > 0 && this.interval && len <= num) {
                    this.stopInterval()
                    this.interval = null
                    this.setCurrentIndexinit()
                }
            }
        }
            
        componentWillUnmount() {
            this.stopInterval()
            window.removeEventListener('resize', this.setItemNum)
        }
        
        setCurrentIndexinit = () =>{
            this.setState({
                currentIndex: 0
            })
        }

        getItemNum = () => { 
            const { itemHeight } = this.props
            this.carouselHeight = this.carouselsRef && this.carouselsRef.current && this.carouselsRef.current.offsetHeight
            const num = Math.round(this.carouselHeight / itemHeight)
            return num
        }

        setItemNum = () => {
            const num = this.getItemNum()
            this.setState({ num }, () => {
                this.continueInterVal()
            })
        }

        startInterval = () => {
            const { timer } = this.props
            this.interval = setInterval(() => {
                const { currentIndex } = this.state
                const { rollData } = this.props
                let index = currentIndex + 1
                if (rollData.length > 0 && (index > (rollData.length - 1))){
                    index = 0
                }
                this.setState({
                    currentIndex: index
                })
            }, timer)
        }

        continueInterVal= () => {
            // 针对悬停离开的时候————如果一次展示完了，就不需要循环滚动了。清除定时，top回到0
            const { rollData } = this.props
            const { num } = this.state
            this.stopInterval()
        
            if (rollData.length > 0 && num < rollData.length){
                this.startInterval()
            } else if (this.interval){
                this.interval = null
                this.setState({
                    currentIndex: 0
                })
            }
        }

        stopInterval = () =>{
            clearInterval(this.interval)
        }

        setRangeList = (currentIndex, num, length) =>{
            const listArr = []
            if (num < length) {
                if (currentIndex + num <= length){
                    for (let i = currentIndex; i < (currentIndex + num); i++) {
                        listArr.push(i)
                    }
                } else {
                    for (let i = currentIndex; i < length; i++) {
                        listArr.push(i)
                    }
                    for (let i = 0; i < (num - (length - currentIndex)); i++) {
                        listArr.push(i)
                    }
                }
            } else {
                for (let i = currentIndex; i < length; i++) {
                    listArr.push(i)
                }
            }
            return listArr
        }

        render() {
            const { num, currentIndex } = this.state
            const { rollData } = this.props
            const len = rollData.length
            const rangeList = this.setRangeList(currentIndex, num, len)
            console.log('显示的列表个数=====',num);
            return (
                <div className="cycle-box" ref={this.carouselsRef}>
                    <div
                        className="cycle-content"
                        onFocus={this.stopInterval}
                        onMouseLeave={this.continueInterVal}
                        onMouseEnter={this.stopInterval}
                        onBlur={this.continueInterVal}
                    >
                        {rollData.length > 0 && 
                            rangeList.map((item, index) => (
                                <ListItem itemData={rollData[item]} index={index} key={index}/>
                            ))
                        }
                    </div>
                </div>
            )
        }
    }

/**
 * timer 定时
 * resizeFlag 容器高度发生变化的flag，如果为true，重新计算显示的个数
 * resetResizeFlag 改变容器高度发生变化的方法，重新计算完显示个数后，改变resizeFlag为false
 * rollData 数据
 * itemHeight 每条数据的高度包括（margin，padding），即为每次的滚动高度
 */
CyclicRollCmp.propTypes = {
    timer: PropTypes.number,
    resizeFlag: PropTypes.bool,
    resetResizeFlag: PropTypes.func, 
    rollData: PropTypes.array,
    itemHeight: PropTypes.number, 
}

CyclicRollCmp.defaultProps = {
    timer: 5000,
    resizeFlag: false,
    resetResizeFlag: () => {},
    rollData: [],
    itemHeight: 30,
}

export default CyclicRollCmp
