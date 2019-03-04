import React ,{ Component } from 'react'
import { View ,Text,StyleSheet,Alert,BVLinearGraient } from 'react-native'
import { Button,Input } from 'react-native-elements'
import LinearGradient  from 'react-native-linear-gradient'
import Icon from 'react-native-vector-icons/Feather'
import setAxios from '../../utils/axios'
import {observer,inject} from 'mobx-react'

@observer
@inject('Store')
class PhoneLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password:'',
      phoneNumber:''
    };
  }
  handleLogin = () => {
    const {navigation,Store} = this.props
    const { phoneNumber,password } = this.state
    
      setAxios(`login/cellphone?phone=${phoneNumber}&password=${password}`)
      .then((res)=>{
       if(res.code !== 200){
         Alert.alert(
          '提示信息',
          '用户名或密码错误',
          [
            {text: '确认'},
          ],
          { cancelable: false }
        )
       }else{
         Store.setUserId(res.account.id)
         Store.setLogin()
         navigation.navigate('NavigationConfig')
       }})
      }
  render() {
    const { phoneNumber,password } = this.state

    return (
      <View style={styles.container}>
      <View style={{width:336}}>
        <Input
        placeholder='手机号'
        leftIcon={
          <Icon
            name='user'
            size={24}
          />
        }
        value={phoneNumber}
        keyboardType={'phone-pad'}
        containerStyle={{marginBottom:10,marginTop:10}}
        onChangeText={(phoneNumber)=>{
          this.setState({
            phoneNumber
          })
        }}
      />
       <Input
        value={password}
        secureTextEntry={true}
        placeholder='设置登录密码，不少于六位'
        leftIcon={
          <Icon
            name='lock'
            size={24}
          />
        }
        onChangeText={(password)=>{
          this.setState({
            password
          })
        }}
        containerStyle={{marginBottom:35}}
      />
        <Button
         title="登录"
         buttonStyle={{
           height:45,
           borderRadius:22.5,
         }}
         ViewComponent={ LinearGradient }
         linearGradientProps={{
          colors: ['#cb111f','#ce1321'],
          start: { x: 0, y: 0.5 },
          end: { x: 1, y: 0.5 },
        }}
         titleStyle={{
           color:'white'
         }}
         onPress={ this.handleLogin }/>
        </View>
        <View style={styles.re_set_password}>
          <Text style={styles.re_set_password_text}>重设密码</Text>
        </View>
      </View>
    );
  }
}

export default PhoneLogin;

const styles = StyleSheet.create({
  container : {
    alignItems: 'center',
  },
  re_set_password:{
    width: 99,
    height: 45,
    marginTop:20
  },
  re_set_password_text:{
    color: 'rgba(102, 102, 102, 1)',
    fontSize: 14,
    textAlign: 'center',
    lineHeight:45
  }
})
