/**
 * 功能: 原始表-数据列表
 * 作者： tlm
 * 日期：2019-07-26
 */

import { connect, hot, createSelector, Helper } from 'framework/Util'
import actionCreator from '../../actions/actionCreator'
import OriginTableList from '../../components/origin-table-list'

const getState = state => state.originTable.originTableList

const selector = createSelector([
    getState
], (originTableState) => {
    const { setDataSource, fmtTableSetData } = Helper
    const headers = originTableState.get('headers').toJS()
    const dataSourceData = setDataSource(originTableState.get('datasource').toJS(), headers)
    const dataSource = fmtTableSetData(headers, dataSourceData)
    const headerShow = headers.filter(item => item.checked)
    return {
        dataSource,
        headers,
        headerShow,
        highlightIndex: originTableState.get('highlightIndex') && originTableState.get('highlightIndex').toJS(),
    }
})

export default connect(selector, actionCreator)(hot(module)(OriginTableList))
