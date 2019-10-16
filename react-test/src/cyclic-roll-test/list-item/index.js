import React from 'react'
import PropTypes from 'prop-types'

import './scss/index.scss'

import CyclicRoll from 'cyclic-roll'

function ListItem({
    itemData
}){
    const {id,name} = itemData
    return (
        <div className="list-item" key={id}>{name}</div>
    )
}

ListItem.propTypes = {
    itemData: PropTypes.object.isRequired
}

export default CyclicRoll(ListItem)