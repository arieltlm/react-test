import * as actionType from './actionType';
import { createActions } from 'redux-actions';

// 原action
// export const increment = (num) => ({
//   type: actionType.INCREMENT,
//   num
// });
// export const descement =() => ({
//   type: actionType.DESCEMENT
// });

// 使用redux-actions的createAction之后的action
// export const increment = createAction(actionType.INCREMENT, (num) => {return{num}});
// export const descement = createAction(actionType.DESCEMENT);

// 多个action时使用使用redux-actions的createActions之后的action
const action = createActions({
  [actionType.INCREMENT]: (num) => {return{num}},
  [actionType.DESCEMENT]: () => {}
}) 
export default action;

