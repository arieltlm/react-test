// 子组件给父亲组件传值，甚至孙子组件给爷爷组件传递值
// 通过事件，子组件中的事件childHandleClick触发父组件中的事件parentHandelClick，
// 父组件的事件名称fromParentEventName={this.handelClick}通过props传递，在子组件中获取触发this.props.fromParentEventName
// 再扯多一级，即可一直props传递即可
import React from 'react';
class GrandSon extends React.Component {
    constructor (props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick () {
        this.props.setEmial('123@sina.com');
    }
    render () {
        return (
            <div>
                <button onClick={this.handleClick}>点击</button>
            </div>
        )
    }

}
class Child extends React.Component {
    constructor (props) {
        super(props);
        this.handleEmail = this.handleEmail.bind(this);
    }
    handleEmail (e) {
        const value = e.target.value.replace('@', '$');
        this.props.onEmailInput(value);
    }
    render() {
        return (
            <div>
                <label>请输入邮箱：</label>
                <input type="text" onChange={this.handleEmail}/>
                <GrandSon setEmial={this.props.GrandSonEmail}></GrandSon>
            </div>
        )
    }
}

class Parents extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            email: ''
        }
        this.handleEmails = this.handleEmails.bind(this);
        this.fromGrandSon = this.fromGrandSon.bind(this);
    }
    handleEmails (email) {
        this.setState({
            email
        })
    }
    fromGrandSon (email) {
        this.setState({
            email
        })
    }
    render () {
        return (
            <div>
                <p>用户邮箱：{this.state.email}</p>
                <Child onEmailInput={this.handleEmails} GrandSonEmail={this.fromGrandSon}></Child>
            </div>
        )
    }

}

export default Parents;