export const urlPrefix = '/cona-web/api/v1'

export const particles = {
    particles: {
        number: {
            value: 50,
            density: {
                enable: true,
                value_area: 800,
            },
        },
        color: {
            value: '#b8d2f6',
        },
        shape: {
            type: 'circle',
            stroke: {
                width: 0,
                color: '#000000',
            },
            polygon: {
                nb_sides: 5,
            },
            image: {
                src: 'img/github.svg',
                width: 100,
                height: 100,
            },
        },
        opacity: {
            value: 1,
            random: false,
            anim: {
                enable: false,
                speed: 1,
                opacity_min: 1,
                sync: false,
            },
        },
        size: {
            value: 8,
            random: true,
            anim: {
                enable: false,
                speed: 40,
                size_min: 0.1,
                sync: false,
            },
        },
        line_linked: {
            enable: true,
            distance: 250,
            color: '#b8d2f6',
            opacity: 1,
            width: 2,
        },
        move: {
            enable: true,
            speed: 1,
            direction: 'none',
            random: false,
            straight: false,
            out_mode: 'out',
            attract: {
                enable: false,
                rotateX: 600,
                rotateY: 1200,
            },
        },
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
            onhover: {
                enable: false,
                mode: 'repulse',
            },
            onclick: {
                enable: false,
                mode: 'push',
            },
            resize: true,
        },
        modes: {
            grab: {
                distance: 400,
                line_linked: {
                    opacity: 1,
                },
            },
            bubble: {
                distance: 200,
                size: 40,
                duration: 2,
                opacity: 8,
                speed: 3,
            },
            repulse: {
                distance: 200,
            },
            push: {
                particles_nb: 4,
            },
            remove: {
                particles_nb: 2,
            },
        },
    },
    retina_detect: true,
    config_demo: {
        hide_card: false,
        background_color: '#b61924',
        background_image: '',
        background_position: '50% 50%',
        background_repeat: 'no-repeat',
        background_size: 'cover',
    },
}

export const addFieldformItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 19 },
    },
}

export const streamformItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 17 },
    },
}

// 目标表页面配置
export const targetTabelTypeSetting = [
    { 
        targetType: 1, 
        name: '实体', 
        en: 'entity', 
        desc: '描述数据的基本单元，示例: 人、户、车、电话号码、案件、旅馆等' 
    },
    { 
        targetType: 2, 
        name: '事件', 
        en: 'event', 
        desc: '描述实体发生的各类事件，示例: 住宿、火车出行、航班、卡口、打电话等' 
    },
    { targetType: 3,
        name: '关系', 
        en: 'relation',
        desc: '描述实体间的关系，SCOPA中的关系可以为父子、人户、人车所有、人案参与等' 
    },
]

// 验证参数
export const verifyDataParams = {
    originTableVerify: {
        dataSourceVerify: {
            pageId: 2,
            scenarioId: 1,
            referenceId: -1
        },
        originListVerify: {
            pageId: 2,
            scenarioId: 2,
            referenceId: -1
        },
        originFieldVerify: {
            pageId: 2,
            scenarioId: 3,
            referenceId: -1
        }
    },
    targetTable: {
        allLayer: {
            pageId: 3,
            scenarioId: 1,
            referenceId: -1
        },
        scopaLayer: {
            pageId: 3,
            scenarioId: 2,
            referenceId: -1
        },
        listLayer: {
            pageId: 3,
            scenarioId: 3,
            referenceId: -1
        }
    },
    ruleConfigVerify: {
        originTableVerify: {
            pageId: 5,
            scenarioId: 1,
            referenceId: -1
        },
        targetTableVerify: {
            pageId: 5,
            scenarioId: 2,
            referenceId: -1
        },
        mappingTableVerify: {
            pageId: 5,
            scenarioId: 3,
            referenceId: -1
        }
    },
    standardPage: {
        pageId: 9,
        scenarioId: 1,
        referenceId: -1
    }
}

// 规则配置
export const ruleConfigTableType = {
    originTableType: 'BIND_F',
    targetTableType: 'BIND_T',
    mappingTableType: 'BIND_M',
    mappingOriginType: 'BIND_M_F',
    mappingTargetType: 'BIND_M_T',
    mappingMappingType: 'BIND_M_M',
}
// 规则联动框
export const ruleBelongsDictionary = {
    ATTR: ['BELONG_UNDEFINED', 'BELONG_OUTPUT_ATTR', 'BELONG_ATTR'],
    DICTIONARY: ['BELONG_UNDEFINED', 'BELONG_DICTIONARY'],
    CODE: ['BELONG_UNDEFINED', 'BELONG_CODE'],
    default: ['BELONG_UNDEFINED', 'BELONG_CONST'] // STRING等其他
}
export const undeConfDef = {
    value: '未配置',
    belong: 'UNDEFINED',
    inputBelong: 'BELONG_UNDEFINED',
    outputBelong: 'DEPENDENCY_UNDEFINED'
}

export const customRuleIOput = {
    outputValue: '自定义输出',
    inputValue: '自定义常量',
    value: '自定义',
    belong: 'CUSTOM',
    inputCusBelong: 'BELONG_CONST',
    outputCusBelong: 'DEPENDENCY_CUSTOM',
    outputWarningInfo: '自定义输出不能为空，只能以英文字母开始，包含英文字母和数字，长度小于等于16！',
    inputWarningInfo: '自定义输出不能为空，自定义常量不能是未配置！'
}
export const addRuleFisrtLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 19 },
    },
}

export const addRuleSecondLayout = {
    wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 24, offset: 0 },
    }
}
export const footerBtnLayout = {
    wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 16, offset: 8 },
    }
}

export const tableSetFirstColType = {
    showGoto: 'goto',
    showGotoAndSelect: 'gotoAndSelect'
}

export const sampleOptions = [
    { value: '1', name: '样例数据1' },
    { value: '2', name: '样例数据2' },
    { value: '3', name: '样例数据3' },
    { value: '4', name: '样例数据4' },
    { value: '5', name: '样例数据5' },
]

export const errorText = '请选择一行！'

// 图析数据开始******************************************************/
export const state = {
    oldEle: null,
    editState: 'add',
    addNode: false,
    isSelf: false,
    addEdge: false,
    selectedCount: 0,
    selected: {},
    currEle: null,
    theType: '',
    ePos: {
        x: 0,
        y: 0
    },
    allData: {},
    calcEle: {}
}

export const zoomDefaults = {
    zoomFactor: 0.05, // zoom factor per zoom tick
    zoomDelay: 45, // how many ms between zoom ticks
    minZoom: 0.1, // min zoom level
    maxZoom: 10, // max zoom level
    fitPadding: 50, // padding when fitting
    panSpeed: 10, // how many ms in between pan ticks
    panDistance: 10, // max pan distance per tick
    // the length of the pan drag box in which the vector for panning is calculated (bigger = finer control of pan speed and direction)
    panDragAreaSize: 75, 
    panMinPercentSpeed: 0.25, // the slowest speed we can pan by (as a percent of panSpeed)
    panInactiveArea: 8, // radius of inactive area in pan drag box
    panIndicatorMinOpacity: 0.5, // min opacity of pan indicator (the draggable nib); scales from this to 1.0
    zoomOnly: false, // a minimal version of the ui only with zooming (useful on systems with bad mousewheel resolution)
    fitSelector: undefined, // selector of elements to fit
    animateOnFit() { // whether to animate on fit
        return false
    },
    fitAnimationDuration: 1000, // duration of animation on fit
    // icon class names
    sliderHandleIcon: 'fa fa-minus',
    zoomInIcon: 'fa fa-plus',
    zoomOutIcon: 'fa fa-minus',
    resetIcon: 'fa fa-expand'
}

export const graphStyle = [
    {
        selector: 'node',
        style: {
            'background-image': 'url("./static/images/entity.png")',
            content: 'data(label)',
            width: '64px',
            height: '64px'
        }
    },
    {
        selector: 'edge',
        style: {
            content: 'data(label)',
            'curve-style': 'bezier',
            'edge-text-rotation': 'autorotate'
        }
    },
    {
        selector: '.no-init-no-calc',
        style: {
            'background-color': '#b3b311',
            'line-color': '#b3b311',
            color: '#b3b311',
            'text-background-color': '#edf2f5',
            'text-background-opacity': '1',
            'text-background-shape': 'roundrectangle',
            'target-arrow-color': '#b3b311'
        }
    },
    {
        selector: '.no-init-calc',
        style: {
            'background-color': '#337ab7',
            'line-color': '#337ab7',
            color: '#337ab7',
            'text-background-color': '#edf2f5',
            'text-background-opacity': '1',
            'text-background-shape': 'roundrectangle',
            'target-arrow-color': '#337ab7'
        }
    },
    {
        selector: '.init-no-calc',
        style: {
            'background-color': '#65bd35',
            'line-color': '#65bd35',
            color: '#65bd35',
            'text-background-color': '#edf2f5',
            'text-background-opacity': '1',
            'text-background-shape': 'roundrectangle',
            'target-arrow-color': '#65bd35'
        }
    },
    {
        selector: '.init-calc',
        style: {
            'background-color': '#d20064',
            'line-color': '#d20064',
            color: '#d20064',
            'text-background-color': '#edf2f5',
            'text-background-opacity': '1',
            'text-background-shape': 'roundrectangle',
            'target-arrow-color': '#d20064'
        }
    },
    {
        selector: '.self',
        style: {
            'border-width': '5',
            'border-color': '#333',
            'border-style': 'dashed'
        }
    },
    {
        selector: ':selected',
        style: {
            'border-width': '5',
            'border-style': 'solid',
            'border-color': '#ef9520',
            'line-color': '#ef9520',
            color: '#ef9520',
            'target-arrow-color': '#ef9520'
        }
    },
    {
        selector: '.currelement',
        style: {
            'border-width': '5',
            'border-style': 'solid',
            'border-color': '#ef9520',
            'line-color': '#ef9520',
            color: '#ef9520',
            'target-arrow-color': '#ef9520'
        }
    },
    {
        selector: '.event',
        style: {
            'target-arrow-shape': 'triangle'
        }
    },
    {
        selector: '.relation',
        style: {
            'target-arrow-shape': 'diamond'
        }
    },
    {
        selector: '.multiline-manual',
        style: {
            'text-wrap': 'wrap'
        }
    }
]
// 图析数据结束******************************************************/

export const graphType = {
    knowledge: 'knowledge',
    standard: 'standard',
}

export const graphAddContentType = {
    noSelect: '',
    entity: 'entity',
    event: 'event',
    relation: 'relation',
}

export const graphTargetTypeValue = {
    entity: 1,
    event: 2,
    relation: 3,
}

export const graphNodeType = {
    reality: 'reality',
    virtual: 'virtual',
}
export const finishedFilter = [
    {
        id: '0',
        label: '全部'
    },
    {
        id: '1',
        label: '已对标完成'
    },
    {
        id: '2',
        label: '未对标完成'
    }
]

export const graphTableMapTableTypes = {
    origin: 'origin',
    target: 'target',
    resource: 'resource'
}

export const graphNodeOpertionTypes = {
    add: 'add',
    update: 'update'
}

export const graphEmptyNode = {
    group: 'nodes',
    classes: 'multiline-manual ren no-init-no-calc',
}

export const graphEmptyEdge = {
    group: 'edges',
    classes: 'multiline-manual no-init-no-calc',
}

export const graphEmptyEdgeStyle = {
    'target-arrow-color': '#35b0c6',
    'curve-style': 'bezier'
}

export const newGraphEntityDefault = {
    elementType: graphAddContentType.entity,
    labelCn: '',
    labelEn: '',
    isCalc: false,
    isInited: false,
}

export const paramsConfigSetType = {
    manual: 0,
    auto: 1
}

export const paramsConfigExecType = {
    hard: 1,
    work: 0,
}

export const paramsConfigFailPolicyType = {
    start: 1,
    stop: 0,
}

export const paramsConfigBaseInfoKey = {
    tuningMode: 'tuning_mode',
    execMode: 'exec_mode',
    failPolicy: 'fail_policy'
}

export const paramsConfigManaulMode = {
    work: 'work',
    hard: 'hard',
}

export const paramsConfigManaulType = {
    pre: 'pre_process',
    orcl2hive: 'orcl2hive',
    hive2hdfs: 'hive2hdfs',
    hive2hdfsA: 'hive2hdfsA',
    merge: 'merge',
}

export const paramsConfigAutoType = {
    cores: 'executor_cores',
    memory: 'executor_memory',
    minimum: 'min_executor',
    reservetimes: 'reserve_times'
}

/**
 * type: 点击按钮传的类型
 * itemOne，itemTwo，itemThree弹框右键的菜单
 * param: 接口调用的参数
 * name: 弹框title
 * */
export const optionInfor = [
    {
        type: 'add',
        itemOne: '需要添加',
        itemTwo: '不需要添加',
        itemThree: '额外添加',
        param: 'submit',
        name: '任务添加'
    },
    {
        type: 'delete',
        itemOne: '需要删除',
        itemTwo: '不需要删除',
        itemThree: '额外删除',
        param: 'remove',
        name: '任务删除'
    },
    {
        type: 'reRun',
        itemOne: '需要重跑',
        itemTwo: '不需要重跑',
        itemThree: '额外重跑',
        param: 'rerun',
        name: '任务重跑'
    },
]
