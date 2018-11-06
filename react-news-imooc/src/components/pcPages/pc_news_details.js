import React from 'react';
import {Row, Col, BackTop} from 'antd';

import {PCHeader} from './pc_header';
import PCFooter from './pc_footer';
import PCNewsImgBlock from './pc_news_image_block';



class PCNewsDetails extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            newsItem: '',
            newsKind: [
                {"头条": 'top'},
                {"社会": 'shehui'},
                {"国内": 'guonei'},
                {"娱乐": 'yule'},
                {"科技": 'keji'},
                {"时尚": 'shishang'}
            ],
            thisNewsKinds: 'top'
        }
    }
    componentWillMount () {
        const myFetchOptions = {
            methods: 'GET'
        };
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey="+ this.props.match.params.uniquekey, myFetchOptions)
        .then(response => response.json())
        .then(json => {
            this.setState({
                newsItem: json,
                thisNewsKinds: this.state.newsKind[json.realtype]
            })
            document.title = json.title + " - React News";
        });
    }
    createMarkup () {
        return {
            __html: this.state.newsItem.pagecontent
        }
    }
    render() {
        return (
            <div>
                <PCHeader />
                <Row>
                    <Col span={2}></Col>
                    <Col span={14}>
                        <div className="articleContainer" dangerouslySetInnerHTML={this.createMarkup()}></div>
                    </Col>
                    <Col span={6}>
                        <PCNewsImgBlock count="21" cartTitle={this.state.newsItem.realtype} type={this.state.thisNewsKinds} width="100%" imageWidth="112px"></PCNewsImgBlock>
                    </Col>
                    <Col span={2}></Col>
                </Row>
                <PCFooter />
                <BackTop></BackTop>
            </div>
           
        )
    }
}

export default PCNewsDetails;