/*
 * Created by anchao on 2016/6/29.
 */
import { React, PropTypes, NavLink, PureComponent, noop } from 'framework/Util'
import { Badge, Tooltip } from 'antd'
// import config from 'conf'
import dialog from 'dialog'

import WarningPopup from '../warning-info-popup'

import './scss/index.scss'

class Header extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            warningSummary: [],
            warningDetail: [],
        }
        this.setTimeoutId = null
        this.checkWarningSec = 5 * 60
        this.isOpeningWarning = false
    }

    componentDidMount() {
        this.handleTimeCheckWarning()
        // 检测是否有目标表目录。没有的时候，不需要请求count
        const { resources, getNeedUpdateCount } = this.props
        const targettableHas = resources.find(item => item.en === 'targettable')
        if (targettableHas) {
            getNeedUpdateCount()
        }
    }

    componentWillUnmount() {
        this.handleClearTimeCheckWarning()
    }

    logoutFn = () => {
        const { logout } = this.props
        logout()
        // .then((res) => {
        //     if (res.statusCode === 200) {
        //         history.replace(config.url.login.path)
        //     } else {
        //         dialog.alert({
        //             title: '退出登录',
        //             infoType: 'error',
        //             content: <div>{res.message}</div>
        //         })
        //     }
        // })
    }

    handleClearTimeCheckWarning = () => {
        if (this.setTimeoutId) {
            clearTimeout(this.setTimeoutId)
            this.setTimeoutId = null
        }
    }

    handleTimeCheckWarning = () => {
        const { getWarningInfo } = this.props
        this.handleClearTimeCheckWarning()
        this.setTimeoutId = setTimeout(() => {
            if (!this.isOpeningWarning) {
                getWarningInfo()
                    .then((datas) => {
                        const { statusCode, data } = datas
                        this.setWarningStatus(statusCode, data)
                    })
            }
        }, this.checkWarningSec * 1000)
    }

    handleShowWarningClick = () => {
        this.isOpeningWarning = true
        const { warningDetail } = this.state
        dialog.confirm({
            title: '告警详情',
            width: 1000,
            content: <WarningPopup warningDetail={warningDetail} />,
            ok: () => {
                this.isOpeningWarning = false
                this.handleTimeCheckWarning()
                dialog.hide()
            }
        })
    }

    setWarningStatus = (status, res) => {
        const { summary, detail } = res
        if (status) {
            this.setState({ warningSummary: summary, warningDetail: detail })
        }
        this.handleTimeCheckWarning() // 暂时注释掉 
    }

    updateTargetTables = (e) => {
        e.preventDefault()
        e.stopPropagation()
        // const pathname = window.location.hash
        const { updateTargetTableVersion, setUpdateCountZero } = this.props
        dialog.confirm({
            title: '更新版本',
            width: 200,
            content: <div><i className="fa fa-exclamation-triangle fa-lg text-warning" />确定要全部更新吗？</div>,
            ok: () => {
                updateTargetTableVersion({
                    params: { targetTableId: '' }
                }).then((datas) => {
                    if (datas.statusCode === 200) {
                        setUpdateCountZero() // TODO
                        dialog.hide()
                        // 根据hash决定是否刷新,目标表第二,三页
                        // if (pathname.startsWith('#/app/targettable/')) {
                        //     window.location.reload()
                        // }
                    } else {
                        dialog.alert(datas.message, 'error')
                    }
                })
            }
        })
    }


    render() {
        const { username, resources, count } = this.props
        const { warningSummary } = this.state
        const isWarning = warningSummary && warningSummary.length > 0
        const warningSummaryInfo = (
            <div>
                <p>点击叹号查看详情</p>
                <p>概要信息：</p>
                {
                    warningSummary.map((item, index) => (
                        <p key={`summary-${index}`}>{item}</p>
                    ))
                }
            </div>
        )
        return (
            <div styleName="header" className="clearfix">
                <div className="pull-left logo" />
                <div className="pull-left navigation">
                    <ul className="list-unstyled list-inline">
                        {resources.map((item, index) => {
                            if (item.en === 'targettable') {
                                return (
                                    <li key={`navlink${index}`}>
                                        <NavLink
                                            replace
                                            to={`/app/${item.en}`}
                                            activeClassName="active-nav"
                                        >
                                            {typeof (item.icon) === 'undefined' && (
                                                <span className={`icon ${item.en}`} />
                                            )}
                                            {item.cn}
                                            {count > 0 && (
                                                <Badge count={count} onClick={this.updateTargetTables} />
                                            )}
                                        </NavLink>
                                    </li>
                                )
                            }
                            return (
                                <li key={`navlink${index}`}>
                                    <NavLink
                                        replace
                                        to={`/app/${item.en}`}
                                        activeClassName="active-nav"
                                    >
                                        {typeof (item.icon) === 'undefined' && (
                                            <span className={`icon ${item.en}`} />
                                        )}
                                        {item.cn}
                                    </NavLink>
                                </li>
                            )
                        })}
                    </ul>
                </div>
                <div className="pull-right headrright">
                    <div>{username}</div>
                    {
                        isWarning && (
                            <div
                                role="presentation"
                                onClick={this.handleShowWarningClick}
                            >
                                <Tooltip className="warning-tool-tip" title={warningSummaryInfo} placement="bottom">
                                    <i className="fa fa-warning warning-icon" />
                                </Tooltip>
                            </div>
                        )
                    }
                    <div role="presentation" onClick={this.logoutFn}><i className="fa fa-power-off" /></div>
                </div>
            </div>
        )
    }
}

Header.propTypes = {
    count: PropTypes.number,
    username: PropTypes.string.isRequired,
    logout: PropTypes.func.isRequired,
    // history: PropTypes.object.isRequired,
    resources: PropTypes.array.isRequired,
    getWarningInfo: PropTypes.func,
    updateTargetTableVersion: PropTypes.func.isRequired,
    setUpdateCountZero: PropTypes.func.isRequired,
    getNeedUpdateCount: PropTypes.func.isRequired,
}

Header.defaultProps = {
    count: 0,
    getWarningInfo: noop,
}

export default Header
