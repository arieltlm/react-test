import React from 'react';
import {Card} from 'antd';
import {BrowserRouter as Router, Link} from 'react-router-dom';

class PCNewsBlock extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            news: ''
        }
    }
    componentWillMount () {
        const myFetchOptions = {
            methods: 'GET'
        };
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type="
        + this.props.type + "&count=" + this.props.count, myFetchOptions)
        .then(response => response.json())
        .then(json => this.setState({news: json}));
    }
    render () {
        const {news} = this.state;
        const newsLists = news.length > 0
        ? news.map((newsItem, index) => {
            return (
                <li key={index} className="news_block_list">
                    <Link to={`/details/${newsItem.uniquekey}`} target="_self">
                        {newsItem.title}
                    </Link>
                </li>
            )
        })
        : '没有加载到任何新闻';
        return (
            <div>
                <Card bordered="false">
                    <Router>
                        <ul>
                            {newsLists}
                        </ul>
                    </Router>
                </Card>
            </div>
        )
    }
}

export default PCNewsBlock;