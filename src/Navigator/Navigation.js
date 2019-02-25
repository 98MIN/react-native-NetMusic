import {createAppContainer,createMaterialTopTabNavigator } from 'react-navigation'
import Home from '../components/Home'
import Mine from '../components/Mine'
import React,{Component} from 'react'

const navigationConfig = createMaterialTopTabNavigator ({
  个性推荐 :{
    screen:Home,
    navigationOptions: {
      tabBarColor: '#3472EE', // 页面背景色
    }
  },
  歌单:{
    screen:Mine,
    navigationOptions: {
      tabBarColor: '#3472EE', // 页面背景色
    }
  },
  主播电台 :{
    screen:Home,
    navigationOptions: {
      tabBarColor: '#3472EE', // 页面背景色
    }
  },
  排行榜:{
    screen:Mine,
    navigationOptions: {
      tabBarColor: '#3472EE', // 页面背景色
    }
  }
},{
  initialRouteName:"个性推荐",
  tabBarOptions: {
    scrollEnabled: false,   //
    upperCaseLabel: true, // 是否大写
    activeTintColor: 'red', // 活动选项卡
    inactiveTintColor: 'gray', // "非活动" 选项卡
    style: {
      backgroundColor: 'white' // 头部导航栏样式
    },
    indicatorStyle: {
      backgroundColor: 'red' // 指示器样式
    }
  }
})

const AppContainer = createAppContainer(navigationConfig)

class Navigation extends Component {

  render() {
    return (
      <AppContainer/>
    );
  }
}

export default Navigation;

