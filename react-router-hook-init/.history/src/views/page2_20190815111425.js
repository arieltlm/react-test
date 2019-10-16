// import React from 'react';
// import PropTypes from 'prop-types';

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

  leftHeight = 0

  containerWidth = 0

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
    // const hEle = document.getElementById('h_resize_container')
    const hEle = document.getElementById('v_resize_container')
    this.resizeOffsetInfo = this.getEleOffset(hEle)
    debugger
    this.leftHeight = hEle.offsetHeight
    this.containerWidth = document.getElementById('v_resize_container').offsetWidth
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
  * 开始拖动垂直调整块
  */
  vResizeDown = () => {
    this.setState({
      isVResize: true
    })
  }

  /**
  * 拖动垂直调整块
  */
  vResizeOver = (e) => {
    const { isVResize, vNum, vNumLimit } = this.state
    if (isVResize && vNum >= vNumLimit && (this.containerWidth - vNum >= vNumLimit)) {
      let newValue = e.clientX - this.resizeOffsetInfo.clientLeft
      if (newValue < vNumLimit) {
        newValue = vNumLimit
      }
      if (newValue > this.containerWidth - vNumLimit) {
        newValue = this.containerWidth - vNumLimit
      }
      this.setState({
        vNum: newValue
      })
    }
  }

  /**
  * 只要鼠标松开或者离开区域，那么就停止resize
  */
  stopResize = () => {
    this.setState({
      isHResize: false,
      isVResize: false
    })
  }

  render() {
    const hCursor = this.state.isHResize ? 'row-resize' : 'default'
    const hColor = this.state.isHResize ? '#ddd' : '#fff'
    // const vCursor = this.state.isVResize ? 'col-resize' : 'default'
    // const vColor = this.state.isVResize ? '#ddd' : '#fff'

    return (
      <div className={'container'} onMouseUp={this.stopResize} onMouseLeave={this.stopResize}>
        <div id='v_resize_container' className={'content'} onMouseMove={this.vResizeOver}>
          {/* <div id='h_resize_container' style={{ width: 500 }} className={'left'}> */}
            <div style={{ bottom: this.state.hNum, cursor: hCursor }} className={'left-top'}>aasd1</div>
            <div style={{ bottom: this.state.hNum, backgroundColor: hColor }} draggable={false} onMouseDown={this.hResizeDown} className="h-resize" />
            <div style={{ height: this.state.hNum + 4, cursor: hCursor }} className={'left-bottom'}>asd2</div>
          </div>
          {/* <div style={{ left: this.state.vNum, backgroundColor: vColor }} draggable={false} onMouseDown={this.vResizeDown} className="v-resize" /> */}
          {/* <div style={{ marginLeft: this.state.vNum + 4, cursor: vCursor }} className={'right'}>
            asdas3
          </div> */}
        {/* </div> */}
      </div>
    )
  }
}
// ResizeDiv.propTypes = {
//   match: PropTypes.object
// };
// export default ResizeDiv;