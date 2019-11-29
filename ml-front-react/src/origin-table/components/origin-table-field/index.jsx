/**
 * 功能：原始表字段
 * 作者：tlm
 * 日期： 2019-07-26
 */
import { React, PureComponent, PropTypes, pathToRegExp } from 'framework/Util'
import { Button, Icon, message } from 'antd'
import config from 'conf'
import dialog from 'dialog'

import BreadcrumbView from '@/components/breadcrumb'
import TableList from '@/components/table-set'
import TableHeaderSel from '@/components/table-header-change'
import AddField from '../add-field-modal'
import VerifiBtn from '@/components/verify-btn'
import DeleteBtn from '@/components/delete-btn'

const { 
    url: { app: { originalDataSource, originalTableList, ruleConfigOriginTable } },
    constant: { verifyDataParams: { originTableVerify: { originFieldVerify } } }
} = config
const gotoPagePath = pathToRegExp.compile(originalTableList.path)

class OriginTableField extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            pageName: [],
            selectData: [],
            addFieldModalShow: false,
            warningModalShow: false,
            selectedRowKeys: []
        }
        this.fieldTableBox = React.createRef()
    }

    componentDidMount() {
        const { match, getOriginTableField } = this.props
        const { params: { originTableId } } = match

        getOriginTableField({
            params: {
                originTableId
            }
        }).then((datas) => {
            if (datas.statusCode === 200) {
                const { data: { name } } = datas
                this.setState({
                    pageName: name
                })
            }
        })
    }

    handleSubmitEdit = (modifyData) => {
        const { modifyOriginTableField, match } = this.props
        const { params: { originTableId } } = match
        const { id, isMultiEdit, ...others } = modifyData
        const { selectData } = this.state
        const targetAttrIds = (isMultiEdit === '1' && selectData.length > 0) 
            ? selectData.map(item => item.originAttrId.content) 
            : id.split(',')
        modifyOriginTableField({
            data: { data: { targetAttrIds, targetTableId: originTableId, ...others } },
        }).then((datas) => {
            if (datas.statusCode === 200) {
                dialog.hide()
            } 
        })
    }

    handleCheck = (selectedRowKeys, selectedRows) => {
        this.setState({
            selectedRowKeys,
            selectData: [...selectedRows],
        })
    }

    handleGoRule = () => {
        const { history, match } = this.props
        const { params: { originTableId } } = match
        dialog.confirm({
            title: '跳转到规则配置',
            infoType: 'warning',
            width: 240,
            content: <div><Icon type="warning" theme="filled" className="warning-icon" />确定要跳转到规则配置吗？</div>,
            ok: () => {
                const gotoRuleConfigPath = pathToRegExp.compile(ruleConfigOriginTable.path)({ originTableId })
                history.replace(gotoRuleConfigPath) 
                dialog.hide()
            }
        })
    }

    handleModalVisible = (stateField, isShow) => {
        this.setState({
            [stateField]: isShow
        })
    }

    handleAddFieldSubmit = (value) => {
        const { addOriginTableField, match } = this.props
        const { params: { originTableId } } = match
        addOriginTableField({
            params: { originTableId },
            data: { data: { ...value } }
        }).then((res) => {
            if (res.statusCode === 200){
                this.setState({
                    addFieldModalShow: false,
                    warningModalShow: false
                })
                message.success('增加成功')
            }
        })
    }

    clearSelectRow =() => {
        this.setState({
            selectData: [],
            selectedRowKeys: []
        })
    }

    render() {
        const { 
            dataSource, 
            headers, 
            headerShow,
            setOriginTableFieldHeaders, 
            match,
            verifyData,
            deleteOriginTableField,
            history,
            changeTableHeader,
        } = this.props

        const { params: { dataSourceInfoId, originTableId } } = match
        const { label } = originalTableList
        const { pageName, selectData, selectedRowKeys, addFieldModalShow, warningModalShow } = this.state
        const { location: { lastPageName } } = history

        const linkInfo = [{
            ...originalDataSource
        }, {
            label: lastPageName || '数据源',
            path: gotoPagePath({ dataSourceInfoId })
        },
        {
            label: pageName ? `${label}-${pageName[0]}(${pageName[1]})` : label
        }]
        
        const rowSelection = {
            onChange: this.handleCheck,
            fixed: true,
            selectedRowKeys
        }

        const tableInfo = {
            dataSource,
            headers: headerShow,
            idField: 'originAttrId',
            showPage: false,
            columnsWidth: { isAvailable: 150 },
            scroll: { x: 2000, y: 'calc(100% - 46px)' },
            rowSelection,
            selectMultiRowFlag: selectData.length > 0
        }

        const verifyParams = {
            selectedId: originTableId,
            ...originFieldVerify
        }
        return (
            <div>
                <BreadcrumbView linkInfo={linkInfo} />
                <div className="main-content">
                    <div className="button-group clearfix">
                        <Button type="primary" onClick={this.handleGoRule}>
                            <i className="fa fa-link fa-lg" />跳转到规则配置
                        </Button>
                        <Button type="primary" icon="plus-square" onClick={() => this.handleModalVisible('addFieldModalShow', true)}>增加</Button>
                        <DeleteBtn 
                            selectData={selectData}
                            fncb={deleteOriginTableField}
                            idField="originAttrId"
                            needEnsure
                            callBackFn={this.clearSelectRow}
                        />
                        <VerifiBtn fncb={verifyData} params={verifyParams} />
                        <TableHeaderSel
                            headers={headers} 
                            setTableHeaders={setOriginTableFieldHeaders} 
                            changeTableHeader={changeTableHeader} 
                        />
                    </div>
                    <div className="table-list" ref={this.fieldTableBox}>
                        <TableList {...tableInfo} handleSubmitEdit={this.handleSubmitEdit} />
                    </div>
                    {addFieldModalShow 
                        && (
                            <AddField
                                visible={addFieldModalShow}
                                handleAddFieldSubmit={this.handleAddFieldSubmit} 
                                handleCancel={() => this.handleModalVisible('addFieldModalShow', false)}
                                warningModalVisible={warningModalShow}
                                handleWarningModalClose={() => this.handleModalVisible('warningModalShow', false)}
                                handleWarningModalShow={() => this.handleModalVisible('warningModalShow', true)}
                                callBackFn={this.clearSelectRow}
                            />
                        )
                    }
                </div>

            </div>
        )
    }
}

OriginTableField.propTypes = {
    getOriginTableField: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
    modifyOriginTableField: PropTypes.func.isRequired,
    setOriginTableFieldHeaders: PropTypes.func.isRequired,
    verifyData: PropTypes.func.isRequired,
    addOriginTableField: PropTypes.func.isRequired,
    changeTableHeader: PropTypes.func.isRequired,
    deleteOriginTableField: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    dataSource: PropTypes.array.isRequired,
    headers: PropTypes.array.isRequired,
    headerShow: PropTypes.array.isRequired,
}

export default OriginTableField
