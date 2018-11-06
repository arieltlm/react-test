const genParamInfo = (param, parentParam) => {
  return parentParam ? {param: parentParam, subParam: param} : {param};
};

const checkParam = (param, parentParam) => {
  const isSubParam = !!parentParam;
  const paramInfo = genParamInfo(param, parentParam);
  const required = param.validation.required;
  const validated = !required || param.defaultValue !== null || (param.touched && param.value !== null);
  if (validated) {
    if (param.triggerOptions && param.triggerOptions.enabled) {
      if (param.paramOptions) {
        return checkParams(param.paramOptions.subParams);
      } else {
        return {
          validated: false,
          errors: [{
            type: 'ParamOptions',
            message: {
              ...paramInfo,
            },
          }],
        };
      }
    } else {
      return {validated, errors: []};
    }
  } else {
    return {
      validated, errors: [{
        type: isSubParam ? 'SubParam' : 'Param',
        message: {
          ...paramInfo,
        },
      }],
    };
  }
};

const checkParams = (params, parentParam) => {
  return params.reduce((acc, val) => {
    const checkResult = checkParam(val, parentParam);
    return {
      validated: acc.validated && checkResult.validated,
      errors: acc.errors.concat(checkResult.errors),
    };
  }, {validated: true, errors: []});
};

const checkParamRequirements = (operator) => {
  return checkParams(operator.params);
};

const checkInputRequirements = (operator) => {
  return operator.inputs.reduce((acc, val) => {
    const input = val;
    if (input.parentNodeUid) {
      if (
        !input.fieldsOptions.enabled ||
        input.fieldsOptions.enabled &&
        input.fieldsOptions.fields.every((field) => field.filled)
      ) {
        return acc;
      }else{
        return {
          validated: false,
          errors: acc.errors.concat({
            type: 'InputField',
            message: {
              input,
            },
          }),
        };
      }
    } else {
      return {
        validated: false,
        errors: acc.errors.concat({
          type: 'Input',
          message: {
            input,
          },
        }),
      };
    }
  }, {validated: true, errors: []});
};

const checkRequirements = (operators) => {
  return operators.reduce((acc, val) => {
    const op = val;
    const checkInputResult = checkInputRequirements(op);
    const checkParamResult = checkParamRequirements(op);
    const validated = checkInputResult.validated && checkParamResult.validated;
    const errors = checkInputResult.errors.concat(checkParamResult.errors);
    if (validated) {
      return acc;
    } else {
      return {
        validated,
        messages: acc.messages.concat({
          operator: op,
          errors,
        }),
      };
    }
  }, {validated: true, messages: []});
};

export default checkRequirements;