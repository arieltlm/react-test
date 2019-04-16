import React, {Component} from 'react';
class ListOfWords extends React.PureComponent {
    render() {
        return <div>{this.props.words.join(',')}</div>;
    }
}

class WordAdder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            words: ['marklar'],
            flag: 1
        };
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        // This section is bad style and causes a bug
        const words = this.state.words;
        words.push('marklar');
        this.setState({words: words});
    }
    render() {

        return (
            <div style={{margin: 100}}>
                <button onClick={this.handleClick}>click</button>
                <h4>调用继承PureComponent组件的数组push：</h4><ListOfWords words={this.state.words} />
                <h4>本组件的数组push:</h4><div>{this.state.words.join(',')}</div>
            </div>
        );
    }
   }
export default WordAdder;