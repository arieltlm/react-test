/**
 * 功能: 测试websocket
 * 作者: tanglimei
 * 日期: 2019.12.01
 */
import React from 'react'

class WebsocketTest extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            message:'123132',
            content: ''
        }
        this.ws = null;
    }

    componentDidMount() {
        this.connectWebsocket()
    }
    connectWebsocket() {
        const msgData = {
            fromUserId: 1,
            toUserId: 2,
            type: 'open',
            content: ''
        }
        this.ws = new WebSocket('ws://localhost:9001');
        // 监听连接成功
        this.ws.onopen = () => {
            console.log('连接服务端WebSocket成功');
            this.ws.send(JSON.stringify(msgData));	// send 方法给服务端发送消息
        };
    
        // 监听服务端消息(接收消息)
        this.ws.onmessage = (msg) => {
            let message = JSON.parse(msg.data);
            // 得，没研究明白，这里为啥一直没有值呢？  不太会node。感觉是server里面 路径什么的。还是没理解，哎
            // 20191201  ----后面有空再研究吧。
            // https://github.com/lvbowen/WebSocket
            // https://juejin.im/post/5dd4b991e51d450818244c30
            console.log('收到的消息：', message)
            this.setState({ message})
        };
    
        // 监听连接失败
        this.ws.onerror = () => {
            console.log('连接失败，正在重连...');
            connectWebsocket();
        };
    
        // 监听连接关闭
        this.ws.onclose = () => {
            console.log('连接关闭');
        };
    };

    handleChange= (e) => {
        this.setState({
            content:e.target.value
        })
    }
    handleClick = () => {
        const {content} = this.state
        const msgData = {
            fromUserId: 1,
            toUserId: 2,
            type: 'text',
            content
        }
        this.ws.send(JSON.stringify(msgData))  
    }
    render() {
        const {message, content} =this.state
        return (
            <div className="">
                {message}
                <input type="text" value={content} onChange={this.handleChange}/>
                <button onClick={this.handleClick}>点击发送</button>
            </div>
        )
    }
}

// WebsocketTest.propTypes = {
// 
// }

// WebsocketTest.defaultProps = {
// 
// }

export default WebsocketTest
