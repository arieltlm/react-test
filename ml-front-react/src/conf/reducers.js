/**
 * 功能：reducer汇总
 * 作者：安超
 * 日期： 2018/5/11
 */

import login from '../login/reducers'
import originTable from '../origin-table/reducers'
import verification from '../verification/reducers'
import targetTable from '../target-table/reducers'
import ruleManage from '../rule-manage/reducers'
import ruleConfig from '../rule-config/reducers'
import knowledgeDir from '../knowledge-dirs/reducers'
import knowledgeDataElement from '../knowledge-dataelement/reducers'
import knowledgeDataQualifier from '../knowledge-dataqualifier/reducers'
import knowledgeCode from '../knowledge-code/reducers'
import mapping from '../mapping/reducers'
import graph from '../graph/reducers'
import standard from '../standard/reducers'
import taskScheduling from '../task-scheduling/reducers'

export default {
    login,
    originTable,
    verification,
    targetTable,
    ruleManage,
    ruleConfig,
    knowledgeDir,
    knowledgeDataElement,
    knowledgeDataQualifier,
    knowledgeCode,
    mapping,
    graph,
    standard,
    taskScheduling
}
