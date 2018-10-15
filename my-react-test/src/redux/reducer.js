
import {
  INCREMENT,
  DESCEMENT
} from './action';


// const initState = {
//   number: 0
// };

// const reducer = (state = initState, action) => {
//   switch (action.type) {
//     case INCREMENT: return {...state, number: (state.number + 1)};
//     case DESCEMENT: return {...state, number: (state.number - 1)};
//     default: return state;
//   }
// };
const number = 0;
const reducer = (state = number, action) => {
  switch (action.type) {
    case INCREMENT: return state + 1;
    case DESCEMENT: return state - 1;
    default: return state;
  }
};
export default reducer;