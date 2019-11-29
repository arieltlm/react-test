/**
 * 功能：原始表-数据源
 * 作者：tlm
 * 日期： 2019-07-23
 */
import { React, PureComponent, PropTypes, pathToRegExp } from 'framework/Util'
import { Button } from 'antd'
import config from 'conf'
import dialog from 'dialog'

import BreadcrumbView from '@/components/breadcrumb'
import TableList from '@/components/table-set'
import TableHeaderSel from '@/components/table-header-change'
import FileUpload from '../file-upload-modal'
import Stream from '../stream'
import VerifiBtn from '@/components/verify-btn'


const { 
    url: { app: { originalDataSource, originalTableList } },
    constant: { verifyDataParams: { originTableVerify: { dataSourceVerify } } }
} = config
const gotoPagePath = pathToRegExp.compile(originalTableList.path)
  
  
class DataSource extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            fileUploadVisible: false,
        }
    }

    componentDidMount() {
        const { getDataSource } = this.props
        getDataSource()
    }

    // 表格字段编辑完的提交
    handleSubmitEdit = (modifyData) => {
        const { modifyDataSource } = this.props
        const { id, ...others } = modifyData
        modifyDataSource({
            params: { dataSourceInfoId: id },
            data: { data: { dataSourceInfoId: id, ...others } },
        }).then((datas) => {
            if (datas.statusCode === 200) {
                dialog.hide()
            } 
        })
    }

    // 上传模版
    handleFileUploadClose = () => {
        this.setState({
            fileUploadVisible: false
        })
    }

    handleUploadShow = () => {
        this.setState({
            fileUploadVisible: true
        })
    }

    render() {
        const { label } = originalDataSource
        const linkInfo = [{ label }]

        const { 
            dataSource, 
            headers, 
            headerShow,
            setTableHeaders, 
            uploadFile,
            verifyData,
            checkExistStream, 
            getStreamParam,
            stopExistStream, 
            postStartStream, 
            recoverFromCheckpoint,
            changeTableHeader,
        } = this.props

        const { fileUploadVisible } = this.state

        const tableInfo = {
            dataSource,
            headers: headerShow,
            firstCol: 'goto',
            gotoPagePath,
            idField: 'dataSourceInfoId',
            showPage: false,
            columnsWidth: { url: 400 },
            scroll: { x: 1440, y: 'calc(100% - 46px)' }
        }
        
        // 验证参数
        const verifyParams = {
            selectedId: -1,
            ...dataSourceVerify
        }

        return (
            <div>
                <BreadcrumbView linkInfo={linkInfo} />
                <div className="main-content">
                    <div className="button-group clearfix">
                        <Stream 
                            checkExistStream={checkExistStream}
                            getStreamParam={getStreamParam}
                            stopExistStream={stopExistStream}
                            postStartStream={postStartStream}
                            recoverFromCheckpoint={recoverFromCheckpoint}
                        />
                        <Button type="primary" icon="upload" onClick={this.handleUploadShow}>上传模版</Button>
                        <VerifiBtn params={verifyParams} fncb={verifyData} />
                        <TableHeaderSel
                            headers={headers}
                            setTableHeaders={setTableHeaders} 
                            changeTableHeader={changeTableHeader} 
                        />
                    </div>
                    <div className="table-list">
                        <TableList {...tableInfo} handleSubmitEdit={this.handleSubmitEdit} />
                    </div>
                </div>
                {fileUploadVisible 
                && (
                    <FileUpload 
                        visible={fileUploadVisible}
                        handleCancel={this.handleFileUploadClose}
                        uploadFile={uploadFile}
                    />
                )}
            </div>
        )
    }
}
DataSource.propTypes = {
    getDataSource: PropTypes.func.isRequired,
    modifyDataSource: PropTypes.func.isRequired,
    setTableHeaders: PropTypes.func.isRequired,
    changeTableHeader: PropTypes.func.isRequired,
    uploadFile: PropTypes.func.isRequired,
    verifyData: PropTypes.func.isRequired,
    checkExistStream: PropTypes.func.isRequired,
    getStreamParam: PropTypes.func.isRequired,
    stopExistStream: PropTypes.func.isRequired,
    postStartStream: PropTypes.func.isRequired,
    recoverFromCheckpoint: PropTypes.func.isRequired,
    dataSource: PropTypes.array.isRequired,
    headers: PropTypes.array.isRequired,
    headerShow: PropTypes.array.isRequired,
}

export default DataSource
