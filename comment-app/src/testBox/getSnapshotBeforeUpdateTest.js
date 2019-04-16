import React, {Component} from 'react';

class ScrollingList extends React.Component {
	constructor(props) {
		super(props);
		this.listRef = React.createRef();
	}

	getSnapshotBeforeUpdate(prevProps, prevState) {
		// 我们是否在 list 中添加新的 items ？
		// 捕获滚动​​位置以便我们稍后调整滚动位置。
		if (prevProps.list.length < this.props.list.length) {
			const list = this.listRef.current;
			return list.scrollHeight - list.scrollTop;
		}
		return null;
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		// 如果我们 snapshot 有值，说明我们刚刚添加了新的 items，
		// 调整滚动位置使得这些新 items 不会将旧的 items 推出视图。
		//（这里的 snapshot 是 getSnapshotBeforeUpdate 的返回值）
		// debugger;
		if (snapshot !== null) {
			const list = this.listRef.current;
			list.scrollTop = list.scrollHeight - snapshot;
		}
	}

	render() {
		return ( 
			<div ref = {this.listRef}> 
				{this.props.list.split('|').map((item, index) => (
					<p key={index} style={{padding:5,borderBottom:'1px solid red'}}>{item}</p>
				))}
			</div>
		);
	}
}
class Lists extends Component {
	constructor() {
		super();
		this.state={
			list: '13rfesgwegwegwegewgegewge|fserewwerwerwerwererewrewrer|234234bbjkbjobojb'
		}
	}
	handleClick = () => {
		const {list} = this.state;
		let listnew = list + '|111122222222222'
		this.setState({list:listnew})
	}
	render () {
		return (
			<div style={{margin: 100}}>
				<ScrollingList list={this.state.list}/>
				<button onClick={this.handleClick} style={{position:'fixed',top:20,left:80}}>增加</button>
			</div>
		)
		
	}
}

export default Lists;