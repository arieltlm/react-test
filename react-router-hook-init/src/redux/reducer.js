import * as actionType from './actionType';
import { handleActions } from 'redux-actions';
// import {increment, descement} from './action';

const initState = {
  number: 0
};
// state中只有一个参数的简写法。
// const number = 0;
// const reducer = (state = number, action) => {
//   switch (action.type) {
//     case actionType.INCREMENT: return state + (+action.num);
//     case actionType.DESCEMENT: return state - 1;
//     default: return state;
//   }
// };


// 最初的reducer 
/* const reducer = (state = initState, action) => {
  switch (action.type) {
    case actionType.INCREMENT: return {...state, number: (state.number + (+action.num))};
    case actionType.DESCEMENT: return {...state, number: (state.number - 1)};
    default: return state;
  }
}; */


// 只有一个action时，使用redux-actions之后的handleAction后的reducer
/* 
const reducer = handleAction(
  increment, (state, action) => {
    return {...state, number: (state.number + (+action.payload.num))}
},initState) 
export default reducer;*/

// const descrementReducer = handleAction(
//   descement, (state, action) => {
//     return {...state, number: (state.number - 1)}
// },initState)
 

  
// 多个action时使用redux-actions之后的handleActions后的reducer
const reducer = handleActions({
  [actionType.INCREMENT]:(state, action) => {
    return {...state, number: (state.number + (+action.payload.num))}
  },
  [actionType.DESCEMENT]:(state, action) => {
    return {...state, number: (state.number - 1)}
  },
},initState)
export default reducer;

