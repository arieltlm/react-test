const url = {
    root: '/',
    login: {
        path: '/login'
    },
    app: {
        root: {
            path: '/app'
        },
        graph: {
            label: '知识图谱',
            path: '/app/graph'
        },
        originalDataSource: {
            label: '数据源',
            path: '/app/origintable'
        },
        originalTableList: {
            label: '原始表',
            path: '/app/origintable/:dataSourceInfoId'
        },
        originalTableField: {
            label: '原始表字段',
            path: '/app/origintable/:dataSourceInfoId/:originTableId'
        },
        targetTable: {
            label: '总目标层',
            path: '/app/targettable'
        },
        targetTableScopa: {
            label: 'scopa元素层',
            path: '/app/targettable/:targetType'
        },
        targetTableList: {
            label: '目标表',
            path: '/app/targettable/:targetType/:targetTableId'
        },
        verify: {
            label: '验证',
            path: '/app/verify'
        },
        ruleManage: {
            label: '规则管理',
            path: '/app/rulemanage'
        },
        ruleConfig: {
            label: '规则配置',
            path: '/app/ruleconfig'
        },
        ruleConfigOriginTable: {
            label: '原始表通用规则配置',
            name: '原始表',
            path: '/app/ruleconfig/origintable/:originTableId',
            start: '/app/ruleconfig/origintable'
        },
        ruleConfigTargetTable: {
            label: '目标表通用规则配置',
            name: '目标表',
            path: '/app/ruleconfig/targettable/:targetTableId',
            start: '/app/ruleconfig/targettable'
        },
        ruleConfigMapping: {
            label: '映射级规则配置',
            name: '表级映射',
            path: '/app/ruleconfig/mapping/:mappingTargetTableId/:mappingOriginTableId/:mappingMappingId',
            start: '/app/ruleconfig/mapping'
        },
        ruleLook: {
            label: '规则所见即所得',
            path: '/app/ruleconfig/rulelook'
        },
        knowledge: {
            label: '知识库管理',
            path: '/app/knowledge',
        },
        knowledgeDirs: {
            label: '数据资源目录一级',
            path: '/app/knowledge/dirs',
            cn: '数据资源目录',
            en: 'knowledge/dirs',
            icon: false
        },
        knowledgeDirsSub: {
            label: '数据资源目录二级',
            path: '/app/knowledge/dirs/info/:dirId',
            cn: '数据资源目录',
            en: 'knowledge/dirs',
            icon: false
        },
        knowledgeDirsStandard: {
            label: '标准表',
            path: '/app/knowledge/dirs/info/:dirId/:dirSecondId',
            cn: '数据资源目录',
            en: 'knowledge/dirs',
            icon: false
        },
        knowledgeDirsItem: {
            label: '数据项',
            path: '/app/knowledge/dirs/info/:dirId/:dirSecondId/:tableId',
            cn: '数据资源目录',
            en: 'knowledge/dirs',
            icon: false
        },
        knowledgeDirsSetupRule: {
            label: '规则配置',
            path: '/app/knowledge/dirs/rulelook/:dirId/:dirSecondId/:tableId',
            cn: '规则配置',
            en: 'knowledge/dirs',
            icon: false
        },
        knowledgeDataElement: {
            label: '数据元',
            path: '/app/knowledge/dataelement',
            cn: '数据元',
            en: 'knowledge/dataelement',
            icon: false
        },
        knowledgeDataQualifier: {
            label: '数据元限定词',
            path: '/app/knowledge/dataqualifier',
            cn: '数据元限定词',
            en: 'knowledge/dataqualifier',
            icon: false
        },
        knowledgeCode: {
            label: '代码表',
            path: '/app/knowledge/code',
            cn: '代码表',
            en: 'knowledge/code',
            icon: false
        },
        mapping: {
            label: '映射关系',
            path: '/app/mapping',
        },
        attributeMapping: {
            label: '属性映射',
            path: '/app/mapping/:id',
        },
        attributeExitMapping: {
            label: '已建立属性映射',
            path: '/app/mapping/attributes/:id',
        },
        tableMapping: {
            label: '表映射',
            path: '/app/mapping/table',
        },
        // standard: {
        //     label: '标准化工具',
        //     path: '/app/standard',
        // },
        standardPage: {
            label: '标准化工具-对标',
            path: '/app/standard/page/:dataSourceId/:originTableId',
        },
        standardRuleLook: {
            label: '标准化工具-规则所见即所得',
            path: '/app/standard/rulelook',
        },
        taskScheduling: {
            label: '计算引擎',
            path: '/app/taskscheduling',
        },
        taskSchedulingParamsConfig: {
            label: '参数配置',
            path: '/app/taskscheduling/paramsconfig',
        },
        taskSchedulingOriginalEntry: {
            label: '原始表入口',
            path: '/app/taskscheduling/originalentry',
        },
        taskSchedulingTargeteEntry: {
            label: '目标表入口',
            path: '/app/taskscheduling/targetentry',
        }
    }
}

export default url
