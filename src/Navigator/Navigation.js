import {
    createAppContainer,
    createMaterialTopTabNavigator,
    createBottomTabNavigator
} from 'react-navigation'
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
          lineHeight:39
        },
        indicatorStyle: {
            backgroundColor: 'red',
        }
    }
})

const NavigationConfig = createBottomTabNavigator({
  发现音乐: {
    screen: BottomMater
  },
  我的音乐: {
    screen: Leaderboard,
  },
  朋友: {
    screen: Leaderboard,
  },
  账号: {
    screen: Leaderboard,
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
      lineHeight:54
    },
    labelStyle:{
      height:38,
    },
    indicatorStyle:{
      backgroundColor:'red'
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
