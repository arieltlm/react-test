import React from 'react';
import { Tabs, Carousel } from 'antd';


import MobileHeader from './mobile_header';
import MobileFooter from './mobile_footer';
import MobileList from './mobile_list';


const carouselImg1 = require('../../assets/images/carousel_1.jpg');
const carouselImg2 = require('../../assets/images/carousel_2.jpg');
const carouselImg3 = require('../../assets/images/carousel_3.jpg');
const carouselImg4 = require('../../assets/images/carousel_4.jpg');

const TabPane = Tabs.TabPane;


export default class MobileIndex extends React.Component {
    render () {
        const settings = {
            dots:true,
            infinite:true,
            speed: 500,
            slidesToShow:1,
            autoplay:true
        };
        return (
            <div className="mobile-page">
                <MobileHeader></MobileHeader>
                <Tabs defaultActiveKey="1">
                    <TabPane tab="头条" key="1">
                        <Carousel {...settings} className="mobile_carousel">
                            <div><img src={carouselImg1} alt="轮播1"/></div>
                            <div><img src={carouselImg2} alt="轮播2"/></div>
                            <div><img src={carouselImg3} alt="轮播3"/></div>
                            <div><img src={carouselImg4} alt="轮播4"/></div>
                        </Carousel>
                        <MobileList type="top" count="20"></MobileList>
                    </TabPane>
                    <TabPane tab="社会" key="2">
                        <MobileList type="shehui" count="20"></MobileList>
                    </TabPane>
                    <TabPane tab="国内" key="3">
                        <MobileList type="guonei" count="20"></MobileList>
                    </TabPane>
                    <TabPane tab="娱乐" key="4">
                        <MobileList type="yule" count="20"></MobileList>
                    </TabPane>
                    <TabPane tab="体育" key="5">
                        <MobileList type="tiyu" count="20"></MobileList>
                    </TabPane>
                    <TabPane tab="科技" key="6">
                        <MobileList type="keji" count="20"></MobileList>
                    </TabPane>
                    <TabPane tab="时尚" key="7">
                        <MobileList type="shishang" count="20"></MobileList>
                    </TabPane>
                </Tabs>
                <MobileFooter></MobileFooter>
            </div>
        );
    }
}