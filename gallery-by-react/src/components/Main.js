require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';
import ReactDOM from 'react-dom';

//获取图谱相关的数据
let imageDatas = require('../data/imageDatas.json');
//利用自执行函数，将图片名信息转为图片地址
imageDatas = (function genImageURL(imageDataArr){
    for(let i = 0,j=imageDataArr.length;i<j;i++){
		let singleImageData = imageDataArr[i];

		singleImageData.imageURL = require('../images/'+singleImageData.fileName);

		imageDataArr[i] = singleImageData;
	}
	return imageDataArr;
})(imageDatas);

class ImgFigure extends React.Component {

	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}
	/**
	 * imgFigure的点击处理函数
	 */
	handleClick (e){
		if(this.props.arrange.isCenter){
			this.props.inverse();
		}else{
			this.props.center();
		}

		e.stopPropagation();
		e.preventDefault()
	}
	render() {
		//如果props属性中指定了这张图片的位置，则使用
		let styleObj = {};
		if (this.props.arrange.pos) {
			styleObj = this.props.arrange.pos;
		}

		//如果图片的旋转角度有值并且不为0，则添加旋转角度
		if(this.props.arrange.rotate){
			(['MozTransform', 'msTransform', 'WebkitTransform', 'transform']).forEach((value) => {
				styleObj[value] = 'rotate('+this.props.arrange.rotate +'deg)';
			})
		}

		if(this.props.arrange.isCenter){
			styleObj.zIndex = 11;
		}

		let imgFigureClassName = 'img-figure';
		imgFigureClassName += this.props.arrange.isInverse? ' is-inverse':'';

		return (
			<figure className={imgFigureClassName} style={styleObj} onClick={this.handleClick}>
				<img src={this.props.data.imageURL}
					alt={this.props.data.title} />
				<figcaption>
					<h2 className="img-title">{this.props.data.title}</h2>
					<div className="img-back" onClick={this.handleClick}>
						<p>
							{this.props.data.desc}
						</p>
					</div>
				</figcaption>
			</figure>
		);
	}
};

class ControllerUnits extends React.Component{

	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}
	handleClick(e){
		if(this.props.arrange.isCenter){
			this.props.inverse();
		}else{
			this.props.center();
		}
		e.stopPropagation();
		e.preventDefault()
	}
	render(){
		let controllerUnitClassName = 'controller-unit';

		if(this.props.arrange.isCenter){
			controllerUnitClassName += ' isCenter';

			if(this.props.arrange.isInverse){
				controllerUnitClassName += ' isInverse';
			}
		}
		return (
			<span className={controllerUnitClassName} onClick={this.handleClick}></span>
		)
	}
};
/**
 *获取区间内的一个随机值
 *
 * @param {*} low
 * @param {*} high
 * @returns
 */
function getRangeRandom(low,high){
	return Math.ceil(Math.random() * (high - low) + low);
}
/**
 *获取旋转随机数（限制30deg内）
 *
 * @returns
 */
function get30DegRandom(){
	return Math.random() > 0.5 ? '':'-' + Math.ceil(Math.random() * 30);
}
class AppComponent extends React.Component {

	constructor(props) {
		super(props);//需要使用this.props时要加上这个props。所以统一都写上
		this.Constant = {
			centerPos: {//中心点图片
				left: 0,
				top: 0
			},
			hPosRange: {//水平方向的取值范围
				leftSecX: [0, 0],
				rightSecX: [0, 0],
				y: [0, 0]
			},
			vPosRange: {//垂直方向的取值范围
				x: [0, 0],
				topY: [0, 0]
			}
		};
		this.state = {
			imgsArrangeArr:[
				/* {
					pos:{
						left:'0',
						top:'0'
					},
					rotate:0,
					isInverse:false,//图片正反面
					isCenter:false//是否为居中图片
				} */
			]
		}
	}
	/**
	 *利用rearrange函数，居中对应index的图片
	 * @param {*} index 需要被居中图片的index
	 * @returns {Function}
	 * @memberof AppComponent
	 */
	center(index){
		return () => this.rearrange(index);
	}
	/**
	 *翻转图片
	 *
	 * @param {*} index 输入需要翻转图片的index
	 * @memberof AppComponent
	 * @return 返回一个真正待执行的函数
	 */
	inverse (index){
		return function(){
			let imgsArrangeArr = this.state.imgsArrangeArr;

			imgsArrangeArr[index].isInverse = ! imgsArrangeArr[index].isInverse;

			this.setState({
				imgsArrangeArr:imgsArrangeArr
			})
		}.bind(this)
	}

	/**
	 *重新布局所有图片
	 *@param centerIndex 指定剧中排布哪一张图片
	 * @memberof AppComponent
	 */
	rearrange (centerIndex){
		let imgsArrangeArr = this.state.imgsArrangeArr,
			Constant = this.Constant,
			centerPos = Constant.centerPos,
			hPosRange = Constant.hPosRange,
			vPosRange = Constant.vPosRange,
			hPosRangeLeftSecX = hPosRange.leftSecX,
			hPosRangeRightSecX = hPosRange.rightSecX,
			hPosRangeY = hPosRange.y,
			vPosRangeTopY = vPosRange.topY,
			vPosRangeX = vPosRange.x,

			imgsArrangeTopArr = [],//上侧区域的图片，0或者1个
			topImgNum = Math.floor(Math.random() * 2),
			topImgSpliceIndex = 0,//用来标记布局在上册区域的这张图片是从数组中哪里拿到的

			imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex,1);//从数组中剔除中心图片

			//居中centerIndex的图片
			imgsArrangeCenterArr[0] = {
				pos:centerPos,
				rotate:0,
				isCenter:true
			}


			//取出要布局上侧的图片的状态信息
			topImgSpliceIndex = Math.ceil(Math.random() * (imgsArrangeArr.length - topImgNum));
			imgsArrangeTopArr = imgsArrangeArr.splice(topImgSpliceIndex,topImgNum);
			//布局上侧的图片
			imgsArrangeTopArr.forEach(function(value,index){
				imgsArrangeTopArr[index] = {
					pos:{
						top: getRangeRandom(vPosRangeTopY[0], vPosRangeTopY[1]),
						left: getRangeRandom(vPosRangeX[0], vPosRangeX[1])
					},
					rotate:get30DegRandom(),
					isCenter: false
				}
			});
			//布局左右两侧的图片
			for(let i = 0,j = imgsArrangeArr.length,k = j / 2;i < j;i++){
				let hPosRangeLORX = null;

				//前半部分布局在左边，右半部分布局右边
				if(i < k){
					hPosRangeLORX = hPosRangeLeftSecX;
				}else{
					hPosRangeLORX = hPosRangeRightSecX;
				}

				imgsArrangeArr[i] ={
					pos:{
						top: getRangeRandom(hPosRangeY[0], hPosRangeY[1]),
						left: getRangeRandom(hPosRangeLORX[0], hPosRangeLORX[1])
					},
					rotate:get30DegRandom(),
					isCenter: false
				}

			}

			if(imgsArrangeTopArr && imgsArrangeTopArr[0]){
				imgsArrangeArr.splice(topImgSpliceIndex,0,imgsArrangeTopArr[0]);
			}

			imgsArrangeArr.splice(centerIndex,0,imgsArrangeCenterArr[0]);

			this.setState({
				imgsArrangeArr:imgsArrangeArr
			})

	}
	//组件加载以后，为每张图片计算其位置的范围
	componentDidMount(){
		//舞台大小
		const stageDom = this.refs.stage,
			stageW = stageDom.scrollWidth,//scrollWidth是对象的实际内容宽度，不包括滚动条等边线宽度，不随对象中内容超过可视区域而变大
			stageH = stageDom.scrollHeight,//clientWidth是对象内容的可视区域宽度，不包括滚动条等边线宽度，会随对象显示大小的变化而变化
			// offsetWidth是对象整体的实际宽度，包括滚动条等边线宽度，会随对象显示大小而变化
			halfStageW = Math.ceil(stageW / 2),
			halfStageH = Math.ceil(stageH / 2);
		//imageFigure的大小
		// const imgFigureDom = this.refs.imgFigure0,//上面就可以取到，但是此处拿不到
		const imgFigureDom = ReactDOM.findDOMNode(this.refs.imgFigure0),
			imgW = imgFigureDom.scrollWidth,
			imgH = imgFigureDom.scrollHeight,
			halfImgW = Math.ceil(imgW / 2),
			halfImgH = Math.ceil(imgH / 2);
		//计算中心图片的位置点
		this.Constant.centerPos = {
			left:halfStageW - halfImgW,
			top:halfStageH - halfImgH
		}

		//计算左侧右侧区域图片排布位置的取值范围
		this.Constant.hPosRange.leftSecX[0] = -halfImgW;
		this.Constant.hPosRange.leftSecX[1] = halfStageW - halfImgW * 3;
		this.Constant.hPosRange.rightSecX[0] = halfStageW + halfImgW;
		this.Constant.hPosRange.rightSecX[1] = stageW - halfImgW;
		this.Constant.hPosRange.y[0] = -halfImgH;
		this.Constant.hPosRange.y[1] = stageH - halfImgH;

		//计算上侧区域图片排布位置的取值范围
		this.Constant.vPosRange.x[0] = halfStageW - imgW;
		this.Constant.vPosRange.x[1] = halfStageW;
		this.Constant.vPosRange.topY[0] = -halfImgH;
		this.Constant.vPosRange.topY[1] = halfStageH - halfImgH * 3;

		this.rearrange(0);
	}
	render() {
		let controllerUnits = [],
		imgFigures = [];

		imageDatas.forEach((value,index) => {
			if(!this.state.imgsArrangeArr[index]){
				this.state.imgsArrangeArr[index] = {
					pos:{
						left:0,
						top:0
					},
					rotate:0,
					isInverse: false,
					isCenter: false
				}
			}
			imgFigures.push(<ImgFigure data={value} key={index} ref={'imgFigure' + index} arrange={this.state.imgsArrangeArr[index]} inverse={this.inverse(index)} center={this.center(index)}/>);
			controllerUnits.push(<ControllerUnits key={index} arrange={this.state.imgsArrangeArr[index]} inverse={this.inverse(index)} center={this.center(index)}/>)
		});//将React.component这个对象传递到function中。

		return (
			<section className="stage" ref="stage">
				<section className="img-sec">
					{imgFigures}
				</section>
				<nav className="contorller-nav">
					{controllerUnits}
				</nav>
			</section>
		);
	}
}

AppComponent.defaultProps = {
};

export default AppComponent;
