/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */


import React, { Component } from 'react'
import Navigation from './src/Navigator/Navigation'
import Store from './store/Store'
import { Provider } from 'mobx-react'

export default class App extends Component {

    render() {

        return (
            <Provider Store={Store}>
                < Navigation />
            </Provider>
        );
    }
}
