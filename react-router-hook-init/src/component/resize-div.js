import React, { Component } from 'react'
import _ from 'underscore'
import styles from '../index.css'

// 可调整宽高的Div
export default class ResizeDiv extends Component {
  state = {
    isHResize: false,
    isVResize: false,
    hNum: 100,
    vNum: 500,
    hNumLimit: 30,
    vNumLimit: 30
  }

  resizeOffsetInfo = {
    clientTop: 0,
    clientLeft: 0
  }



  componentDidMount() {
    this.initResizeInfo()
    const throttled = _.throttle(() => {
      this.initResizeInfo()
    }, 200)

    window.onresize = throttled
  }
  componentWillUnmount() {
    window.onresize = null
  }

  /**
  * 初始化resize信息
  */
  initResizeInfo = () => {
    const hEle = document.getElementById('h_resize_container')
    this.resizeOffsetInfo = this.getEleOffset(hEle)
  }

  /**
  * 获取元素的偏移信息
  */
  getEleOffset(ele) {
    var clientTop = ele.offsetTop
    var clientLeft = ele.offsetLeft
    let current = ele.offsetParent
    while (current !== null) {
      clientTop += current.offsetTop
      clientLeft += current.offsetLeft
      current = current.offsetParent
    }
    return {
      clientTop,
      clientLeft,
      height: ele.offsetHeight,
      width: ele.offsetWidth
    }
  }


  /**
  * 开始拖动水平调整块
  */
 hResizeDown = () => {
    this.setState({
      isHResize: true
    })
  }

  /**
  * 拖动水平调整块
  */
  hResizeOver = (e) => {
    const { isHResize, hNum, hNumLimit } = this.state
    if (isHResize && hNum >= hNumLimit && (this.resizeOffsetInfo.height - hNum >= hNumLimit)) {
      let newValue = this.resizeOffsetInfo.clientTop + this.resizeOffsetInfo.height - e.clientY
      if (newValue < hNumLimit) {
        newValue = hNumLimit
      }
      if (newValue > this.resizeOffsetInfo.height - hNumLimit) {
        newValue = this.resizeOffsetInfo.height - hNumLimit
      }
      this.setState({
        hNum: newValue
      })
    }
  }

  /**
  * 只要鼠标松开或者离开区域，那么就停止resize
  */
  stopResize = () => {
    this.setState({
      isHResize: false,
    })
  }

  render() {
    const hCursor = this.state.isHResize ? 'row-resize' : 'default'
    const hColor = this.state.isHResize ? '#ddd' : '#fff'

    return (
      <div className={'container'} onMouseUp={this.stopResize} onMouseLeave={this.stopResize}>
          <div id='h_resize_container' style={{ width: 500 }} className={'left'} onMouseMove={this.hResizeOver}>
            <div style={{ bottom: this.state.hNum, cursor: hCursor }} className={'left-top'}>aasd1</div>
            <div style={{ bottom: this.state.hNum, backgroundColor: hColor }} draggable={false} onMouseDown={this.hResizeDown} className="h-resize" />
            <div style={{ height: this.state.hNum + 4, cursor: hCursor }} className={'left-bottom'}>asd2</div>
          </div>
        </div>
    )
  }
}