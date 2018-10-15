import React from 'react';

// if else
function Login () {
    return (<div>'Welcome to here!'</div>)
}
function Sign () {
    return (<div>'Please sign up!'</div>)
}

function Greeting(props) {
    if (props.isLogin) {
        return <Login />
    } else {
        return <Sign />
    }
} 
// 动态的登陆还是退出
function LoginButton (props) {
    return (
        <button onClick = {props.onClick}>
            Login
        </button>
    );
}

function LogoutButton(props) {
    return (
        <button onClick = {props.onClick}>
            Logout
        </button>
    )
}
class LoginControl extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            isLoginIn: false
        }
        this.handleClickLogin = this.handleClickLogin.bind(this);
        this.handleClickLogout = this.handleClickLogout.bind(this);
    }
    handleClickLogin () {
        this.setState({isLoginIn: true})
    }

    handleClickLogout () {
        this.setState({isLoginIn: false})
    }
    render () {
        const isLoginIn = this.state.isLoginIn;
        let button;
        if (!isLoginIn) {
            button = <LoginButton onClick = {this.handleClickLogin} />
        } else {
            button = <LogoutButton onClick = {this.handleClickLogout} />
        }
        return (
            <div> 
                <Greeting isLogin = {isLoginIn} />
                {/* {button} */}
                {isLoginIn ? (
                    <LogoutButton onClick={this.handleClickLogout} />
                ) : (
                    <LoginButton onClick={this.handleClickLogin} />
                )}
            </div>
        )
    }
}

// && 
function Mailbox(props) {
    const unreadMessage = props.unreadMessage;
    return (
        <div>
            <h1>Hello</h1>
            {unreadMessage.length > 0 &&
                <h2>
                    You have {unreadMessage.length} unreadMessage.
                </h2>
            }
        </div>
    )
}

function Condis(props) {
    const isLoginIn = props.isLogin;
    return (
        <div>
            The user is <b>{isLoginIn ? 'currently' : 'not'}</b> logged in.
        </div>
    )
}

// 防止组件渲染
function WarningBanner (props) {
    if(!props.warn) {
        return null;
    }
    return (
        <div className = "warning">
            Warning!
        </div>
    )
}
class Page extends React.Component {
    constructor (props) {
        super(props);
        this.state = {showWarning: true};
        this.handleToggleClick = this.handleToggleClick.bind(this);
    }
    
    handleToggleClick() {
        this.setState(prevState => ({
            showWarning: !prevState.showWarning
        }))
    }
    render () {
        return (
            <div>
                <WarningBanner warn = {this.state.showWarning} />
                <button onClick = {this.handleToggleClick}>
                    {this.state.showWarning ? 'Hide' : 'Show'}
                </button>
            </div>
        )
    }

}
export {Greeting, LoginControl, Mailbox, Condis, Page};