/**
 * 功能：度面包屑组件
 * 作者：张杰
 * 日期：2018.11.21
 */
import { React, PropTypes, pathToRegExp, Link } from 'framework/Util'
import './scss/index.scss'

const Breadcrumb = function ({ linkInfo, separation }) {
    const maxLen = linkInfo.length - 1
    return (
        <div styleName="breadcrumb-box">
            {
                linkInfo.map((item, index) => {
                    const { label, path, pathToParams } = item
                    if (index === maxLen) {
                        return (
                            <span key={`${label}-${index}`} className="link-item">{ label }</span>
                        )
                    } 
                    if (path) {
                        const pathTo = pathToRegExp.compile(path)
                        return (
                            <span key={`${label}-${index}`} className="link-item">
                                <Link to={pathTo(pathToParams)}>{label}</Link> {separation}&nbsp;
                            </span>
                        )
                    }
                    return (
                        <span key={`${label}-${index}`} className="link-item">{ label } {separation}&nbsp;</span>
                    )
                })
            }
        </div>
    )
}

Breadcrumb.propTypes = {
    linkInfo: PropTypes.array,
    separation: PropTypes.string,
}

Breadcrumb.defaultProps = {
    linkInfo: [],
    separation: '/'
}

export default Breadcrumb
