/**
 * 功能：广播容器
 * 作者：安超
 * 日期：2018/7/4
 */

import { connect, hot, createSelector } from 'framework/Util'
import actionCreator from '../actions/actionCreator'
import BroadcastView from '../components/main'

const loginState = state => state.login
const loginSelector = createSelector([loginState], login => ({
    timestamp: login.get('timestamp')
}))

export default connect(loginSelector, actionCreator)(hot(module)(BroadcastView))
