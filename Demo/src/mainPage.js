import React, { Component  } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    Image,
    Dimensions,
    Navigator,
    TouchableOpacity,
    BackAndroid,
    DrawerLayoutAndroid,
    ToastAndroid,
    WebView,
    Platform,
    View
} from 'react-native';
import Home from './homePage';
import SampleApp from './ItemDetail' ;
import TabNavigator from 'react-native-tab-navigator';
import GridView from './gridview';
import PersonInfo from './personInfo' ;
class MainPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab:'首页',
        };
    }
    render() {
        let defaultName = 'MainPage' ;
        let defaultComponent = MainPage;
        return (
                <View style={styles.container} > 
                    <TabNavigator>
                        <TabNavigator.Item
                            selected={this.state.selectedTab === '首页'}
                            title="首页"
                            titleStyle={styles.tabText}
                            selectedTitleStyle={styles.selectedTabText}
                            renderIcon={() => <Image style={styles.icon} source={require("../images/home_unselect.png") } />}
                            renderSelectedIcon={() => <Image style={styles.icon} source={require("../images/home_select.png") } />}
                            onPress={() => this.setState({ selectedTab: '首页' }) }>
                            <Home/>
                        </TabNavigator.Item>
                        <TabNavigator.Item
                            selected={this.state.selectedTab === '图库'}
                            title="图库"
                            titleStyle={styles.tabText}
                            selectedTitleStyle={styles.selectedTabText}
                            renderIcon={() => <Image style={styles.icon} source={require("../images/my_unselect.png") } />}
                            renderSelectedIcon={() => <Image style={styles.icon} source={require("../images/my_select.png") } />}
                            onPress={() => this.setState({ selectedTab: '图库' }) }>
                            <GridView/>
                        </TabNavigator.Item>
                        <TabNavigator.Item
                            selected={this.state.selectedTab === '联系人'}
                            title="联系人"
                            titleStyle={styles.tabText}
                            selectedTitleStyle={styles.selectedTabText}
                            renderIcon={() => <Image style={styles.icon} source={require("../images/my_unselect.png") } />}
                            renderSelectedIcon={() => <Image style={styles.icon} source={require("../images/my_select.png") } />}
                            onPress={() => this.setState({ selectedTab: '联系人' })}>
                            <PersonInfo/>
                        </TabNavigator.Item>
                    </TabNavigator>
            </View>
            
        );
    }
}

let styles = StyleSheet.create({
    container: {
        flex: 1
    },
    tabText: {
        color: "#000000",
        fontSize: 13
    },
    selectedTabText: {
        color: "#999999",
        fontSize: 13
    },
    icon: {
        width: 20,
        height: 20
    }
});

module.exports = MainPage;