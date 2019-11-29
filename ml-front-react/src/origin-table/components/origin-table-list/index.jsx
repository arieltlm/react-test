/**
 * 功能：原始表
 * 作者：tlm
 * 日期： 2019-07-23
 */
import { React, PureComponent, PropTypes, pathToRegExp } from 'framework/Util'
import { Input } from 'antd'
import config from 'conf'
import dialog from 'dialog'

import BreadcrumbView from '@/components/breadcrumb'
import TableList from '@/components/table-set'
import TableHeaderSel from '@/components/table-header-change'
import Flume from '../flume'
import VerifiBtn from '@/components/verify-btn'

const { Search } = Input

const { 
    url: { app: { originalDataSource, originalTableField } },
    constant: { verifyDataParams: { originTableVerify: { originListVerify } } }
} = config
const gotoPagePath = pathToRegExp.compile(originalTableField.path)

class OriginTableList extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            pageName: '',
            pageSize: 20,
            pageNum: 1,
            total: 0,
            searchValue: '',
        }
    }

    componentDidMount() {
        this.getOriginList(true)
    }

    getOriginList = () => {
        const { match, getOriginTableList } = this.props
        const { params: { dataSourceInfoId } } = match
        const { pageNum, pageSize, searchValue } = this.state
        getOriginTableList({
            params: {
                dataSourceInfoId,
                searchCondition: searchValue,
                page: pageNum,
                pageSize
            }
        }).then((datas) => {
            if (datas.statusCode === 200) {
                const { data: { name, totalNum } } = datas
                this.setState({
                    pageName: name,
                    total: totalNum
                })
            } 
        })
    }

    handleSearch = (value) => {
        this.setState({
            searchValue: value,
            pageNum: 1,
        }, () => {
            this.getOriginList()
        })
    }

    handleSubmitEdit = (modifyData) => {
        const { modifyOriginTableList } = this.props
        const { id, ...others } = modifyData
        modifyOriginTableList({
            params: { originTableId: id },
            data: { data: { originTableId: id, ...others } },
        }).then((datas) => {
            if (datas.statusCode === 200) {
                dialog.hide()
            } 
        })
    }

    handleTablePageChange = (pagination) => {
        const { current, pageSize } = pagination
        this.setState({ pageNum: current, pageSize }, () => {
            this.getOriginList()
        })
    }

    render() {
        const { label } = originalDataSource
        const { pageName, pageSize, pageNum, total, } = this.state

        const originDatasource = pageName ? pageName[0] : ''
        const breadcrumbValue = pageName ? `${label}-${pageName[0]}(${pageName[1]})` : label

        const linkInfo = [{
            ...originalDataSource
        }, {
            label: breadcrumbValue 
        }]

        const { 
            dataSource, 
            headers, 
            setOriginTableListHeaders, 
            match,
            verifyData,
            checkExistFlume,
            getFlumeParam,
            stopFlume,
            postInsertFlume,
            changeTableHeader,
            startFlume,
            headerShow
        } = this.props

        const { params: { dataSourceInfoId } } = match

        const nowPageStart = (pageNum - 1) * pageSize + 1
        const nowPageEnd = pageNum * pageSize > total ? total : pageNum * pageSize

        const tableInfo = {
            dataSource,
            headers: headerShow,
            firstCol: 'goto',
            gotoPagePath,
            nowPathParam: { dataSourceInfoId: String(dataSourceInfoId) },
            query: { lastPageName: breadcrumbValue },
            columnsWidth: { description: 300 },
            idField: 'originTableId',
            showPage: true,
            paginationOptions: {
                pageSize,
                total,
                current: pageNum,
                showTotal: totalNum => `共${totalNum}条记录, 当前条数为${nowPageStart} - ${nowPageEnd}`,
                showSizeChanger: true,
                pageSizeOptions: ['20', '50', '100'],
                showQuickJumper: true
            },
            scroll: { x: '110%', y: 'calc(100% - 46px)' }
        }

        const verifyParams = {
            selectedId: dataSourceInfoId,
            ...originListVerify
        }
        
        return (
            <div>
                <BreadcrumbView linkInfo={linkInfo} />
                <div className="main-content">
                    <div className="button-group clearfix">
                        <Search
                            placeholder="请输入搜索关键字"
                            onSearch={this.handleSearch}
                            style={{ width: 200 }}
                        />
                        {originDatasource === 'kafka' && (
                            <Flume
                                dataSourceInfoId={dataSourceInfoId} 
                                checkExistFlume={checkExistFlume}
                                getFlumeParam={getFlumeParam}
                                stopFlume={stopFlume}
                                postInsertFlume={postInsertFlume}
                                startFlume={startFlume}
                            />
                        )}
                        
                        <VerifiBtn params={verifyParams} fncb={verifyData} />
                        <TableHeaderSel
                            headers={headers} 
                            setTableHeaders={setOriginTableListHeaders}
                            changeTableHeader={changeTableHeader}
                        />
                    </div>
                    <div className="table-list has-pagination-table">
                        <TableList
                            {...tableInfo}
                            handleSubmitEdit={this.handleSubmitEdit}
                            onChangeCB={this.handleTablePageChange}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

OriginTableList.propTypes = {
    getOriginTableList: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
    modifyOriginTableList: PropTypes.func.isRequired,
    setOriginTableListHeaders: PropTypes.func.isRequired,
    verifyData: PropTypes.func.isRequired,
    changeTableHeader: PropTypes.func.isRequired,
    checkExistFlume: PropTypes.func.isRequired,
    getFlumeParam: PropTypes.func.isRequired,
    stopFlume: PropTypes.func.isRequired,
    postInsertFlume: PropTypes.func.isRequired,
    startFlume: PropTypes.func.isRequired,
    dataSource: PropTypes.array.isRequired,
    headers: PropTypes.array.isRequired,
    headerShow: PropTypes.array.isRequired,
}

export default OriginTableList
