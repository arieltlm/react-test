/**
 * 功能：菜单栏数据封装
 * 作者：宋鑫鑫
 * 日期：2019.07.31
 */

import {
    createSelector,
    connect,
    hot,
    withRouter
} from 'framework/Util'
import actionCreator from '@/login/actions/actionCreator'
import App from '../../components/header'
import targetActionCreator from '@/target-table/actions/actionCreator'

const targetTableState = state => state.targetTable.targetTableList

const userInfo = state => state.login
const selector = createSelector([userInfo, targetTableState], (login, targetTable) => ({
    resources: login.get('resources').toJS(),
    count: targetTable.get('count'),
}))

export default withRouter(connect(selector, { ...actionCreator, ...targetActionCreator })(hot(module)(App)))
