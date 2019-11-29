/**
 * 功能：所有状态
 * 作者：安超
 * 日期：2018/7/4
 */
import { handleActions } from 'framework'
import { Immutable } from 'framework/Util'
import * as actionTypes from '../actions/actionTypes'


const inintialState = Immutable.fromJS({
    username: '',
    resources: [],
})

const loginReducer = handleActions({
    [actionTypes.SET_USER_INFO_LOGIN]: {
        success: (state, action) => {
            const { username, resources } = action.payload
            return state.set('username', username)
                .set('resources', Immutable.fromJS(resources))
        }
    },
    [actionTypes.SET_HEADER_INFO_LOGIN](state, action) {
        return state.set('resources', Immutable.fromJS(action.payload.resources))
    }
}, inintialState)


export default loginReducer
