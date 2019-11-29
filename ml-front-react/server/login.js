/**
 * 功能：
 * 作者：安超
 * 日期：2019-05-27
 */

module.exports = {
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
        message: '获得用户信息成功!',
        data: {
            username: 'alex',
            userType: '0'
        }
    }
}
