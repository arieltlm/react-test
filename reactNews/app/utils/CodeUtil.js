export const generateOperatorCode = (operator, operators) => {
  const _paramJsonName = 'op_params';
  const _genOperatorRelatedName = (opUid, opName, ...otherArgs) => opName + '_' + otherArgs.join('_') + '_' + opUid;
  const _genOperatorOutputName = (opUid, opName, outputIndex) => _genOperatorRelatedName(opUid, opName, 'output', outputIndex);
  const _genOperatorFuncName = (opUid, opName) => _genOperatorRelatedName(opUid, opName, 'func');
  const _transformBoolean = (jsonString) => {
    return jsonString.replace(':true,', ':True,').replace(':true}', ':True}')
      .replace(':false,', ':False,').replace(':false}', ':False}');
  };
  const _genParamsJson = (params) => {
    const paramsJson = {};
    params.forEach((param) => {
      const {name, value, defaultValue, touched, paramOptions} = param;
      paramsJson[name] = touched ? value : defaultValue;
      if (paramOptions && paramOptions.subParams.length) {
        paramsJson[paramOptions.name] = _genParamsJson(paramOptions.subParams);
      }
    });
    return _transformBoolean(JSON.stringify(paramsJson));
  };
  const _genFieldInputsDefScript = (inputs) => inputs.reduce((acc, val) => {
    const inputFieldScript = val.fieldsOptions.enabled ? val.fieldsOptions.fields.map((field) => {
      if (field.dataType === 'array') {
        return field.name + '=' + val.name + '[' + '[' + field.value.map((f) => '\'' + f + '\'').join(',') + ']' + ']';
      } else {
        return field.name + '=' + val.name + '[' + '\'' + field.value + '\'' + ']';
      }
    }).join('\n') : '';
    return inputFieldScript ? acc.concat(inputFieldScript) : acc;
  }, []).join('\n');
  const _genParamInputsDefScript = (params) => params.map((param) => {
    const baseParamScript = param.name + '=' + _paramJsonName + '["' + param.name + '"]';
    if (param.paramOptions && param.paramOptions.subParams.length) {
      const subParamScript = param.paramOptions.name + '=' + _paramJsonName + '["' + param.paramOptions.name + '"]';
      return baseParamScript + '\n' + subParamScript;
    } else {
      return baseParamScript;
    }
  }).join('\n');
  const _genOperatorFuncDefHead = (opUid, opName, inputs) => {
    const inputsScript = inputs.map((input) => input.name).join(',');
    return _genOperatorFuncName(opUid, opName) +
      '(' + (inputsScript ? inputsScript + ',' : '') + _paramJsonName + ')';
  };
  const _genOperatorFuncExecHead = (opUid, opName, inputs, params) => {
    const inputsScript = inputs.map((input) => {
      const {parentNodeUid, outputIndex} = input;
      const parentNodeName = operators.find((op) => op.uid === parentNodeUid).name;
      return _genOperatorOutputName(parentNodeUid, parentNodeName, outputIndex);
    }).join(',');
    return _genOperatorFuncName(opUid, opName) +
      '(' + (inputsScript ? inputsScript + ',' : '') +
      _genParamsJson(params) + ')';
  };
  const dependencyScript = operator.execScript.dependency.join('\n');
  const operatorUid = operator.uid;
  const operatorName = operator.name;
  const funcDefScript = 'def ' + _genOperatorFuncDefHead(operatorUid, operatorName, operator.inputs, operator.params) + ':\n' +
    [].concat(
      _genFieldInputsDefScript(operator.inputs),
      _genParamInputsDefScript(operator.params),
      operator.execScript.script,
      'return ' + operator.outputs.map((output) => output.name).join(',')
    ).filter((s) => s !== '').join('\n').split('\n').map((s) => ('    ' + s)).join('\n');
  const outputs = operator.outputs.map((output) =>
    _genOperatorOutputName(operatorUid, operatorName, output.outputIndex));
  const funcScript = _genOperatorFuncExecHead(operatorUid, operatorName, operator.inputs, operator.params);
  const execScript = outputs.length ? outputs.join(',') + '=' + funcScript : funcScript;
  const mainExecCode = [dependencyScript, funcDefScript, execScript].join('\n');
  const reqSchemaCodesMap = operator.outputs.map((output) => {
    const {name, outputIndex} = output;
    return {name, code: 'print_schema' + '(' + _genOperatorOutputName(operatorUid, operatorName, outputIndex) + ')'};
  });
  return {mainExecCode, reqSchemaCodesMap};
};

export const generateOperatorCodeList = (operators) => {
  return getOrderedOperators(operators).map((op) => generateOperatorCode(op, operators).mainExecCode);
};

const getOrderedOperators = (operators) => {
  const getAllDependencies = (operator) => {
    const dependencies = operator.inputs.map((input) => {
      const parentOperator = operators.find((op) => op.uid === input.parentNodeUid);
      return getAllDependencies(parentOperator);
    });
    return flattenArray(dependencies).concat(operator);
  };
  const terminateOperators = operators.filter((op) => !hasDependants(op));
  const dagDependencies =
    flattenArray(terminateOperators.reduce((acc, val) => acc.concat(getAllDependencies(val)), []));
  return dagDependencies.unique();
};

const flattenArray = (arrays) => {
  return [].concat(arrays).reduce((acc, val) => acc.concat(val), []);
};

// const getDependants = (operator) => {
//   return operator.outputs.reduce((acc, val) => acc.concat(val.childUids), []);
// };

const hasDependants = (operator) => {
  return operator.outputs.some((output) => output.childUids.length);
};
