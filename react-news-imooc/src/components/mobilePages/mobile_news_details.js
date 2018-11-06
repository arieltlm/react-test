import React from 'react';
import { Row, Col, BackTop } from 'antd';


import MobileHeader from './mobile_header';
import MobileFooter from './mobile_footer';


class MobileNewsDetails extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            newsItem: '',
        }
    }

    componentWillMount() {
        const myFetchOptions = {
            methods: 'GET'
        };
        fetch(`http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=${  this.props.match.params.uniquekey}`, myFetchOptions)
            .then(response => response.json())
            .then((json) => {
                this.setState({
                    newsItem: json
                })
                document.title = `${json.title} - React News`;
            });
    }

    createMarkup() {
        return {
            __html: this.state.newsItem.pagecontent
        }
    }

    render() {
        return (
            <div className="mobileDetailsContainer">
                <MobileHeader />
                <Row>
                    <Col span={24}>
                        <div className="articleContainer" dangerouslySetInnerHTML={this.createMarkup()} />
                    </Col>
                </Row>
                <MobileFooter />
                <BackTop />
            </div>
           
        )
    }
}
MobileNewsDetails.prototype = {

}
export default MobileNewsDetails;
