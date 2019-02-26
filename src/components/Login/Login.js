import { View, Text, StyleSheet } from 'react-native'
import { Avatar, Button } from 'react-native-elements'
import React, { Component } from 'react'

class Login extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <View>
        <View style={styles.header}>
          <Text style={styles.header_font}>登录</Text>
        </View>
        <View style={styles.container}>
          <View style={styles.main}>
            <View style={styles.container}>
              <View>
                <Avatar rounded source={require('../../assets/logo.png')} size={90} />
              </View>
              <View>
                <Button
                  title="手机号登录"
                  buttonStyle={Object.assign({ marginTop: 60 }, styles.main_button)}
                  type="outline"
                  titleStyle={{ color: 'red' }}
                />
              </View>
              <View>
                <Button title="注册" buttonStyle={styles.main_button} type="outline" titleStyle={{ color: 'red' }} />
              </View>
            </View>
          </View>
          <View style={styles.footer}>
            <View style={{ width: 99, height: 54, color: 'rgba(80, 80, 80, 1)', fontSize: 14, textAlign: 'center' }}>
              <Text style={{ textAlign: 'center' }}>其他登录方式</Text>
            </View>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row' }}>
              <View style={styles.footer_list}>
                <Avatar rounded />
                <Text style={{ fontSize: 12 }}>微信</Text>
              </View>
              <View style={styles.footer_list}>
                <Avatar rounded />
                <Text style={{ fontSize: 12 }}>QQ</Text>
              </View>
              <View style={styles.footer_list}>
                <Avatar rounded />
                <Text style={{ fontSize: 12 }}>新浪微博</Text>
              </View>
              <View style={styles.footer_list}>
                <Avatar rounded />
                <Text style={{ fontSize: 12 }}>网易邮箱</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  header: {
    width: 360,
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.5)',
  },
  header_font: {
    fontSize: 16,
    lineHeight: 50,
    textAlign: 'center',
    fontFamily: 'Microsoft YaHei',
    color: 'rgba(0,0,0,1)',
  },
  main: {
    height: 260,
    marginTop: 55,
    marginBottom: 45,
  },
  main_button: {
    height: 45,
    width: 293,
    marginBottom: 20,
    borderColor: 'red',
    borderWidth: 1,
    borderRadius: 22.5,
  },
  footer: {
    width: 313,
    height: 141,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  footer_list: {
    width: 72,
    height: 68,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
})

export default Login
