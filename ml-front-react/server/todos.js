/**
 * 功能：
 * 作者：安超
 * 日期：2019-05-27
 */
const Mock = require('mockjs')
const _ = require('lodash')

module.exports = {
    getTodos: {
        statusCode: 200,
        data: _.times(6, n => ({
            id: n,
            text: Mock.Random.cname(),
            completed: Mock.Random.boolean()
        })),
        message: '获取列表成功!'
    },
    addTodo: {
        statusCode: 200,
        message: '添加成功!'
    },
    removeTodo: {
        statusCode: 200,
        message: '删除成功!'
    },
    updateTodo: {
        statusCode: 200,
        message: '修改成功!'
    }
}
