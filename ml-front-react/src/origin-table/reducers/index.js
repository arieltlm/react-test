/**
 * 功能: 原始表
 * 作者: tlm
 * 日期: 2019-07-24
 */

import { combineReducers } from 'framework/Util'
import originTableList from './origin-table-list'
import originTableDatasource from './origin-table-datasource'
import originTableField from './origin-table-field'


export default combineReducers({
    originTableList,
    originTableDatasource,
    originTableField
})
