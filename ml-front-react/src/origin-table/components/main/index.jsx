/**
 * 功能：原始表
 * 作者：tlm
 * 日期： 2019-07-23
 */
import { React, Route, Switch } from 'framework/Util'
import { lazyload } from 'framework'
import config from 'conf'

const { url: { app: { 
    originalDataSource, 
    originalTableList, 
    originalTableField 
} } } = config

function OriginTableView(){
    return (
        <React.Fragment>
            <Switch>
                <Route
                    path={originalTableField.path}
                    component={lazyload(import('@/origin-table/container/origin-table-field'))}
                />
                <Route
                    path={originalTableList.path}
                    component={lazyload(import('@/origin-table/container/origin-table-list'))}
                />
                <Route
                    path={originalDataSource.path}
                    component={lazyload(import('@/origin-table/container/origin-table-datasource'))}
                />
            </Switch>
        </React.Fragment>
    )
}

export default OriginTableView
