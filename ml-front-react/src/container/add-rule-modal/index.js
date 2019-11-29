/**
 * 功能: 规则配置-增加规则
 * 作者： tanglimei
 * 日期：2019-08-07
 */

import { connect, hot, createSelector, Helper } from 'framework/Util'
import config from 'conf'
import AddRules from '@/components/add-rule-modal'
import actionCreator from '@/actions/actionCreator'

const { constant: { ruleBelongsDictionary } } = config

const { constant: { undeConfDef, customRuleIOput } } = config
const { inputCusBelong, outputCusBelong, outputValue, inputValue } = customRuleIOput

const getState = state => state.ruleConfig.ruleConfigAddRule

// 第一行第二个的选项
function SetRuleDefsOptions(datas, ruleFirstSelected) {
    const data = Helper.setDatasByKey(datas, 'ruleClassificationId').toJS()
    return data[ruleFirstSelected]
}

// 第一行第二个的选中值
function setSelSecond(ruleSecondOptions, ruleSecondSelected){
    let ruleSecondSelecteds = ''
    if (ruleSecondSelected){
        ruleSecondSelecteds = ruleSecondSelected
    } else {
        ruleSecondSelecteds = ruleSecondOptions[0].ruleDefId
    }
    return ruleSecondSelecteds
}

// 设置输入选项
function setInputOptions(ruleInputCandidates, ruleSecondSelected, ruleDefs, ruleFirstSelected){
    if (ruleInputCandidates.size < 1 || !ruleSecondSelected) return []
    // 第一行规则的第二个选项中找到当前选中的param
    const ruleDefsOptions = SetRuleDefsOptions(ruleDefs, ruleFirstSelected)
    const selectInputOptions = ruleDefsOptions.find(item => item.ruleDefId === ruleSecondSelected)
    const { param: secondSelOptionParam } = selectInputOptions
    // 遍历param对应的数据字典中分类 在输入选项内容中进行筛选取当前对应的
    const ruleInputOptions = []
    secondSelOptionParam.forEach((parmaItem) => {
        const thisInputBelongs = ruleBelongsDictionary[parmaItem] || ruleBelongsDictionary.default
        const thisInputOptions = {}
        thisInputBelongs.forEach((belongsItem) => {
            if (ruleInputCandidates[belongsItem]){ thisInputOptions[belongsItem] = ruleInputCandidates[belongsItem] }
        })
        ruleInputOptions.push(thisInputOptions)
    })
    return ruleInputOptions
}

// 设置输入输出默认值
function setInputOutputDef(ruleDefsOptions, ruleSecondSelected, editFlag, inputs, output, valid){
    let ioFirstSelectedDef = []
    let ioSecondValueDef = []
    if (!editFlag){
        const selectInputOptions = ruleDefsOptions.find(item => item.ruleDefId === ruleSecondSelected)
        const { param } = selectInputOptions
        ioFirstSelectedDef = Array(param.length + 1).fill({ key: undeConfDef.belong, label: undeConfDef.value })
        ioSecondValueDef = Array(param.length + 1).fill(undeConfDef.value)
        if (!valid){ // 如果验证未通过，输出值不可改变
            ioFirstSelectedDef[0] = { key: output.dependency, label: output.dependency === outputCusBelong ? outputValue : output.value }
            ioSecondValueDef[0] = output.value
        }
    } else {
        ioFirstSelectedDef[0] = { key: output.dependency, label: output.dependency === outputCusBelong ? outputValue : output.value }
        ioFirstSelectedDef.push(...inputs.map(item => ({ key: item.belong, label: item.belong === inputCusBelong ? inputValue : item.value })))
        ioSecondValueDef[0] = output.value
        ioSecondValueDef.push(...inputs.map(item => (item.value)))
    }
    
    return { ioFisrtSel: ioFirstSelectedDef, ioSecondSel: ioSecondValueDef }
}


const selector = createSelector([getState], (addRuleState) => {
    const ruleValue = addRuleState.get('ruleValue')

    const editFlag = addRuleState.get('editFlag')
    let order = 0
    let inputs = []
    let output = {}
    let tips = ''
    let valid = true
    let ruleEditConf
    if (ruleValue.size > 0){
        valid = ruleValue.get('valid')
        tips = ruleValue.get('tips')
        ruleEditConf = addRuleState.getIn(['ruleValue', 'ruleConf'])
        if (ruleEditConf.size > 0){
            order = ruleEditConf.get('order')
            inputs = ruleEditConf.get('inputs').toJS()
            output = ruleEditConf.get('output').toJS()
        }
    }
    const ruleOutputCandidates = Helper.setDatasByKey(addRuleState.get('ruleOutputCandidates'), 'dependency').toJS()
    const ruleClassifications = addRuleState.get('ruleClassifications').toJS()
    const ruleInputCandidates = Helper.setDatasByKey(addRuleState.get('ruleInputCandidates'), 'belong').toJS()
    const ruleFirstSelected = addRuleState.get('ruleFirstSelected') || ruleClassifications[0].ruleClassificationId
    const ruleSecondAllOptions = addRuleState.get('ruleDefs')
    const ruleSecondOptions = SetRuleDefsOptions(ruleSecondAllOptions, ruleFirstSelected)
    const ruleSecondSel = addRuleState.get('ruleSecondSelected')
    const ruleSecondSelected = setSelSecond(ruleSecondOptions, ruleSecondSel)
    const ruleInputOptions = setInputOptions(ruleInputCandidates, ruleSecondSelected, ruleSecondAllOptions, ruleFirstSelected)
    const ioValue = setInputOutputDef(ruleSecondOptions, ruleSecondSelected, editFlag, inputs, output, valid)

    return ({
        ruleOutputCandidates,
        ruleClassifications,
        ruleInputCandidates,
        ruleFirstSelected,
        ruleSecondSelected,
        ruleInputOptions,
        ruleSecondOptions,
        order,
        inputs,
        output,
        tips,
        valid,
        ruleValue,
        ruleEditConf: ruleEditConf && ruleEditConf.toJS(),
        ioFisrtSelDef: ioValue.ioFisrtSel,
        ioSecondSelDef: ioValue.ioSecondSel,
    }) 
})

export default connect(selector, actionCreator)(hot(module)(AddRules))
