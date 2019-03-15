const Mock = require('mockjs');
//格式： Mock.mock( url, post/get , 返回的数据)；
import {
    hotList,
    commingSoonList,
    historyList
} from './json/movies'
Mock.mock('/hotList', 'post', hotList);
Mock.mock('/commingSoonList', 'post', commingSoonList);
Mock.mock('/historyList', 'post', historyList);
// Mock.mock('/home/banner', 'get', require('./json/homeBanner'));