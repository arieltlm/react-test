/**
 * 功能: 原始表-数据源
 * 作者： tlm
 * 日期：2019-07-24
 */

import { connect, hot, createSelector, Helper } from 'framework/Util'
import actionCreator from '../../actions/actionCreator'
import OriginTableDatasource from '../../components/origin-table-datasource'

const getState = state => state.originTable.originTableDatasource


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

export default connect(selector, actionCreator)(hot(module)(OriginTableDatasource))
