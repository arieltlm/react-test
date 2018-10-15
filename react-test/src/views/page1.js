import React from 'react';
import ReactDOM from 'react-dom';

import {Greeting, LoginControl, Mailbox, Condis, Page} from '../mainConcepts/ifelse.js';
import Toggle from '../mainConcepts/toggle.js';
import Clock from '../mainConcepts/clock.js';
import Reservation from '../mainConcepts/form.js';
import Calculator from '../mainConcepts/liftingStateupOneValue';
import CalculatorliftState from '../mainConcepts/liftingStateup';
import Parents from '../mainConcepts/parentChildValue';
import {WelcomeDialogUp, SplitPaneParent, ContainChildren} from '../mainConcepts/slot';
import ProDataBase from '../mainConcepts/proDatabase';
import FilterTableProductTable from '../mainConcepts/proDatabase_formWebsite';
import {Glossary, Tables} from '../highLevelGuide/fragment';
import Apps from '../highLevelGuide/context/app.js';
import ErrorBoundary from '../highLevelGuide//errorBoundary';





function App() {
    return (
        <Clock />
    );
}


const message = ['abc', '1324', 'zhaobgob'];
const data = [
    {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
    {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
    {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
    {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
    {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
    {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
];

// ReactDOM.render(
//     <input value="hi" />,
//     document.getElementById('App')
// );
// setTimeout(() => {
//     ReactDOM.render(<input value={null} />,  document.getElementById('App'))
// }, 1000);
function Page1 () {
    return (
        <div className="wrap">
        <div className="box">
            <App />
            <Toggle />
            <Greeting isLogin={true} />
            <Greeting isLogin={false} />
            <LoginControl />
        </div>
        <hr/>
        <div className="box">
            <Mailbox unreadMessage = {message} />
            <Condis isLogin = {true} />
            <Condis isLogin = {false} />
        </div>
        <hr/>
        <div className="box">
            <Page /> 
            <Reservation />
        </div>
        <hr/>
        <div className="box">
            <Calculator />
            <CalculatorliftState />
        </div>
        <hr />
        <div className="box">
            <Parents />
            <WelcomeDialogUp />
            <SplitPaneParent />
            <ContainChildren />
        </div>
        <hr />
        <div className="box">
            <ProDataBase tableData={data}/>
            <FilterTableProductTable products={data}/>
        </div>
        <hr />
        <div className="box">
            <ErrorBoundary><Glossary products={data}></Glossary></ErrorBoundary>
            <Tables></Tables>
            <Apps />
        </div>
    </div>
    )
}
export default Page1;

