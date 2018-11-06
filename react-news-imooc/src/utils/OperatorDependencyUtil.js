import {FINISHED} from './consts/operatorStatusConsts';

export const checkOperatorDependency = (operator, operators) => {
  return operator.inputs.map((input) => operators.find((op) => op.uid === input.parentNodeUid))
    .reduce((acc, op) => acc && op.status === FINISHED, true);
};
