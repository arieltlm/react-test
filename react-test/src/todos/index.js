import React from 'react';
import ReactDom from 'react-dom';
import './style.scss';

class About extends React.Component {
    render() {
        return <button className="square">About</button>;
    }
};
class Inbox extends React.Component {
    render() {
        return <button className="square">Inbox</button>;
    }
};
class Home extends React.Component{
    render() {
        return <button className="square">Home</button>;
    }
};

class App extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            route: window.location.hash.substr(1),
        };
    }
    componentDidMount() {
        window.addEventListener('hashchange', () => {
            this.setState({
                route: window.location.hash.substr(1)
            })
        })
    };
    render() {
        let Child;
        switch (this.state.route) {
            case '/about': 
                Child = About;
                break;
            case '/inbox': 
                Child = Inbox;
                break;
            default:
                Child = Home;
                break;
        }

        return (
            <div>
                <h1>App</h1>
                <ul>
                    <li><a href="#/about">About</a></li>
                    <li><a href="#/inbox">Inbox</a></li>
                    <li><a href="#/home">Home</a></li>
                </ul>
                <Child/>
            </div>
        )
    }
};

ReactDom.render(<App />, document.getElementById('App'));