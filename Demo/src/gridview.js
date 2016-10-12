import React, { Component  } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  ListView,
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
  Navigator,
  RefreshControl,
  PropTypes,
  ToastAndroid,
  ToolbarAndroid,
  TouchableWithoutFeedback,
  ProgressBarAndroid,
  DrawerLayoutAndroid,
  Alert,
  Animated,
  Button,
  Easing,
  BackAndroid,
  Dimensions
} from 'react-native';
var deviceWidth = Dimensions.get('window').width;
var URL = 'http://www.tngou.net/tnfs/api/list?id=2' ;
var PAGE = 1;
var PAGESIZE = 15 ;
var IMAGE_URL = 'http://tnfs.tngou.net/image';
var totalList = new Array();
var pageParam = function(){
  return URL+ '&page='+PAGE+'&rows='+PAGESIZE;
} 
var GridView = React.createClass({
    getInitialState:function () {
    return{
       rotateValue: new Animated.Value(0),
       isRefreshing: false,
       dataSource :new ListView.DataSource({rowHasChanged:(r1,r2) => r1!==r2}),
       loaded:false,
    };
  },
  componentWillMount:function () {
        this.fetchData();
  },
  fetchData:function () {
    fetch(pageParam()).then((response)=>response.json())
    .then((responseData)=>{
        let list = responseData.tngou;
        for (var i=0; i <list.length; i++) {
            totalList.push( list[i] );
        }
        this.setState({
          isRefreshing: false,
          dataSource:this.state.dataSource.cloneWithRows(totalList),
          loaded : true ,
        });
    }).catch((error) => {
        ()=>ToastAndroid.show('出错了',ToastAndroid.SHORT);
      }).done();
  },
  render:function () {
    if(!this.state.loaded){
      return this.renderLoadingView();
    }
    return(
       <View style={{flex:1}}>
          <ToolbarAndroid
              title={'图库'}
              titleColor="white"
              style={st.toolbar}
              onIconClicked={() => this.drawer.openDrawer()}
              // navIcon={require('../images/menu.png')}
              onIconClicked={this._back}
              />
          <ListView
            dataSource = {this.state.dataSource}
            renderRow = {this.renderImage}
            contentContainerStyle={st.grid}  
            pageSize={3}
            onEndReached = {this._onEndReached}
            renderFooter = {this.listFooter}
            refreshControl={<RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={this._onRefresh}
              tintColor="#ff0000"
              title="Loading..."
              titleColor="#00ff00"
              colors={['#ff0000', '#00ff00', '#0000ff']}
              progressBackgroundColor="#ffffff"/>}
          />
       </View>
    );
  },
startAnimation() {
this.state.rotateValue.setValue(0);
Animated.timing(this.state.rotateValue, {
    toValue: 1,
    duration: 800,
    easing: Easing.linear
}).start(() => this.startAnimation());
},
renderLoadingView:function () {
    return(
    <View style={{flex:1}}>
    <ToolbarAndroid
        title={'图库'}
        titleColor="white"
        style={st.toolbar}
        />
        <View style={st.container}>
        <Animated.Image 
            source={require('../images/loading.png')}
            style={[st.loadingImgae, {
                    transform: [{
                        rotateZ: this.state.rotateValue.interpolate({
                            inputRange: [0,1],
                            outputRange: ['0deg', '360deg']
                        })
                    }]
                }]}>
        </Animated.Image>
        <Text>正在加载数据...</Text>

        </View>
    </View>
    );
},
_onRefresh() {
     this.setState({isRefreshing: true});
    setTimeout(() => {
      PAGE = 1 ;
      totalList.length=0;
      this.fetchData();
    }, 2000);
  },
  listFooter :function(){
      return(
          <View style={{backgroundColor:'#ffffff',width:deviceWidth,height:60,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
            <Animated.Image 
              source={require('../images/loading.png')}
              style={[st.loadMoreImgae, {
                      transform: [{
                          rotateZ: this.state.rotateValue.interpolate({
                              inputRange: [0,1],
                              outputRange: ['0deg', '360deg']
                          })
                      }]
                  }]}>
            </Animated.Image>
            <Text style={{color:'#000000',fontSize :16,textAlign:'center'}}>数据正在加载中...</Text>
         </View>
      );
  },
 _onEndReached:function(){
      setTimeout(
      ()=>{
        PAGE++ ;
        this.fetchData();
      },1000);
  },
renderImage :function (image) {
    return (
        <TouchableWithoutFeedback onPress={() =>ToastAndroid.show(image.img, ToastAndroid.SHORT)} >
            <Image source={{uri:IMAGE_URL+image.img}} resizeMode={'contain'} style={st.itemLayout}/>
        </TouchableWithoutFeedback>
    );
  }

});

const st = StyleSheet.create({
  list:{
    flex:1,
    justifyContent:'center',
    flexWrap: 'wrap',
    width:require('Dimensions').get('window').width,
  },
  baseText: {
      fontFamily: 'Cochin',
      color: 'white'
    },
  titleText: {
      marginLeft:5,
      marginTop:10,
      color: '#333333',
      fontSize: 20,
      fontWeight: 'bold',
    },
  container: {
    flexDirection: 'column',
    backgroundColor: '#F6F6F6',
    flex: 1,
    alignItems: 'center',
    justifyContent:'center'
  },
  Itemcontainer:{
    flexDirection: 'row',
    backgroundColor: '#F6F6F6',
    flex: 1,
    paddingTop:5,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  loadingImgae:{
    width:50,
    height:50,
  },
  loadMoreImgae:{
    width:20,
    height:20,
    margin:10,
  },
  image: {
    flex: 1,
    width: 450, 
    height: 330
  },
  page: {
    width: deviceWidth,
    flex:1
  },
  toolbar: { 
    backgroundColor: '#070e37', 
    height: 56, 
  },
  grid: {  
       justifyContent: 'space-around',  
       flexDirection: 'row',  
       flexWrap: 'wrap'  
     },  
   itemLayout:{  
       flex:1,  
       width:deviceWidth/3,  
       height:deviceWidth/3,  
       alignItems:'center',  
       justifyContent:'center',  
       borderWidth: 1,  
       borderColor: '#eaeaea'  
     },  
  
});
export default GridView;