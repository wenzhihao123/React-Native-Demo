/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component  } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  DrawerLayoutAndroid,
  TouchableOpacity,
  Navigator,
  ToolbarAndroid,
  TextInput
} from 'react-native';
import BreadNav from './BreadNav';
import Home from './homePage';
class Index extends Component{
    constructor(props) {
		super(props);
		this.state = {
			name: null,
		}
    }
  _jumpButton() {
          const { navigator } = this.props;
          //为什么这里可以取得 props.navigator?请看上文:
          //<Component {...route.params} navigator={navigator} />
          //这里传递了navigator作为props
          if(navigator) {
              navigator.push({
                  name: 'Home',
                  component: Home,
              })
          }
    }
    
   render(){
       var navigationView = (  
          <View style={{flex: 1, backgroundColor: '#fff'}}>  
            <View style={{backgroundColor:'#00bb9c',height:200}}/>
            <Text style={{margin: 10, fontSize: 15, textAlign: 'left'}}>java</Text>  
            <Text style={{margin: 10, fontSize: 15, textAlign: 'left'}}>C</Text>  
          </View>  
        
        );  
        return(
          <DrawerLayoutAndroid
                    ref={(drawer) => { this.drawer = drawer; }}
                    drawerWidth={300}
                    drawerPosition={DrawerLayoutAndroid.positions.Left}
                    renderNavigationView={() => navigationView}>
              <View>
                  <ToolbarAndroid
                    title={'首页'}
                    titleColor="white"
                    navIcon={require('../images/menu.png')}
                    style={styles.toolbar}
                    onIconClicked={() => this.drawer.openDrawer()}
                    onActionSelected={this.onActionSelected}
                    />
                  <View style={{flex:1,flexDirection: 'row',justifyContent:'space-around',height:100}}>
                      <TouchableOpacity onPress={this._jumpButton.bind(this)}>
                        <BreadNav name="导航1" img={require('../images/ic_health_acknoledge.png')}/>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => this.drawer.openDrawer()}>
                        <BreadNav name="导航2" img={require('../images/ic_health_ask.png')}/>
                      </TouchableOpacity>
                      <TouchableOpacity >
                        <BreadNav name="导航3" img={require('../images/ic_health_sp.png')}/>
                      </TouchableOpacity>
                      <TouchableOpacity >
                        <BreadNav name="导航4" img={require('../images/ic_health_food.png')}/>
                      </TouchableOpacity>
                  </View>
                  <TextInput
                        value={this.state.name}
                        onChangeText={name => this.setState({ name })}
                        placeholder={'输入用户名'}
                        style={{ margin:10,height: 60, flex:1,backgroundColor:'#e9e9e9'}} />
            </View>
          </DrawerLayoutAndroid>
        );
    }
}
class Demo extends Component {
  render() {
    let defaultName = 'Index' ;
    let defaultComponent = Index;
    return (
        <Navigator 
            initialRoute={{name:defaultName,component:defaultComponent}}
            configureScene={
            (route)=>{
                return Navigator.SceneConfigs.FloatFromRight ;
              }
            }
            renderScene={
              (route,navigator)=>{
                let Component = route.component ;
                return <Component {...route.params} navigator={navigator} />
              }
            }
        /> 
    )
  }
}
var styles = StyleSheet.create({ toolbar: { backgroundColor: '#070e37', height: 56, }});
module.exports = Demo;
