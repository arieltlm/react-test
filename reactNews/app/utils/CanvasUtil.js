export const operatorSpan = 20;
export const operatorWidth = 210;
export const operatorHeight = 40;

export const getPortStartPosition = (portCount) =>{
  //根据算子的大小计算算子的输入输出端口的起始位置
  const operatorPortWidth = 10;

  return Math.round((operatorWidth - ((portCount - 1) * operatorSpan + operatorPortWidth)) / 2) + operatorPortWidth / 2;
};

export const calcOutputPort = (outputOperator, outputIndex) => {
  //算子之间连线
  const outputPortStartPos = getPortStartPosition(outputOperator.outputs.length);

  //为了画面统一，起始点都要根据当前选中算子的位置进行计算出来
  const outputOpX = outputOperator.ui.left;
  const outputOpY = outputOperator.ui.top;

  const outputX = outputOpX + (outputPortStartPos + outputIndex * operatorSpan);
  //输出端口相对算子向下偏移40
  const outputY = outputOpY + operatorHeight;
  return {outputX, outputY};
};

export const calcInputPort = (inputOperator, inputIndex) => {
  const inputPortStartPos = getPortStartPosition(inputOperator.inputs.length);
  const inputOpX = inputOperator.ui.left;
  const inputOpY = inputOperator.ui.top;

  const inputX = inputOpX + (inputPortStartPos + inputIndex * operatorSpan);
  return {inputX, inputY: inputOpY};
};

export const calcPipelineInfo = (outputOperator, inputOperator, outputPortIndex, inputPortIndex) => {
  const {outputX, outputY} = calcOutputPort(outputOperator, outputPortIndex);
  const {inputX, inputY} = calcInputPort(inputOperator, inputPortIndex);
  const disY = Math.abs((inputY - outputY)/2);
  return `M${outputX} ${outputY} C${outputX} ${outputY + disY}, ${inputX} ${inputY - disY}, ${inputX} ${inputY}`;
};

export const calcOperatorInfo = (operator) => {
  const {id, inputs, outputs, name, displayName, aliasName, ui: {left, top}} = operator;
  const finalName = aliasName || displayName;
  const sTransform = `translate(${left},${top})`;

  //算子输入输出起始位置计算
  const inputStart = getPortStartPosition(inputs.length);
  const outputStart = getPortStartPosition(outputs.length);

  return {id, name, finalName, sTransform, inputs, outputs, inputStart, outputStart, operatorSpan};
};

const getCanvas = () => document.querySelector('div.canvasMain');

export const getCanvasRect = () => getCanvas().getBoundingClientRect();

export const calcCanvasPosition = (event) => {
  const {pageX, pageY} = event;
  const {left: canvasLeft, top: canvasTop} = getCanvasRect();
  const left = pageX - canvasLeft;
  const top = pageY - canvasTop;
  return {left, top};
};


