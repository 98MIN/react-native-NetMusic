/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */


import React, {Component} from 'react';
import Login from './src/components/Login/Login'

import Navigation from './src/Navigator/Navigation'

export default class App extends Component{
  render() {
    const isLogin = 1
    return (
       isLogin ? <Navigation/> : <Login/>
    );
  }
}
