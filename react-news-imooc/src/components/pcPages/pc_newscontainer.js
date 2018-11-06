import React from 'react';
import {Row, Col, Carousel, Tabs} from 'antd';

import PCNewsBlock from './pc_news_block';
import PCNewsImgBlock from './pc_news_image_block';

const TabPane = Tabs.TabPane;

const carouselImg1 = require('../../assets/images/carousel_1.jpg');
const carouselImg2 = require('../../assets/images/carousel_2.jpg');
const carouselImg3 = require('../../assets/images/carousel_3.jpg');
const carouselImg4 = require('../../assets/images/carousel_4.jpg');


class PCNewsContainer extends React.Component{
    render(){
        const settings = {
            dots:true,
            infinite:true,
            speed: 500,
            slidesToShow:1,
            autoplay:true
        };
        return (
            <Row>
                <Col span={2}></Col>
                <Col span={20} className="contentContainer">
                    <Row>
                        <Col span={7} className="leftContainer">
                            <div className="carousel">
                                <Carousel {...settings}>
                                    <div><img src={carouselImg1} alt="轮播1"/></div>
                                    <div><img src={carouselImg2} alt="轮播2"/></div>
                                    <div><img src={carouselImg3} alt="轮播3"/></div>
                                    <div><img src={carouselImg4} alt="轮播4"/></div>
                                </Carousel>
                            </div>
                            <PCNewsImgBlock count="6" cartTitle="头条新闻" type="top" width="400px" imageWidth="112px"></PCNewsImgBlock>
                        </Col>
                        <Col span={10}>
                            <Tabs className="tabsNews">
                                <TabPane tab="头条新闻" key="1">
                                    <PCNewsBlock count={20} type="top" width="100%"></PCNewsBlock>
                                </TabPane>
                                <TabPane tab="社会" key="2">
                                    <PCNewsBlock count={20} type="shehui" width="100%"></PCNewsBlock>
                                </TabPane>
                                <TabPane tab="娱乐新闻" key="3">
                                    <PCNewsBlock count={20} type="yule" width="100%"></PCNewsBlock>
                                </TabPane>
                                <TabPane tab="体育新闻" key="4">
                                    <PCNewsBlock count={20} type="tiyu" width="100%"></PCNewsBlock>
                                </TabPane>
                            </Tabs>
                        </Col>
                        <Col span={7}></Col>
                    </Row>
                    <PCNewsImgBlock count="8" cartTitle="国内新闻" type="guonei" width="100%" imageWidth="112px"></PCNewsImgBlock>
                    <PCNewsImgBlock count="16" cartTitle="娱乐" type="yule" width="100%" imageWidth="112px"></PCNewsImgBlock>
                </Col>
                <Col span={2}></Col>
            </Row>
        )
    }
}

export default PCNewsContainer;