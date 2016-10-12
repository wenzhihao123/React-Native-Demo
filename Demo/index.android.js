var React = require('react-native');

var {
  AppRegistry,
} = React;

var MainPage = require('./src/mainPage')

AppRegistry.registerComponent('Demo', () => MainPage);