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
    // 数据源
    getDataSource: {
        url: `${urlPrefix}/data_source_info`,
        method: 'get',
        actionType: actionTypes.SET_DATASOURCE_LIST_ORIGIN_TABLE
    },
    setTableHeaders: createAction(actionTypes.SET_DATASOURCE_LIST_HEADERS_ORIGIN_TABLE),
    // 表头改变显示
    changeTableHeader: {
        url: `${urlPrefix}/table_conf`,
        method: 'put',
        hasLoading: false
    },
    modifyDataSource: {
        url: `${urlPrefix}/data_source_info/:dataSourceInfoId`,
        method: 'put',
        actionType: actionTypes.MODIFY_DATASOURCE_LIST_ORIGIN_TABLE
    },
    // 数据源-流
    checkExistStream: {
        url: `${urlPrefix}/stream/existStream`,
        method: 'get',
    },
    getStreamParam: {
        url: `${urlPrefix}/stream/getStreamParam`,
        method: 'get',
    },
    stopExistStream: {
        url: `${urlPrefix}/stream/stopStream`,
        method: 'get',
    },
    postStartStream: {
        url: `${urlPrefix}/stream`,
        method: 'post',
    },
    recoverFromCheckpoint: {
        url: `${urlPrefix}/stream/recoverFromCheckpoint/:status`,
        method: 'get',
    },
    // 数据源-上传模版
    uploadFile: {
        url: `${urlPrefix}/upload/`,
        method: 'post',
        hasLoading: true,
        actionType: actionTypes.MODIFY_DATASOURCE_LIST_ORIGIN_TABLE
    },
    // 数据源-验证
    verifyData: {
        url: `${urlPrefix}/verifyConfs/verify`,
        method: 'get',
    },

    // 原始表列表
    getOriginTableList: {
        url: `${urlPrefix}/origin_tables/dataSourceInfo`,
        method: 'get',
        actionType: actionTypes.SET_ORIGINNAL_LIST_ORIGIN_TABLE
    },
    setOriginTableListHeaders: createAction(actionTypes.SET_ORIGIN_LIST_HEADERS_ORIGIN_TABLE),
    
    modifyOriginTableList: {
        url: `${urlPrefix}/origin_tables/:originTableId`,
        method: 'put',
        actionType: actionTypes.MODIFY_ORIGIN_LIST_ORIGIN_TABLE
    },
    // 原始表-flume
    checkExistFlume: {
        url: `${urlPrefix}/stream/oracle2kafka/existFlume`,
        method: 'get',
    },
    getFlumeParam: {
        url: `${urlPrefix}/stream/oracle2kafka/getFlumeParam`,
        method: 'get',
    },
    startFlume: {
        url: `${urlPrefix}/stream/oracle2kafka/createFlumeConf/:dataSourceInfoId`,
        method: 'get',
    },
    stopFlume: {
        url: `${urlPrefix}/stream/oracle2kafka/stopFlume`,
        method: 'get',
    },
    postInsertFlume: {
        url: `${urlPrefix}//stream/oracle2kafka/insertFlumeParam`,
        method: 'post',
    },
    // 原始表字段
    getOriginTableField: {
        url: `${urlPrefix}/origin_attrs`,
        method: 'get',
        actionType: actionTypes.SET_ORIGINNAL_FIELD_ORIGIN_TABLE
    },
    setOriginTableFieldHeaders: createAction(actionTypes.SET_ORIGIN_FIELD_HEADERS_ORIGIN_TABLE),
    modifyOriginTableField: {
        url: `${urlPrefix}/origin_attrs`,
        method: 'put',
        actionType: actionTypes.MODIFY_ORIGIN_FIELD_ORIGIN_TABLE
    },
    // 原始表字段-增加字段
    addOriginTableField: {
        url: `${urlPrefix}/origin_attrs`,
        method: 'post',
        actionType: actionTypes.MODIFY_ORIGIN_FIELD_ORIGIN_TABLE
    },
    // 原始表字段-删除字段
    deleteOriginTableField: {
        url: `${urlPrefix}/origin_attrs/:originAttrId`,
        method: 'delete',
        actionType: actionTypes.MODIFY_ORIGIN_FIELD_ORIGIN_TABLE
    },
})

export default actionCreator
