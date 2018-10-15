import {generateUuid} from './GeneralUtil';
import {calcCanvasPosition} from './CanvasUtil';

export const genParamGroupName = (paramName) => {
  return paramName + '_trigger_options';
};

export const getDynamicInputNamesFromOperator = (operator) => {
  return operator.inputs.filter((input) =>
    input.inputType === 'DynamicInput' &&
    input.inputDataType === 'DataFrame').map((input) => input.name);
};

export const getTriggerParamNamesFromOperator = (operator) => {
  return operator.params.reduce((acc, val) => {
    const param = val;
    const paramGroupName = genParamGroupName(param.name);
    acc[paramGroupName] = param.paramOptions ? param.paramOptions.subParams.map((subParam) => subParam.name) : [];
    return acc;
  }, {});
};

export const genCanvasOperator = (operator, e) => ({
  ...operator,
  uid: generateUuid('op'),
  operatorId: operator.id,
  active: false,
  status: 'ready',
  ui: calcCanvasPosition(e),
  inputs: operator.inputDefinition.staticInput.map((input, index) => {
    return {...input, vacant: true, available: false, inputIndex: index};
  }).concat(
    operator.inputDefinition.modelInput.enabled ?
      {
        name: 'model',
        displayName: 'modelCn',
        inputType: 'StaticInput',
        inputDataType: 'Model',
        fieldsOptions: {
          enabled: false,
        },
        vacant: true,
        available: false,
        inputIndex: operator.inputDefinition.staticInput.length,
      } : [],
  ),
  outputs: operator.outputDefinition.map((output, index) => {
    return {...output, childUids: [], outputIndex: index};
  }),
  paramsTouched: false,
  params: operator.paramDefinition.map((param) => {
    const canvasParam = {...param, uid: generateUuid('pm'), touched: false};
    const {enabled} = param.triggerOptions;
    if (enabled) {
      const triggers = param.triggerOptions.triggers.map((trigger) => {
        const subParams = trigger.subParams.map((subParam) => {
          return {...subParam, uid: generateUuid('pm'), touched: false};
        });
        return {...trigger, subParams};
      });
      const paramOptions = param.defaultValue ?
        triggers.find((opt) => opt.triggerValue === param.defaultValue) :
        null;
      return {...canvasParam, triggerOptions: {enabled, triggers}, paramOptions};
    } else {
      return canvasParam;
    }
  })
});

export const genReadParquetOperatorWithDatasource = (operator, datasource) => {
  return {
    ...operator,
    aliasName: `数据源：${datasource.name}`,
    readonly: true,
    params: operator.params.map((param) => ({...param, readonly: true, touched: true, value: datasource.hdfsPath})),
    outputs: operator.outputs.map((output) => ({...output, schema: getDatasourceSchema(datasource)}))
  };
};

const getDatasourceSchema = (datasource) => {
  return JSON.parse(datasource.schemaInfo)[datasource.name].map((field) => ({
    name: field.fieldName,
    dataType: typeMapping[field.fieldType],
  }));
};

const typeMapping = {
  'Bool': 'bool',
  'Boolean': 'bool',
  'Int': 'int',
  'Double': 'double',
  'String': 'string',
};
