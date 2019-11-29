/**
 * 功能：生成模拟数据
 * 作者：安超
 * 日期： 2018/1/31
 */

const login = require('./login')
const todos = require('./todos')
const logs = require('./logs')

module.exports = function () {
    return {
        ...login,
        ...todos,
        ...logs
    }
}
