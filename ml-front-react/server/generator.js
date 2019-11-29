/**
 * 功能：生成模拟数据
 * 作者：安超
 * 日期： 2018/1/31
 */

const Mock = require('mockjs')
const _ = require('lodash')

module.exports = function () {
    return {
        login: {
            statusCode: 200,
            message: '登录成功!'
        },
        logout: {
            statusCode: 200,
            message: '注销成功!'
        },
        getUserInfo: {
            statusCode: 200,
            message: '缺少license文件，请联系管理员!',
            data: {
                username: 'alex',
                userType: '0'
            }
        },
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
        },
        getRuleData: {
            statusCode: 200,
            message: '修改成功!',
            data: [{
                description: '检查所有数据源的命名是否存在重复',
                id: 1,
                rootType: 'EMPTY',
                rootType2: 'EMPTY',
                ruleDefId: 1,
                ruleNameCn: '全部数据源检查',
                ruleNameEn: 'DataSourceCheck1',
                scopeType: 'DATA_SOURCE',
                scopeType2: 'EMPTY',
            }]
        },
        ztreeData: {
            statusCode: 200,
            message: '修改成功!',
            data: [
                {
                    title: '0-0-0',
                    key: '0-0',
                    children: [
                        {
                            title: '0-0-0',
                            key: '0-0-0',
                            children: [
                                { title: '0-0-0-0', key: '0-0-0-0', isLeaf: true },
                                { title: '0-0-0-1', key: '0-0-0-1', isLeaf: true },
                                { title: '0-0-0-2', key: '0-0-0-2', isLeaf: true },
                            ],
                        },
                        {
                            title: '0-0-1',
                            key: '0-0-1',
                            children: [
                                { title: '0-0-1-0', key: '0-0-1-0' },
                                { title: '0-0-1-1', key: '0-0-1-1' },
                                { title: '0-0-1-2', key: '0-0-1-2' },
                            ],
                        },
                        {
                            title: '0-0-2',
                            key: '0-0-2',
                        },
                    ],
                }
                // {
                //     title: '0-1',
                //     key: '0-1',
                //     children: [
                //         { title: '0-1-0-0', key: '0-1-0-0' },
                //         { title: '0-1-0-1', key: '0-1-0-1' },
                //         { title: '0-1-0-2', key: '0-1-0-2' },
                //     ],
                // },
                // {
                //     title: '0-2',
                //     key: '0-2',
                // },
            ]
        }
    }
}
