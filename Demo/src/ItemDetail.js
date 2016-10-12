import React, { Component  } from 'react';
import {
  AppRegistry,
  View,
  Navigator,
  Text,
  StyleSheet
} from 'react-native';
import MainPage from './mainPage';
import BackView from './BackView';
var FeedView = React.createClass({
    goBack(){
      this.props.navigator.push({name:"default"});
    },

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome} onPress={this.goBack} >
                   I am Feed View! Tab to  default  view!
                </Text>
            </View>  
        )
    }
});


var WelcomeView = React.createClass({
    onPressFeed() {
        this.props.navigator.push({name: 'feed'});
    },
    render() {
       console.log("welcome view loaded...")
        return (
            <View style={styles.container}>
                <Text style={styles.welcome} onPress={this.onPressFeed} >
                    This is welcome view.Tap to go to feed view.
                </Text>
            </View>
        );
    }

});

var DefaultView = React.createClass({

    render(){
      return (
          <View style={styles.container}>
              <Text style={styles.welcome}>Default view</Text>
          </View>
      )
    }
});


var SampleApp = React.createClass({

    configureScene(route){
      return Navigator.SceneConfigs.FloatFromRight;
    },

    renderScene(router, navigator){
      var Component = router.component;
      this._navigator = navigator;
      switch(router.name){
        case "welcome":
          Component = WelcomeView;
          break;
        case "feed":
          Component = BackView;
          break;
        case "mainPage":
          Component = MainPage;
          break;
        default: //default view
          Component = DefaultView;
      }

      return <Component navigator={navigator} />
    },

    render() {
        return (
            <Navigator
                initialRoute={{name: 'welcome'}}
                configureScene={this.configureScene}
                renderScene={this.renderScene} />
        );
    }

});



var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 30,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

module.exports = SampleApp;
