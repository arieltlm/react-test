import React from 'react';
import {Card} from 'antd';
import {BrowserRouter as Router, Link} from 'react-router-dom';

class PCNewsImgBlock extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            news: ''
        };
    }
    componentWillMount () {
        const myFetchOptions = {
            methods: 'GET'
        };
        fetch('http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type='
        + this.props.type + '&count=' + this.props.count, myFetchOptions)
            .then(response => response.json())
            .then(json => this.setState({news: json}));
    }
    render () {
        const styleImg = {
            display: 'block',
            width: this.props.imageWidth,
            height: '90px'
        };
        const styleH3 = {
            width: this.props.imageWidth,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
        };
        const {news} = this.state;
        const newsLists = news.length > 0
            ? news.map((newsItem, index) => (
                <div className="imageBlock" key={index}>
                    <Link to={`details/${newsItem.uniquekey}`} target="_blank">
                        <div className="custom-image">
                            <img src={newsItem.thumbnail_pic_s} alt="" style={styleImg}/>
                        </div>
                        <div className="custom-card">
                            <h3 style={styleH3}>{newsItem.title}</h3>
                            <p style={styleH3}>{newsItem.author_name}</p>
                        </div>
                    </Link>
                </div>
            ))
            : '没有加载到任何新闻';
        return (
            <div className="topNewsList">
                <Router>
                    <Card title={this.props.cartTitle} bordered={true} style={{
                        width: this.props.width
                    }}>
                        {newsLists}
                    </Card>
                </Router>
            </div>
        );
    }
}

export default PCNewsImgBlock;