import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import CommentApp from './component/CommentApp';
import * as serviceWorker from './serviceWorker';
import WordAdder from "./testBox/PureComponentTest";
import App from "./testBox/contextTest/app";

ReactDOM.render( 
<div>
    <App />
    <CommentApp />
    <WordAdder />
</div> , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
