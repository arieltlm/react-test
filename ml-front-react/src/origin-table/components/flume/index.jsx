/**
 * 功能：原始表字段-FlUME
 * 作者：tlm
 * 日期： 2019-07-30
 */
import { React, PropTypes, PureComponent } from 'framework/Util'
import { Button, message } from 'antd'
import dialog from 'dialog'

import StartFlumeModal from '../start-modal'

class Flume extends PureComponent{
    constructor(props) {
        super(props)
        this.state = {
            flumeStatus: 0,
            startFlumeVisible: false,
            flumeParam: {}
        }
    }
   
    componentDidMount() {
        const { checkExistFlume } = this.props
        checkExistFlume()
            .then((datas) => {
                if (datas.statusCode === 200) {
                    if (datas.data === 1){
                        this.setState({
                            flumeStatus: 1
                        })
                    }
                }
            })
    }

    // 启动FLUME处理
    handleFlume = () => {
        const { checkExistFlume, getFlumeParam } = this.props
        const { flumeStatus } = this.state
        if (!flumeStatus){
            checkExistFlume()
                .then((datas) => {
                    if (datas.statusCode === 200) {
                        if (datas.data === 0){
                            getFlumeParam()
                                .then((res) => {
                                    if (res.statusCode === 200){
                                        this.setState({
                                            startFlumeVisible: true,
                                            flumeParam: res.data
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
                                    this.stopFlume()
                                },
                            })
                        } else {
                            message.warning(datas.message)
                        }
                    }
                })
        } else {
            this.stopFlume()
        }
    }

    stopFlume = () => {
        const { stopFlume } = this.props
        stopFlume()
            .then((datas) => {
                if (datas.statusCode === 200) {
                    this.setState({
                        flumeStatus: 0
                    })
                    message.success(datas.message)
                }
            })
    }

    handlePostFlume = (datas) => {
        const { postInsertFlume, startFlume, dataSourceInfoId } = this.props
        postInsertFlume({
            data: { data: datas }
        })
            .then((res) => {
                if (res.statusCode === 200){
                    this.handleStartFlumeClose()
                    startFlume({
                        params: { dataSourceInfoId }
                    })
                        .then((result) => {
                            if (result.statusCode === 200){
                                this.setState({
                                    flumeStatus: 1
                                })
                                message.success(result.message)
                            }
                        })
                }
            })
    }

    handleStartFlumeClose = () => {
        this.setState({
            startFlumeVisible: false
        })
    }

    render() {
        const { flumeStatus, flumeParam, startFlumeVisible } = this.state
        return (
            <React.Fragment>
                <Button type="primary" onClick={this.handleFlume}>{flumeStatus ? '停止FLUME' : '启动FLUME'}</Button>
                {
                    startFlumeVisible 
                    && (
                        <StartFlumeModal
                            paramsData={flumeParam}
                            visible={startFlumeVisible} 
                            handleCancel={this.handleStartFlumeClose}
                            handlePost={this.handlePostFlume}
                            title="FLUME"
                        />
                    )
                }
            </React.Fragment>
        )
    }
}

Flume.propTypes = {
    checkExistFlume: PropTypes.func.isRequired,
    getFlumeParam: PropTypes.func.isRequired,
    stopFlume: PropTypes.func.isRequired,
    postInsertFlume: PropTypes.func.isRequired,
    startFlume: PropTypes.func.isRequired,
    dataSourceInfoId: PropTypes.string.isRequired,
}


export default Flume
