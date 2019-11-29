/**
 * 功能：原始表字段-流
 * 作者：tlm
 * 日期： 2019-07-29
 */
import { React, PropTypes, PureComponent } from 'framework/Util'
import { Button, message } from 'antd'
import dialog from 'dialog'

import StartStream from '../start-modal'

class Stream extends PureComponent{
    constructor(props) {
        super(props)
        this.state = {
            streamState: 0,
            startStreamVisible: false,
            streamParam: {}
        }
    }

   
    componentDidMount() {
        const { checkExistStream } = this.props
        checkExistStream()
            .then((datas) => {
                if (datas.statusCode === 200) {
                    if (datas.data === 1){
                        this.setState({
                            streamState: 1
                        })
                    }
                }
            })
    }
    

    // 启动流处理
    handleStream = () => {
        const { checkExistStream, getStreamParam } = this.props
        const { streamState } = this.state
        if (!streamState){
            checkExistStream()
                .then((datas) => {
                    if (datas.statusCode === 200) {
                        if (datas.data === 0){
                            getStreamParam()
                                .then((res) => {
                                    if (res.statusCode === 200){
                                        this.setState({
                                            startStreamVisible: true,
                                            streamParam: res.data
                                        })
                                    }   
                                })
                        } else if (datas.data === 1) {
                            dialog.alert({
                                title: '提醒',
                                infoType: 'warning',
                                width: 300,
                                content: <div className="warn-dialog-text">{datas.message}</div>,
                                ok: () => {
                                    this.stopStream()
                                },
                            })
                        } else {
                            message.warning(datas.message)
                        }
                    }
                })
        } else {
            this.stopStream()
        }
    }

    stopStream = () => {
        const { stopExistStream } = this.props
        stopExistStream()
            .then((datas) => {
                if (datas.statusCode === 200) {
                    this.setState({
                        streamState: 0
                    })
                    message.success(datas.message)
                }
            })
    }

    handlePostStream = (datas) => {
        const { postStartStream, recoverFromCheckpoint } = this.props
        postStartStream({
            data: { data: datas }
        })
            .then((res) => {
                if (res.statusCode === 200){
                    this.setState({
                        streamState: 1
                    })
                    this.handleStartStreamClose()
                    if (res.data === 0){
                        message.success(res.message)
                    } else {
                        dialog.alert({
                            title: '提醒',
                            infoType: 'warning',
                            width: 300,
                            content: <div className="warn-dialog-text">是否从检查点恢复?</div>,
                            ok: () => {
                                recoverFromCheckpoint({
                                    params: { status: 1 }
                                })
                                    .then((result) => {
                                        if (result.statusCode === 200){
                                            message.success(result.message)
                                        }
                                    })
                            },
                            cancel: () => {
                                recoverFromCheckpoint({
                                    params: { status: 0 }
                                })
                                    .then((result) => {
                                        if (result.statusCode === 200){
                                            message.success(result.message)
                                        }
                                    })
                            }
                        })
                    }
                }
            })
    }

    handleStartStreamClose = () => {
        this.setState({
            startStreamVisible: false
        })
    }

    render() {
        const { streamState, streamParam, startStreamVisible } = this.state
        return (
            <React.Fragment>
                <Button type="primary" onClick={this.handleStream}>{streamState ? '停止流' : '启动流'}</Button>
                {
                    startStreamVisible 
                    && (
                        <StartStream
                            paramsData={streamParam}
                            visible={startStreamVisible} 
                            handleCancel={this.handleStartStreamClose}
                            handlePost={this.handlePostStream}
                            title="流"
                        />
                    )
                }
            </React.Fragment>
        )
    }
}

Stream.propTypes = {
    checkExistStream: PropTypes.func.isRequired,
    getStreamParam: PropTypes.func.isRequired,
    stopExistStream: PropTypes.func.isRequired,
    postStartStream: PropTypes.func.isRequired,
    recoverFromCheckpoint: PropTypes.func.isRequired,
}


export default Stream
