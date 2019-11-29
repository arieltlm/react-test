/**
 * Created by anchao on 2015/12/7.
 */
import './css/index.scss'
import 'css/common/plugins/antd-ext.less'
import { sendLog } from './framework/ajax'
import projectInit from './framework/projectInit'

projectInit(document.querySelector('#container'), () => {
    console.log('工程初始化完成！！')
    
    // 图片加载失败处理
    document.addEventListener('error', (e) => {
        const elem = e.target
        if (elem.tagName.toLowerCase() === 'img') {
            elem.src = '/static/images/404.png'
            // elem.className = 'img-responsive'
        }
    }, true)
    
    
    // 日志收集
    document.addEventListener('click', (e) => {
        const ele = e.target
        const { opid: opId, content } = ele.dataset
        const actualContent = content || ele.innerText

        if (opId) {
            sendLog({ opId: Number(opId), content: actualContent })
        }
    }, true)
})

if (process.env.NODE_ENV === 'production') {
    window.addEventListener('beforeunload', (e) => {
        const msg = '确定要离开吗？'
        e.returnValue = msg
        return msg
    }, false)
}
