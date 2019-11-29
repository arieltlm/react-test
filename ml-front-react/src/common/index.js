/**
 * 功能： 业务工具类
 * 作者： 安超
 * 日期： 2018/7/11
 */
import { Immutable } from 'framework/Util'
import config from 'conf'
import Polayout from './Polayout'
import CytoscapeDraw from './CytoscapeDraw'

const { constant: { 
    graphAddContentType: { entity, event, relation },
    graphNodeType: { virtual }
} } = config
 
class Helper {
    static getHash() {
        return window.location.hash
    }
    
    static getPathname() {
        return window.location.pathname
    }
    
    static exeCb(fnCb) {
        if (fnCb && typeof fnCb === 'function') {
            fnCb()
        }
    }
    
    static getStrLen(str) {
        // 计算字符串长度(英文占1个字符，中文汉字占2个字符)
        let len = 0
        for (let i = 0; i < str.length; i++) {
            if (str.charCodeAt(i) > 127 || str.charCodeAt(i) === 94) {
                len += 2
            } else {
                len++
            }
        }
        
        return len
    }
    
    static getStrByLen(str, len) {
        if (this.getStrLen(str) < len) {
            return str
        }
        const aRes = []
        let l = 0
        for (let i = 0; i < str.length; i++) {
            if (str.charCodeAt(i) > 127 || str.charCodeAt(i) === 94) {
                l += 2
            } else {
                l++
            }
            
            if (l <= len) {
                aRes.push(str.charAt(i))
            }
        }
        
        return aRes.join('')
    }
    
    static convertDate2FormatStr(oDate, format) {
        const o = {
            'M+': oDate.getMonth() + 1, // month
            'd+': oDate.getDate(), // day
            'h+': oDate.getHours(), // hour
            'm+': oDate.getMinutes(), // minute
            's+': oDate.getSeconds(), // second
            'q+': Math.floor((oDate.getMonth() + 3) / 3), // quarter
            S: oDate.getMilliseconds() // millisecond
        }
        let formatCopy = format
        
        if (/(y+)/.test(formatCopy)) {
            formatCopy = formatCopy.replace(
                RegExp.$1,
                (`${oDate.getFullYear()}`).substr(4 - RegExp.$1.length)
            )
        }
        
        for (const k in o) {
            if (new RegExp(`(${k})`).test(formatCopy)) {
                formatCopy = formatCopy.replace(
                    RegExp.$1,
                    RegExp.$1.length === 1 ? o[k] : (`00${o[k]}`).substr((`${o[k]}`).length)
                )
            }
        }
        
        return formatCopy
    }
    
    static formatSdate(sDate) {
        // 默认sDate格式为：2015-10-09 20:45:35
        let date = sDate
        if (typeof date === 'string') {
            date = date.trim()
            
            if (date.length > 0) {
                return date.replace(/:\d{2}$/, '')
            }
        }
        
        return date
    }
    
    static makeActionCreator(type, ...argNames) {
        // 生成静态acionCreator
        return (...args) => {
            const action = { type }
            
            argNames.forEach((arg, index) => {
                action[arg] = args[index]
            })
            
            return action
        }
    }
    
    static createReducer(initialState, handlers) {
        // 生成reducer
        return (state = initialState, action) => {
            if (Object.prototype.hasOwnProperty.call(handlers, action.type)) {
                return handlers[action.type](state, action)
            }
            return state
        }
    }
    
    static decimal(e) {
        const nKeyCode = e.which
        const sValues = e.currentTarget.value
        
        if ((nKeyCode === 13) || (nKeyCode === 8) || (nKeyCode === 46)
            || (nKeyCode >= 37 && nKeyCode <= 40) || (nKeyCode >= 48 && nKeyCode <= 57)
            || (nKeyCode >= 96 && nKeyCode <= 105) || nKeyCode === 190 || nKeyCode === 110) {
            // 是否已包含小数点
            if (nKeyCode === 190 || nKeyCode === 110) {
                return sValues.includes('.')
            }
            
            return false
        }
        
        return false
    }
    
    static number(e) {
        // 数字，删除(8,46),方向（37-40）
        const nKeyCode = e.which
        if ((nKeyCode >= 48 && nKeyCode <= 57) || (nKeyCode >= 96 && nKeyCode <= 105)
            || (nKeyCode === 8) || (nKeyCode === 46) || (nKeyCode >= 37 && nKeyCode <= 40)) {
            return true
        } 
        return false
    }
    
    static mobileNumber(e) {
        const nKeyCode = e.which
        const target = e.currentTarget
        const sPhone = target.value
        if ((nKeyCode === 13) || (nKeyCode === 8) || (nKeyCode === 46)
            || (nKeyCode >= 37 && nKeyCode <= 40) || (nKeyCode >= 48 && nKeyCode <= 57)
            || (nKeyCode >= 96 && nKeyCode <= 105)) {
            return true
        }
        
        // 11位后数字不能输入数字,当未选中时禁止输入
        if (sPhone.length > 10 && (target.selectionStart === target.selectionEnd)
            && ((nKeyCode >= 48 && nKeyCode <= 57) || (nKeyCode >= 96 && nKeyCode <= 105))) {
            return false
        }
        
        return false
    }
    
    static validatePhone(sPhone) {
        const nLen = sPhone.length
        
        if (nLen !== 11 || (nLen === 11 && !/^(13[0-9]|14[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$/i.test(sPhone))) {
            return false
        } 
        return true
    }
    
    static validateEmail(email) {
        return new RegExp('^\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$').test(email)
    }

    static validateEnField(value){
        return new RegExp(/^[a-zA-Z]{1}[a-zA-Z0-9]{0,31}$/).test(value)
    }

    static validateCnField(value){
        return value.length <= 64
    }

    // 校验自定义规则输出
    static validateOutCusRule(value){
        return new RegExp(/^[a-zA-Z]{1}([a-zA-Z0-9]{0,15})$/).test(value)
    }

    // 校验自定义规则输入
    static validateInCusRule(value){
        return value.trim().length > 0 && value !== '未配置'
    }
    
    static onKeyDown(e) {
        const nKeyCode = e.which
        if ((nKeyCode === 13) || (nKeyCode === 8) || (nKeyCode === 46)
            || (nKeyCode >= 37 && nKeyCode <= 40) || (nKeyCode >= 48 && nKeyCode <= 57)
            || (nKeyCode >= 96 && nKeyCode <= 105)) {
            return true
        }
        
        return false
    }

    // 处理表格数据
    static setDataSource(data, headers) {
        if (data.size < 1) return []
        const dataSource = data.map((item) => {
            const dataItem = {}
            item.forEach((ele, index) => {
                const key = headers[index].en
                dataItem[key] = ele
            })
            return dataItem
        })
        return dataSource
    }

    /**
     * 格式化表格设置组件中的数据
     * @param {array} headers [necessary] 表格头部信息
     * @param {array} datas [necessary] 表格数据
     * @param {String} rowEditKey [option] 行级编辑权限字段名
     * @param {*} rowEditValue [option] 行级编辑权限字段
     */
    static fmtTableSetData(headers, datas, rowEditKey = '', rowEditValue = '') {
        const resData = []
        datas.forEach((item) => {
            let canRowEdit = true
            const tmpItem = { ...item }
            if (rowEditKey) {
                canRowEdit = (item[rowEditKey] && item[rowEditKey].labelInValue)
                    ? item[rowEditKey].value === rowEditValue 
                    : item[rowEditKey] === rowEditValue
            }
            const itemKeys = Object.keys(item)
            itemKeys.forEach((keyItem) => {
                const tmpHeaderItem = headers.find(headerItem => headerItem.en === keyItem)
                const itemVal = item[keyItem] === 0 ? 0 : item[keyItem] || ''
                if (tmpHeaderItem) {
                    if (tmpHeaderItem.alwayEdit || (tmpHeaderItem.tableConfIsEdit && canRowEdit)) {
                        tmpItem[keyItem] = { content: itemVal, tableConfIsEdit: true }
                    } else {
                        tmpItem[keyItem] = { content: itemVal, tableConfIsEdit: false }
                    }
                } else {
                    tmpItem[keyItem] = { content: itemVal, tableConfIsEdit: false }
                }
            })
            resData.push(tmpItem)
        })
    
        return resData
    }

    // 数据按key分组
    static setDatasByKey(data, key){
        if (data.size < 1) return Immutable.fromJS({})
        const datas = data.toList().groupBy(x => x.get(key))
        return datas
    }

    static getPolayout(option) {
        return Polayout.getLayout(option)
    }

    static initCalcData(inited, calc) {
        const classes = {
            '000': 'no-init-no-calc',
            '001': 'no-init-calc',
            '010': 'init-no-calc',
            '011': 'init-calc'
        }
        const key = `0${0 + inited}${0 + calc}`
    
        return classes[key]
    }

    static formatGraphElement(graphData) {
        const newGraph = []
        graphData.forEach((current) => {
            const { 
                elementType, 
                isInited, 
                isCalc, 
                frontendEntityType, 
                frontendEntityId, 
                labelCn,
                labelEn,
                subjectFrontend,
                objectFrontend,
                calc,
                inited,
                positionX,
                positionY,
                targetTableId,
            } = current
            let label = ''
            switch (elementType) {
            case event:
                label = '事件: '
                break
            case relation:
                label = '关系: '
                break
            default:
                break
            }
            const group = elementType === entity ? 'nodes' : 'edges'
            let addItem = true
            if (group === 'edges') {
                const trgNodeIndex = graphData.findIndex(item => item.frontendEntityId === objectFrontend.objectFrontendId)
                const srcNodeIndex = graphData.findIndex(item => item.frontendEntityId === subjectFrontend.subjectFrontendId)
                addItem = trgNodeIndex >= 0 && srcNodeIndex >= 0
            }
            if (addItem) {
                newGraph.push({
                    group,
                    classes: `multiline-manual ${elementType} ${Helper.initCalcData(isInited, isCalc)} ${frontendEntityType === virtual && 'self'}`,
                    data: {
                        labelEn,
                        labelCn,
                        inited,
                        calc,
                        originData: current,
                        id: frontendEntityId,
                        label: `${label}${labelCn}`,
                        source: subjectFrontend.subjectFrontendId,
                        target: objectFrontend.objectFrontendId,
                        targetTableId,
                    },
                    position: {
                        x: positionX,
                        y: positionY
                    }
                })
            }
        })
        return newGraph
    }

    static createCytoscape(drawDOM, data, style, layout) {
        return new CytoscapeDraw(drawDOM, data, style, layout)
    }
}

export default Helper
