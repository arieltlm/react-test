/**
 * 功能: 远程文件下载，需要调用远程接口下载文件
 * 作者: 李玲
 * 日期: 2018-08-31
 */
import { React, PropTypes } from 'framework/Util'

const { Component } = React

class RemoteDownload extends Component {
    constructor(props){
        super(props)
        this.formRef = React.createRef()
    }
    
    componentDidUpdate(){
        const { gotoDownload, afterDownload } = this.props
        if (gotoDownload){
            this.formRef.current.submit()
            afterDownload()
        }
    }
    
    render(){
        const { url, paramData, method } = this.props
        return (
            <div className="hide">
                <form
                    action={url}
                    method={method}
                    target="innerIframe"
                    ref={this.formRef}
                >
                    { Object.keys(paramData).map((key) => {
                        const value = paramData[key] || ''
                        return <input key={key} type="hidden" name={key} value={value} />
                    })}
                </form>
                <iframe title="download" name="innerIframe" />
            </div>
        )
    }
}

RemoteDownload.defaultProps = {
    method: 'post',
    paramData: {}
}

RemoteDownload.propTypes = {
    /**
     * 接口请求地址
     */
    url: PropTypes.string.isRequired,
    method: PropTypes.string,
    /**
     * 要发送给接口的参数
     */
    paramData: PropTypes.object,
    /**
     * 是否要进行下载，true-开始下载
     */
    gotoDownload: PropTypes.bool.isRequired,
    /**
     * 下载完成的回调，需要在此处复位gotoDownload，否则无法进行下一次的下载
     */
    afterDownload: PropTypes.func.isRequired
}

export default RemoteDownload
