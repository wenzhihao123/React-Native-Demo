import React, { Component  } from 'react';
import {
  View,
  Text,
  Image,
  TouchableNativeFeedback, // 触碰响应
  TouchableOpacity, // 触碰更换透明度的属性
  ViewPagerAndroid, // Android的ViewPager
} from 'react-native';
// Styles
var styles = require('./styles');

var PAGES = 3; // 页数

// 颜色
var BGCOLOR = ['#8ad3da', '#eecde2', '#e682b4'];

// 本地图片地址
var IMAGE_URIS = [
    'http://pic.pp3.cn/uploads//201508/2015090107.jpg',
  'http://photo.enterdesk.com/2011-6-21/enterdesk.com-1FAA1F678A8858936AD7705ABC27A3C9.jpg',
  'http://photo.enterdesk.com/2011-5-18/enterdesk.com-7F45BD72B485F0C64C30D36223F998E4.jpg',

];

var ViewPagerModule = React.createClass({

  /**
  * 初始化状态
  * @return {状态} [页面]
  */
  getInitialState: function() {
    return {
      page: 0, // 当前位置
      progress: { // Progress位置
        position: 0,
        offset: 0,
      }
    };
  },
  // 页面选择
  onPageSelected: function(e) {
    this.setState({page: e.nativeEvent.position});
  },

  // 页面滚动
  onPageScroll: function(e) {
    this.setState({progress: e.nativeEvent});
  },

  // 移动页面
  move: function(delta) {
    var page = this.state.page + delta;
    this.go(page);
  },

  // 跳转页面
  go: function(page) {
    this.viewPage.setPage(page);
    this.setState({page});
  },

  render: function() {
    var pages = [];

    for (var i=0; i<PAGES; i++) {
      // 背景
      var pageStyle = {
        backgroundColor: BGCOLOR[i % BGCOLOR.length],
        alignItems: 'center',
        justifyContent: 'center',
        padding: 0,
      }

      pages.push(
        <View key={i} style={pageStyle} collapsable={false}>
          <Image style={styles.image} resizeMode={'stretch'} source={{uri:IMAGE_URIS[i%PAGES]}} />
        </View>
      );
    }
    var {page} = this.state;
    return (
      <View style={{height:280,backgroundColor:'#ffffff',position:'relative'}}>
        <ViewPagerAndroid
          style={styles.viewPager}
          initialPage={0}
          onPageScroll={this.onPageScroll}
          onPageSelected={this.onPageSelected}
          ref={viewPager => {this.viewPage = viewPager;}}>
          {pages}
        </ViewPagerAndroid>
        <Text style={{fontSize:14,color:'white',marginTop:-40,textAlign:'right',marginRight:10}}>
            页 {page+1} / {PAGES}
        </Text>
      </View>
    );
  },
});

module.exports = ViewPagerModule;