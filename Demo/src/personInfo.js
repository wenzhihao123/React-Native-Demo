import React, { Component  } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';

var PersonInfo = React.createClass({
    render:function(){
        return (
             <View style={{flex: 1, backgroundColor: '#e9e9e9'}}>  
                    <Image style={{height:250}} source={{uri:'http://pic.pp3.cn/uploads//201608/2016082613.jpg'}}/>
                    <View style={{justifyContent: 'space-around',alignItems: 'center',backgroundColor: '#fff',flexDirection:'row',height:60,marginTop:10}}>  
                        <Image style={{width:20,height:20,margin: 10}} source={require('../images/setting.png')}/>
                        <Text style={{margin: 10,flex:1, fontSize: 16, textAlign: 'left'}}>去设置</Text>  
                    </View> 
                    <View style={{height:1,backgroundColor:'#e9e9e9'}}/>
                    <View style={{justifyContent: 'space-around',alignItems: 'center',backgroundColor: '#fff',flexDirection:'row',height:60}}>  
                        <Image style={{width:20,height:20,margin: 10}} source={require('../images/suggest.png')}/>
                        <Text style={{margin: 10,flex:1, fontSize: 16, textAlign: 'left'}}>意见反馈</Text>  
                    </View>
                    <View style={{height:1,backgroundColor:'#e9e9e9'}}/>
                    <View style={{justifyContent: 'space-around',alignItems: 'center',backgroundColor: '#fff',flexDirection:'row',height:60}}>  
                        <Image style={{width:20,height:20,margin: 10}} source={require('../images/about.png')}/>
                        <Text style={{margin: 10,flex:1, fontSize: 16, textAlign: 'left'}}>关于</Text>  
                    </View>
              </View>  
        );
    }

});
export default PersonInfo;