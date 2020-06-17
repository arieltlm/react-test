/**
 * Created by anchao on 2015/12/7.
 */

import { applyMiddleware, combineReducers, createStore } from 'redux'
import Immutable from 'immutable'
import { routerReducer } from 'react-router-redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import dialog from '../dialog/reducers'
import loading from '../loading/reducers'
import reducers from '../../conf/reducers'
// const actionNames = actionName => actionName.toLowerCase().replace(/_([a-z]){1}/g, x => x.slice(1).toUpperCase())
// state日志
const logger = createLogger({
    stateTransformer: state => Immutable.fromJS(state).toJS(),
    collapsed: true, 
    diff: true, 
    // titleFormatter: (action, time, took) => `action ${actionNames(action.type)} @${time} in (${took.toFixed(2)} ms)`,
    colors: { 
        title: () => 'inherit',
        prevState: () => '#9E9E9E',
        action: () => 'red',
        nextState: () => '#4CAF50',
        error: () => '#F20404',
    },
    // predicate = (getState: Function, action: Object) => Boolean
})

const store = createStore(
    combineReducers({
        dialog,
        loading,
        ...reducers,
        routing: routerReducer
    }),
    composeWithDevTools(process.env.NODE_ENV === 'production'
    ? applyMiddleware(thunkMiddleware) 
    : applyMiddleware(thunkMiddleware, logger))
)

export default store
