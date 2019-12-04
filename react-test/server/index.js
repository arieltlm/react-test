const path = require('path');
const express = require('express');
const app = express();
const server = require('http').Server(app);
const WebSocket = require('ws');

const wss = new WebSocket.Server({ server: server });

wss.on('connection', (ws) => { 

  // 监听客户端发来的消息
  ws.on('message', (message) => {
    console.log(wss.clients.size);
    let msgData = JSON.parse(message);   
    if (msgData.type === 'open') {
      // 初始连接时标识会话
      ws.sessionId = `${msgData.fromUserId}-${msgData.toUserId}`;
    } else {
      let sessionId = `${msgData.toUserId}-${msgData.fromUserId}`;

      wss.clients.forEach(client => {
        if (client.sessionId === sessionId) {
          client.send(message);	 // 给对应的客户端连接发送消息
        }
      })  
    }
  })

  // 连接关闭
  ws.on('close', () => {
    console.log('连接关闭');  
  });
});
app.get('/', function (req, res) {
    // res.sendFile(path.join(__dirname, 'index.html'));
    res.send(req);
})


server.listen(9001, function () {
    console.log('http://localhost:9001');
});