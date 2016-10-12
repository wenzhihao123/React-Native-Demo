'use strict';

var React = require('react-native');

var {
  StyleSheet,
} = React;

var styles = StyleSheet.create({
  buttons: {
    flexDirection: 'row',
    height: 40,
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  // 按钮可点击状态
  button: {
    flex: 1,
    width: 0,
    margin: 2,
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: 'gray',
  },

  // 按钮非点击装
  buttonDisabled: {
    backgroundColor: 'black',
    opacity: 0.5,
  },

  buttonText: {
    fontSize: 12,
    color: 'white',
    textAlign: 'center',
  },

  // 文字显示
  nameText: {
    fontSize: 16,
    margin: 4,
    color: 'white',
    textAlign: 'center',
  },

  image: {
    flex: 1,
    width: 450, 
    height: 330
  },

  likeButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderColor: '#333333',
    borderWidth: 1,
    borderRadius: 5,
    flex: 1,
    margin: 8,
    padding: 8,
  },

  likeContainer: {
    flexDirection: 'row',
  },

  likesText: {
    flex: 1,
    fontSize: 18,
    alignSelf: 'center',
  },

  progressBarContainer: {
    height: 10,
    margin: 5,
    borderColor: '#eeeeee',
    borderWidth: 2,
  },

  progressBar: {
    alignSelf: 'flex-start',
    flex: 1,
    backgroundColor: '#eeeeee',
  },

  viewPager: {
    flex: 1,
    justifyContent:'center'
  },
});

module.exports = styles;