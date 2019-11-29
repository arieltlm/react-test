/**
 * 功能: 图谱绘制工具
 * 作者: 张杰
 * 日期: 2019.08.21
 */

import cytoscape from 'cytoscape'
import navigator from 'cytoscape-navigator'
import panzoom from 'cytoscape-panzoom'

navigator(cytoscape)
panzoom(cytoscape)

class CytoscapeDraw {
    constructor(drawDOM, data, style, layout) {
        this.cy = cytoscape({
            container: drawDOM,
            elements: data,
            style,
            layout,
        })
    }

    addNavigator = (config) => {
        this.cy.navigator(config)
    }

    addPanzoom = (config) => {
        this.cy.panzoom(config)
    }

    addData = (data) => {
        this.cy.add(data)
    }

    addDataAndSetStyle = (data, style) => {
        this.cy.add(data).css(style)
    }

    elementsUnSelect = () => {
        this.cy.elements().unselect()
    }

    getZoom = () => this.cy.zoom()
    
    addCxtTapend = (callBack) => {
        this.cy.on('cxttapend', callBack)
    }

    addTap = (callBack) => {
        this.cy.on('tap', callBack)
    }

    addNodeMove = (callBack) => {
        this.cy.on('tapstart', 'node', () => {
            this.cy.off('tapend', 'node', callBack)
            this.cy.on('tapend', 'node', callBack)
        })
    }

    distoryEntity = () => {
        this.cy.removeAllListeners()
        this.cy.destroy()
        this.cy = null
    }
}

export default CytoscapeDraw
