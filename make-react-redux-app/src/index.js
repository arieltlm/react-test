import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Header from './Header'
import Content from './Content'
import { Provider } from './react-redux'
import './index.css'

function createStore (reducer) {
    let state = null;
    const listeners = [];
    const subscribe = (listener) => listeners.push(listener);
    const getState = () => state;
    const dispatch = (action) => {
        state = reducer(state, action);
        listeners.forEach((listener) => listener())
    }
    dispatch({});
    return { getState, dispatch, subscribe };
}

const themeReducer = (state, action) => {
    if(!state) return{
        themeColor: 'red'
    }
    switch (action.type) {
        case 'CHANGE_COLOR':
            return {...state,themeColor: action.themeColor}
        default:
            return state;
    }
}
const store = createStore(themeReducer)

class Index extends Component {
    render () {
        return (
        <Provider store={store}>
            <Header />
            <Content />
        </Provider>
        )
    }
}

ReactDOM.render(
  <Index />,
  document.getElementById('root')
)