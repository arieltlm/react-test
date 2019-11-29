/**
 * 功能：规则配置-所有动作配置
 * 作者：tanglimei
 * 日期： 2019-08-02
 */

import { createActions, createAction } from 'framework'
import config from 'conf'
import * as actionTypes from './actionTypes'

const { constant: { urlPrefix } } = config

const actionCreator = createActions({
    // 第一行第一个选中
    changeFisrtRuleSel: createAction(actionTypes.CHANGE_FIRST_RULE_SEL_RULE_CONFIG),
    // 第一行第二个选中
    changeSecondRuleSel: createAction(actionTypes.CHANGE_SECOND_RULE_SEL_RULE_CONFIG),
    setEditFlag: createAction(actionTypes.SET_EDIT_FLAG_RULE_CONFIG),
    // 获取弹框规则
    getRulesClasses: {
        url: `${urlPrefix}/rule_classifications`,
        actionType: actionTypes.SET_RULE_CLASSES_RULE_CONFIG
    },
    // 非编辑的时候重置
    resetAddRule: createAction(actionTypes.RESET_ADD_RULE_CONFIG),
})

export default actionCreator
