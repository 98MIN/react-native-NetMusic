import {
    createAppContainer,
    createMaterialTopTabNavigator,
    createBottomTabNavigator,
    createStackNavigator
} from 'react-navigation'
import { StyleSheet,View,Text} from 'react-native'
import Icon from "react-native-vector-icons/Feather"
import Personality from '../components/Personality/Personality'
import SongsList from '../components/SongsList/SongsList'
import AnchorRadio from '../components/AnchorRadio/AnchorRadio'
import Leaderboard from '../components/Leaderboard/Leaderboard'
import React, { Component } from 'react'
import Login from '../components/Login/Login'
import PhoneLogin from '../components/Login/PhoneLogin'
import Start from '../components/Login/Start'
import Account from '../components/account/Account'
import HotSongs from '../components/HotSongs/HotSongs'
import PlayPage from '../components/play/PlayPage'
import Comments from '../components/comments/Comments'
import Mine from '../components/Mine/Mine'


const BottomMater = createMaterialTopTabNavigator({
  '个性推荐': {
      screen: Personality,
      navigationOptions: {
          tabBarColor: '#3472EE',
          header:null
      }
  },
  '歌单': {
      screen: SongsList,
      navigationOptions: {
          tabBarColor: '#3472EE',
      }
  },
  '主播电台': {
      screen: AnchorRadio,
      navigationOptions: {
          tabBarColor: '#3472EE',
      }
  },
  '排行榜': {
      screen: Leaderboard,
      navigationOptions: {
          tabBarColor: '#3472EE',
      }
  }
}, {
    initialRouteName: "个性推荐",
    lazy:true,
    tabBarOptions: {
        scrollEnabled: false,
        upperCaseLabel: true,
        activeTintColor: 'red',
        inactiveTintColor: 'gray',
        style: {
            backgroundColor: 'white',
        },
        tabStyle:{
          height:42,
        },
        labelStyle:{
          lineHeight:42
        },
        indicatorStyle: {
          backgroundColor: 'red',
        }
    }
})

const Personal = createStackNavigator({
  'Person':{
    screen:BottomMater,
    navigationOptions:{
      header:null
    }
  },
  '云音乐热歌榜':{
    screen: HotSongs,
  },
  '每日歌曲推荐':{
    screen: HotSongs,
  },
  'playlist':{
    screen: HotSongs,
  }
})

const NavigationConfig = createBottomTabNavigator({
  '发现音乐': {
    screen: Personal,
    navigationOptions:{
      tabBarIcon:({focused})=>{
        return focused ? rendIcon('search','iconFocus') : rendIcon('search','iconBlur')
      }
    }
  },
  '我的音乐': {
    screen: Mine,
    navigationOptions:{
      tabBarIcon:({focused})=>{
        return focused ? rendIcon('music','iconFocus') : rendIcon('music','iconBlur')
      }
    }
  },
  '朋友': {
    screen: Leaderboard,
    navigationOptions:{
      tabBarIcon:({focused})=>{
        return focused ? rendIcon('users','iconFocus') : rendIcon('users','iconBlur')
      }
    }
  },
  '帐号': {
    screen: Account,
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

const PlayConfig = createStackNavigator({
  'Bottom':{
    screen:NavigationConfig,
    navigationOptions:{
      header:null
    }
  },
  'Play':{
    screen:PlayPage
  },
  'Comments':{
    screen:Comments
  }
})

const LoginConfig = createStackNavigator({
  'Start':{
    screen:Start,
    navigationOptions : {
      header : null
    }
  },
  'Login':{
    screen:Login,
    navigationOptions:{
      header:null
    }
  },
  'PhoneLoginNavigation':{
    screen:PhoneLogin,
    navigationOptions:{
      headerTitle:"手机号登录",
      headerTitleStyle:{
        alignSelf: 'center',
        textAlign:'center',
        flex:1,
        fontSize:16,
        fontFamily: 'Microsoft YaHei',
        color:'rgb(255, 255, 255)',
      },
      headerStyle:{
        backgroundColor:'rgb(206,19,33)'
      },
      headerRight:React.createElement(View,null,null),
      headerTintColor:'white'
    }
  }
})

const PhoneLoginNav = createStackNavigator({
  'LoginConfig':{
    screen:LoginConfig,
    navigationOptions:{
      header:null
    }
  },
  'NavigationConfig':{
    screen:PlayConfig,
    navigationOptions:{
      header:null
    }
  }
},{
  initialRouteName:'NavigationConfig'
})

const AppContainer = createAppContainer(PhoneLoginNav)

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
