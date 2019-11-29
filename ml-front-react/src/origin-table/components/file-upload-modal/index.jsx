/**
 * 功能：原始表-上传模版弹框
 * 作者：tlm
 * 日期： 2019-07-29
 */
import { React, PropTypes, PureComponent } from 'framework/Util'
import { Modal, Input, Upload, message } from 'antd'

import './scss/index.scss'

class FileUpload extends PureComponent{
    constructor(props) {
        super(props)
        this.state = {
            files: {},
        }
    }

    handleUploadFile =() => {
        const { uploadFile, handleCancel } = this.props
        const { files } = this.state
        const formData = new FormData()
        formData.append('file', files)
        
        uploadFile({ 
            data: formData,
        })
            .then((datas) => {
                if (datas.statusCode === 200) {
                    message.success('上传成功')
                    handleCancel()
                }
            })
    }

    render() {
        const { handleCancel, visible } = this.props
        const { files } = this.state

        const uploadProps = {
            showUploadList: false,
            beforeUpload: (file) => {
                this.setState({
                    files: file
                })
                return false
            },
            fileList: [files],
        }
        return (
            <Modal
                title="上传模版"
                visible={visible}
                onOk={this.handleUploadFile}
                onCancel={handleCancel}
                styleName="upload-box"
                closable={false}
            >
                <div className="upload-content">
                    <div className="upload-text">模版路径</div>
                    <Upload {...uploadProps} className="upload-container">
                        <Input
                            placeholder="请选择上传模版"
                            value={files.name || ''}
                            suffix={(
                                <span className="fa fa-cloud-upload" />
                            )}
                        />
                    </Upload>
                </div>
            </Modal>
        )
    }
}

FileUpload.propTypes = {
    uploadFile: PropTypes.func.isRequired,
    handleCancel: PropTypes.func.isRequired,
    visible: PropTypes.bool.isRequired,
}

export default FileUpload
