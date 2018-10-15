const getContainer = () => document.querySelector('div.contextMenuContainer');

const getContainerRect = () => getContainer().getBoundingClientRect();

export const calcMenuPosition = (event) => {
  const {pageX, pageY} = event;
  const {left: canvasLeft, top: canvasTop} = getContainerRect();
  const left = pageX - canvasLeft;
  const top = pageY - canvasTop;
  return {left, top};
};
