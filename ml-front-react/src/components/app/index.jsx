/**
 * 功能：受限组件入口
 * 作者：安超
 * 日期： 2018/3/19
 */
import { lazyload } from 'framework'
import {
    React,
    PureComponent,
    PropTypes,
    Route,
    Redirect,
    Switch
} from 'framework/Util'
import config from 'conf'
import dialog from 'dialog'
import Header from '../../container/header'

const { url: { app } } = config

class App extends PureComponent {
    constructor(props){
        super(props)
        this.state = {
            loadedUserInfo: false,
        }
    }

    componentDidMount() {
        const { getUserInfo } = this.props
        getUserInfo()
            .then((res) => {
                if (res.statusCode === 200){
                    this.setState({
                        loadedUserInfo: true,
                    })
                } else if (res.statusCode !== 302){
                    dialog.alert({
                        title: '消息',
                        content: <span>{res.message}</span>,
                        ok: () => {
                            window.location.reload()
                        }
                    })
                } 
            })
    }

    render() {
        const { match: { url }, username, logout } = this.props
        const { loadedUserInfo } = this.state
        if (loadedUserInfo) {
            // if (username.length === 0) {
            //     return <Redirect to={config.url.login.path} />
            // }
            return (
                <div id="chief">
                    <Header
                        username={username}
                        logout={logout}
                    />
                    <Switch>
                        <Route path={app.graph.path} component={lazyload(import('@/graph/containers/main'))} />
                        <Route path={app.targetTable.path} component={lazyload(import('@/target-table/components/main'))} />
                        <Route path={app.originalDataSource.path} component={lazyload(import('@/origin-table/components/main'))} />
                        <Route path={app.verify.path} component={lazyload(import('@/verification/container/main'))} />
                        <Route path={app.knowledge.path} component={lazyload(import('@/knowledge/container/main'))} />
                        <Route path={app.ruleManage.path} component={lazyload(import('@/rule-manage/container/main'))} />
                        <Route path={app.ruleConfig.path} component={lazyload(import('@/rule-config/container/main'))} />
                        <Route path={app.mapping.path} component={lazyload(import('@/mapping/container/main'))} />
                        {/* <Route path={app.standard.path} component={lazyload(import('@/standard/components/main'))} /> */}
                        <Route path={app.taskScheduling.path} component={lazyload(import('@/task-scheduling/container/main'))} />
                        <Route path={url} exact render={() => <Redirect to={app.graph.path} />} />
                    </Switch>
                </div>
            )
        }
        return <div />
    }
}

App.propTypes = {
    match: PropTypes.object.isRequired,
    getUserInfo: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
}

export default App
