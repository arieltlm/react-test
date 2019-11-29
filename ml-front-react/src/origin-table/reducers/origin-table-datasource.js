/**
 * 功能：原始表-数据源
 * 作者：tlm
 * 日期：2018/7/24
 */
import { handleActions } from 'framework'
import { Immutable } from 'framework/Util'
import * as actionTypes from '../actions/actionTypes'


const inintialState = Immutable.fromJS({
    datasource: [],
    headers: [],
    highlightIndex: []
})

const reducer = handleActions({
    [actionTypes.SET_DATASOURCE_LIST_ORIGIN_TABLE]: {
        success: (state, action) => {
            const { dataInners, headers, highlightIndex } = action.payload
            return state.set('datasource', Immutable.fromJS(dataInners))
                .set('headers', Immutable.fromJS(headers))
                .set('highlightIndex', Immutable.fromJS(highlightIndex))
        }
    },
    [actionTypes.MODIFY_DATASOURCE_LIST_ORIGIN_TABLE]: {
        success: (state, action) => {
            const { dataInners } = action.payload
            return state.set('datasource', Immutable.fromJS(dataInners))
        }
    },
    [actionTypes.SET_DATASOURCE_LIST_HEADERS_ORIGIN_TABLE]: (state, action) => state.set('headers', Immutable.fromJS(action.payload))
}, inintialState)

export default reducer
