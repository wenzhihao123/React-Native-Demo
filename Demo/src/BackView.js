import React, { Component  } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';
// export default BackView;
import mainPage from './mainPage';
export default  class BackView extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    _pressButton() {
        const { navigator } = this.props;
        //为什么这里可以取得 props.navigator?请看上文:
        //<Component {...route.params} navigator={navigator} />
        //这里传递了navigator作为props
        if(navigator) {
            navigator.push({
                name: 'mainPage',
                component: mainPage,
            })
        }
    }
//    _pressButton() {
//         const { navigator } = this.props;
//         if(navigator) {
//             //很熟悉吧，入栈出栈~ 把当前的页面pop掉，这里就返回到了上一个页面:FirstPageComponent了
//             navigator.pop();
//         }
//     }
    render(){
        return(
              <TouchableOpacity onPress={this._pressButton.bind(this)}>
                <View style={{backgroundColor:'#ffffff',height:60,flexDirection:'row',alignItems:'center'}} >
                        <Image source={require('../images/back.png')} style={{width:20,height:20,margin: 10}}/>
                        <Text style={{color:'#000000',fontSize :16,textAlign:'center'}}>{this.props.name}</Text>
                </View>
              </TouchableOpacity>
        );
    }
}

