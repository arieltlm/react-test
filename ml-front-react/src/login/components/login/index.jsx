/**
 * 功能：登录组件
 * 作者：安超
 * 日期：2018/7/4
 */

import config from 'conf'
import { React, PropTypes, PureComponent, classNames } from 'framework/Util'
import { Button } from 'antd'
import particlesJS from 'particles'
import './scss/index.scss'

const { 
    constant: { particles },
    injection: { projectVersion }
} = config

class Login extends PureComponent {
    constructor(props){
        super(props)
        
        this.state = {
            errorMsg: '',
        }
    }

    componentDidMount() {
        // 用户名获得焦点11
        this.username.focus()
        particlesJS('particles-js', particles)
    
        const { projectInit } = this.props
        projectInit()
        
        window.addEventListener('resize', () => {
            console.log('log')
        }, false)

        window.onkeydown = (e) => {
            if (e.keyCode === 13) {
                this.login()
            }
        }
    }

    setError = (errorMsg) => {
        this.setState({ errorMsg })
    }
    
    login = () => {
        const username = this.username.value.trim()
        const password = this.pwd.value.trim()
        const { login } = this.props
        
        if (username.length === 0) {
            this.username.focus()
            this.setError('请输入用户名!')
            return
        }
        
        if (password.length === 0) {
            this.pwd.focus()
            this.setError('请输入密码!')
            return
        }
        
        // 清空错误信息
        this.setError('')
        
        // 登录检验
        login({ data: { data: { username, password } } })
            .then((res) => {
                if (res.statusCode === 200) {
                    // window.localStorage.setItem('auth', username) //TODO
                    this.gotoUrl(config.url.app.root.path)
                } else {
                    this.setError(res.message)
                }
            })
    }
    
    gotoUrl = (url) => {
        const { history } = this.props
        history.replace(url)
    }
    
    render() {
        const { errorMsg } = this.state
        const errorCls = classNames('errors', 'pull-right', { invisible: errorMsg.length <= 0 })
        
        return (
            <div styleName="login-login">
                <div id="particles-js" />
                <div className="login-box-main">
                    <div className="input-group">
                        <input
                            type="text"
                            data-id="1"
                            ref={(username) => {
                                this.username = username
                            }}
                            className="login-user"
                            onKeyDown={this.forbitBlackSpace}
                        />
                        <input
                            type="password"
                            ref={(pwd) => {
                                this.pwd = pwd
                            }}
                            className="login-pwd"
                        />
                        <i className="fa fa-user-o fa-lg" />
                        <i className="fa fa-bell-o fa-lg pwdico" />
                    </div>
                    <div className="login-btn">
                        <div className={errorCls}><i
                            className="fa fa-exclamation-circle fa-lg"
                        />{errorMsg}
                        </div>
                        <div className="clearfix" />
                        <Button type="primary" block onClick={this.login} className="login-button">
                            登录
                        </Button>
                    </div>
                </div>
                <div className="version-sec">{projectVersion}</div>
            </div>
        )
    }
}

Login.propTypes = {
    history: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    projectInit: PropTypes.func.isRequired
}

export default Login
