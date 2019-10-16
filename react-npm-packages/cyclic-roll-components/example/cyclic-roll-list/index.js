import React from 'react'
import PropTypes from 'prop-types'

import CyclicRoll from '../../src/index.js'

import './scss/index.scss'

function ListItem({
    itemData
}){
    const {id,name} = itemData
    return (
        <div className="list-item" key={id}>
            <span>{id}、</span>
            <span>{name}</span>
        </div>
    )
}

ListItem.propTypes = {
    itemData: PropTypes.object.isRequired
}

export default CyclicRoll(ListItem)