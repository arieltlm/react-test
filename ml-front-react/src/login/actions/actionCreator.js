/**
 * 功能：所有动作配置
 * 作者：安超
 * 日期： 2018/3/19
 */

import { createActions, createAction } from 'framework'
import config from 'conf'
import * as actionTypes from './actionTypes'

const { constant: { urlPrefix } } = config

const actionCreator = createActions({
    login: {
        url: `${urlPrefix}/login`,
        method: 'post'
    },
    logout: {
        url: `${urlPrefix}/logout`,
        method: 'GET',
    },
    getUserInfo: {
        url: `${urlPrefix}/login/getUserInfo`,
        // url: '/api/getUserInfo',
        method: 'GET',      
        actionType: actionTypes.SET_USER_INFO_LOGIN
    },
    getWarningInfo: {
        url: `${urlPrefix}/verifyConfs/consistency`,
        hasLoading: false
    },
    changeHeaderInfo: createAction(actionTypes.SET_HEADER_INFO_LOGIN)
})

export default actionCreator
