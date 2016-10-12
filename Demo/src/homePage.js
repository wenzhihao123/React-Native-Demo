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
import BackView from './BackView';
import BreadNav from './BreadNav';
import ViewPager from 'react-native-viewpager';
// import ViewPager from './viewpager';
var deviceWidth = Dimensions.get('window').width;
var URL = 'http://www.tngou.net/api/cook/list?id=1' ;
var PAGE = 1 ;
var PAGESIZE = 5 ;
var IMAGE_URL = 'http://tnfs.tngou.net/image';
var totalList = new Array();
var pageParam = function(){
  return URL+ '&page='+PAGE+'&rows='+PAGESIZE;
} 
var IMGS = [
  'https://images.unsplash.com/photo-1441742917377-57f78ee0e582?h=1024',
  'https://images.unsplash.com/photo-1441716844725-09cedc13a4e7?h=1024',
  'https://images.unsplash.com/photo-1441448770220-76743f9e6af6?h=1024',
  'https://images.unsplash.com/photo-1441260038675-7329ab4cc264?h=1024',
  'https://images.unsplash.com/photo-1441126270775-739547c8680c?h=1024',
  'https://images.unsplash.com/photo-1440964829947-ca3277bd37f8?h=1024',
  'https://images.unsplash.com/photo-1440847899694-90043f91c7f9?h=1024'
];
var Home = React.createClass({
  getInitialState:function () {
    var vdataSource = new ViewPager.DataSource({
      pageHasChanged: (p1, p2) => p1 !== p2,
    });
    return{
       navigator:this.props,
       rotateValue: new Animated.Value(0),
       isRefreshing: false,
       dataSource :new ListView.DataSource({rowHasChanged:(r1,r2) => r1!==r2}),
       loaded:false,
       progress: 0,
       vdataSource: vdataSource.cloneWithPages(IMGS),
    };
  },
  componentWillMount:function () {
        this.startAnimation();
        this.fetchData();
  },
  // componentDidMount:function () {
  //       this.startAnimation();
  //       this.fetchData();
  // },
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
  _onRefresh() {
     this.setState({isRefreshing: true});
    setTimeout(() => {
      PAGE = 1 ;
      totalList.length=0;
      this.fetchData();
    }, 2000);
  },
  _back() {
    // ()=>ToastAndroid.show('出错了',ToastAndroid.SHORT);
      const { navigator } = this.props;
      if(navigator) {
          //很熟悉吧，入栈出栈~ 把当前的页面pop掉，这里就返回到了上一个页面:FirstPageComponent了
          navigator.pop();
      }
   },
  render:function () {
    if(!this.state.loaded){
      return this.renderLoadingView();
    }
    var navigationView = (  
        <View style={{flex: 1, backgroundColor: '#fff'}}>  
          <Image style={{height:250}} source={{uri:'http://pic.pp3.cn/uploads//201608/2016082613.jpg'}}/>
            <View style={{justifyContent: 'space-around',alignItems: 'center',backgroundColor: '#fff',flexDirection:'row',height:60}}>  
              <Image style={{width:20,height:20,margin: 10}} source={require('../images/setting.png')}/>
              <Text style={{margin: 10,flex:1, fontSize: 16, textAlign: 'left'}}>去设置</Text>  
            </View>
            <View style={{justifyContent: 'space-around',alignItems: 'center',backgroundColor: '#fff',flexDirection:'row',height:60}}>  
              <Image style={{width:20,height:20,margin: 10}} source={require('../images/suggest.png')}/>
              <Text style={{margin: 10,flex:1, fontSize: 16, textAlign: 'left'}}>意见反馈</Text>  
            </View>
            <View style={{justifyContent: 'space-around',alignItems: 'center',backgroundColor: '#fff',flexDirection:'row',height:60}}>  
              <Image style={{width:20,height:20,margin: 10}} source={require('../images/about.png')}/>
              <Text style={{margin: 10,flex:1, fontSize: 16, textAlign: 'left'}}>关于</Text>  
            </View>
        </View>  
      );  
    return(
      <DrawerLayoutAndroid
                        ref={(drawer) => { this.drawer = drawer; }}
                        drawerWidth={300}
                        drawerPosition={DrawerLayoutAndroid.positions.Left}
                        renderNavigationView={() => navigationView}>
       <View style={{flex:1}}>
          <ToolbarAndroid
              title={'首页'}
              titleColor="white"
              style={st.toolbar}
              onIconClicked={() => this.drawer.openDrawer()}
              // navIcon={require('../images/menu.png')}
              onIconClicked={this._back}
              />
          <ListView
            dataSource = {this.state.dataSource}
            renderRow = {this.renderCook}
            pageSize={PAGESIZE}
            onEndReached = {this._onEndReached}
            renderHeader = {this.listHeader}
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
      </DrawerLayoutAndroid>
    );
  },
  _onEndReached:function(){
      setTimeout(
      ()=>{
        PAGE++ ;
        this.fetchData();
      },1000);
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
          title={'首页'}
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
  listHeader:function () {
      return(
        <View style={{height:350}}>
          <ViewPager
            style={{justifyContent:'center',height:250,flex:1}}
            dataSource={this.state.vdataSource}
            renderPage={this._renderPage}
            isLoop={true}
            autoPlay={true}/>
          <View style={{flexDirection: 'row',justifyContent:'space-around',height:100}}>
              <TouchableOpacity onPress={this._back}>
                <BreadNav name="导航1" img={require('../images/ic_health_acknoledge.png')}/>
              </TouchableOpacity>
              <TouchableOpacity>
                <BreadNav name="导航2" img={require('../images/ic_health_ask.png')}/>
              </TouchableOpacity>
              <TouchableOpacity >
                <BreadNav name="导航3" img={require('../images/ic_health_sp.png')}/>
              </TouchableOpacity>
              <TouchableOpacity >
                <BreadNav name="导航4" img={require('../images/ic_health_food.png')}/>
              </TouchableOpacity>
          </View>
        </View>
    );
  },
  _renderPage: function(data,pageID) {
      return (
        <View style={{alignItems: 'center', justifyContent: 'center', flex:1}} collapsable={false}>
          <Image  source={{uri: data}} style={st.image} resizeMode={'contain'}/>
        </View>
      );
  },
  listFooter :function(){
      return(
          <View style={{backgroundColor:'#ffffff',height:60,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
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
  //Alert.alert(cook.name, cook.description)}
  renderCook :function (cook) {
    return (
        <TouchableWithoutFeedback onPress={() =>ToastAndroid.show(cook.name, ToastAndroid.SHORT)} >
          <View style={st.Itemcontainer}>
            <Image source={{uri:IMAGE_URL+cook.img}} style={{height:150,flex:1}}/>
            <View style={{backgroundColor: 'white',flexDirection:'column',flex:1,height:150}}>
                <Text style={st.titleText} onPress={this.onPressTitle}>
                  {cook.name}
                </Text>
                <Text style={{flex:1,color:'#333333',padding:5}} numberOfLines={5}>
                  {cook.description}
                </Text>

            </View>
         </View>
        </TouchableWithoutFeedback>

    );
  }
    
  
});
// BackAndroid.addEventListener('hardwareBackPress', function() {
//       const { navigator } = this.props;
//         if(navigator) {
//             //很熟悉吧，入栈出栈~ 把当前的页面pop掉，这里就返回到了上一个页面:FirstPageComponent了
//             navigator.pop();
//         }
//       return true ;
// });
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
  }
  
});

export default Home;
