import {
    createAppContainer,
    createMaterialTopTabNavigator,
    createBottomTabNavigator
} from 'react-navigation'
import { StyleSheet} from 'react-native'
import Icon from "react-native-vector-icons/Feather"
import Personality from '../components/Personality/Personality'
import SongsList from '../components/SongsList/SongsList'
import AnchorRadio from '../components/AnchorRadio/AnchorRadio'
import Leaderboard from '../components/Leaderboard/Leaderboard'
import React, { Component } from 'react'

const BottomMater = createMaterialTopTabNavigator({
  个性推荐: {
      screen: Personality,
      navigationOptions: {
          tabBarColor: '#3472EE',
      }
  },
  歌单: {
      screen: SongsList,
      navigationOptions: {
          tabBarColor: '#3472EE',
      }
  },
  主播电台: {
      screen: AnchorRadio,
      navigationOptions: {
          tabBarColor: '#3472EE',
      }
  },
  排行榜: {
      screen: Leaderboard,
      navigationOptions: {
          tabBarColor: '#3472EE',
      }
  }
}, {
    initialRouteName: "个性推荐",
    tabBarOptions: {
        scrollEnabled: false,
        upperCaseLabel: true,
        activeTintColor: 'red',
        inactiveTintColor: 'gray',
        style: {
            backgroundColor: 'white',
        },
        tabStyle:{
          height:39,
        },
        labelStyle:{
          lineHeight:39
        },
        indicatorStyle: {
          backgroundColor: 'red',
        }
    }
})

const NavigationConfig = createBottomTabNavigator({
  发现音乐: {
    screen: BottomMater,
    navigationOptions:{
      tabBarIcon:({focused})=>{
        return focused ? rendIcon('search','iconFocus') : rendIcon('search','iconBlur')
      }
    }
  },
  我的音乐: {
    screen: Leaderboard,
    navigationOptions:{
      tabBarIcon:({focused})=>{
        return focused ? rendIcon('music','iconFocus') : rendIcon('music','iconBlur')
      }
    }
  },
  朋友: {
    screen: Leaderboard,
    navigationOptions:{
      tabBarIcon:({focused})=>{
        return focused ? rendIcon('users','iconFocus') : rendIcon('users','iconBlur')
      }
    }
  },
  账号: {
    screen: Leaderboard,
    navigationOptions:{
      tabBarIcon:({focused})=>{
        return focused ? rendIcon('user','iconFocus') : rendIcon('user','iconBlur')
      }
    }
  }
},{
  tabBarOptions:{
    activeTintColor:'red',
    inactiveTintColor:'gray',
    style:{
      backgroundColor:'white'
    },
    tabStyle:{
      height:54,
    },
    indicatorStyle:{
      backgroundColor:'red'
    },
    labelStyle:{
      height:26,
      lineHeight:15
    }
  }
})

const AppContainer = createAppContainer(NavigationConfig)

class Navigation extends Component {

    render() {
        return (
          <AppContainer />
        );
    }
}

export default Navigation;

const styles = StyleSheet.create({
  iconFocus:{
      width: 20,
      height: 20,
      fontSize: 15,
      color:'red',
      lineHeight:25
  },
  iconBlur:{
    width: 20,
    height: 20,
    fontSize: 15,
    color:'gray',
    lineHeight:25
  }
})


function rendIcon(icon,_class){
  return  <Icon name={icon} style={styles[_class]}/>
}
