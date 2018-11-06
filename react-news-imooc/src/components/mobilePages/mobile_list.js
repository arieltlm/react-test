import React from 'react';
import {Row, Col} from 'antd';
import {BrowserRouter as Router, Link} from 'react-router-dom';



class MobileList extends React.Component{
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
    render() {
        const {news} = this.state;
        const newsLists = news.length > 0
        ? news.map((newsItem, index) => {
            return (
                <section key={index}>
                    <Link to={`/details/${newsItem.uniquekey}`}>
                        <div className="mobile_img">
                            <img src={newsItem.thumbnail_pic_s} alt=""/>
                        </div>
                        <div className="mobile_list_content">
                            <h4 className="mobile_list_title">{newsItem.title}</h4>
                            <div className="mobile_list_desc">
                                <span>{newsItem.realtype}</span>
                                <span>{newsItem.date}</span>
                            </div>
                        </div>
                    </Link>
                </section>
            )
        })
        : '没有加载到任何新闻';
        return (
            <Row className="moblie_list">
                <Col span={24}>
                    
                    <Router>
                        <div className="mobile_list_item">
                            {newsLists}
                        </div>
                    </Router>
                </Col>
            </Row>
        )
    }
}

export default MobileList;