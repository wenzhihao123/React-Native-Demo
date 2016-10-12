import React, { Component  } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
class BreadNav extends Component {
    render(){
       var img=this.props.img;
        return(
            <View style={{height:100,flexDirection:'column',alignItems:'center',flex:1,padding:10}}>
                <Image source={img} style={{width:60,height:60}}/>
                <Text style={{color:'#000000',fontSize :13,textAlign:'center'}}>{this.props.name}</Text>
            </View>
        );
    }
}
export default BreadNav;