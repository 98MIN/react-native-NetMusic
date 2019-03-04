import React,{ Component } from 'react'
import { Header,Avatar,Button,ListItem,FlatList } from 'react-native-elements'
import Icon  from 'react-native-vector-icons/Feather'
import { StyleSheet,View ,BVLinearGraient,Text,ScrollView} from 'react-native'
import LinearGradient  from 'react-native-linear-gradient'
import {observer,inject} from 'mobx-react'
import setAxios from '../../utils/axios';

@observer
@inject('Store')
class Account extends Component{
    constructor(props){
        super(props)
        this.state={
            userAvaterImg:'heihei',
            username:'',
            userLevel:0,
            userDynaimc:0,  //动态
            userAttention:0, //关注
            userFans:0,
            userCity:null,
            isSignin:false
        }
        this.memberItems = [
            {title:"会员中心",leftIcon:'coffee'},
            {title:"商城",leftIcon:'shopping-cart'},
            {title:"在线听歌免流量",leftIcon:'wifi'}
        ]
        this.setItems = [
            {title:"设置",leftIcon:'settings'},
            {title:"扫一扫",leftIcon:'camera'},
            {title:"主题换肤",leftIcon:'tv'}
        ]

    }
    componentDidMount(){
        //   ${this.props.Store.userId}
        setAxios(`user/detail?uid=374434203`).then((v)=>{
            if(v.code===200){
                const {avatarUrl,follows,followeds,nickname,city,eventCount} = v.profile
                this.setState({
                    userAvaterImg:avatarUrl,
                    userLevel:v.level,
                    userAttention:follows,
                    userFans:followeds,
                    username:nickname,
                    userCity:city,
                    userDynaimc:eventCount,
                    isSignin:v.mobileSign || v.pcSign
                })
            }
        })
    }

    handleDailySignin = () => {
        setAxios('daily_signin').then(v=>{
            console.log(v)
            if(v.code === 200 || v.code === -2){
                this.setState({
                    isSignin : true
                })
            }
        })
    }
    
    render(){
        const {isSignin,userAvaterImg,userAttention,userCity,userDynaimc,userFans,userLevel,username} = this.state

        return (
            <ScrollView style={{backgroundColor:'rgba(238, 238, 238, 1)'}}>
                <Header
                centerComponent={{text:'帐号',style:{color:"rgba(0,0,0,0.8)"}}}
                rightComponent={<Icon name="more-horizontal" style={{fontSize:20}}/>}
                placement='center'
                backgroundColor='red'
                centerContainerStyle={{height:44}}
                rightContainerStyle={{height:44}}
                containerStyle={{height:44}}   
                        
                />
                <View style={styles.container}>
                    <View style={styles.rowContainer}> 
                        <Avatar 
                        rounded 
                        source={{
                            uri:userAvaterImg
                        }}
                        size={60}
                        containerStyle={{width:60}}
                        />
                        <View style={{width:100,marginLeft:20}}>
                            <Text>
                                {username}
                            </Text>
                            <Text style={{borderWidth:1,fontSize:15,marginTop:8,width:50,borderRadius:9,height:18,textAlign:'center',lineHeight:18}}>
                                LV.{userLevel}
                            </Text>
                        </View> 
                        <View style={{width:140,alignItems:'flex-end'}}>
                            <Button 
                            title={isSignin?'已签到':'签到'} 
                            disabled={isSignin}
                            buttonStyle={{width:80,height:30}}
                            onPress={this.handleDailySignin}
                            />    
                        </View>                   
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <View style={styles.warpDown}>
                            <Text style={styles.textStyle}>
                                动态
                            </Text>
                            <Text style={styles.textStyle}>
                                {userDynaimc}
                            </Text>
                        </View>
                        <View style={styles.warpDown}>
                            <Text style={styles.textStyle}>
                                关注
                            </Text>
                            <Text style={styles.textStyle}>
                                {userAttention}
                            </Text>
                        </View>
                        <View style={styles.warpDown}>
                            <Text style={styles.textStyle}>
                                粉丝
                            </Text>
                            <Text style={styles.textStyle}>
                                {userFans}
                            </Text>
                        </View>
                        <View style={styles.warpDown}>
                            <Text style={styles.textStyle}>
                                我的资料
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={{marginTop:7}}>
                    <ListItem
                    rightIcon={{name:'chevron-right'}} 
                    leftIcon={{name:'mail'}} 
                    title="我的消息"
                    />
                </View>
                <View style={{marginTop:7}}>
                    {this.memberItems.map((v,index)=>{
                        return(
                            <ListItem
                            key={index}
                            rightIcon={{name:'chevron-right'}} 
                            leftIcon={{name:v.leftIcon}} 
                            title={v.title}
                            />
                        )
                })}
                </View>
                <View style={{marginTop:7}}>
                    {this.setItems.map((v,index)=>{
                        return(
                            <ListItem
                            key={index}
                            rightIcon={{name:'chevron-right'}} 
                            leftIcon={{name:v.leftIcon}} 
                            title={v.title}
                            />
                        )
                })}
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flexDirection:'column',  
        height:150,
        alignItems:'center',
        justifyContent:'space-around',
        backgroundColor:'#fff',
        marginTop:5,
    },
    textStyle:{
        textAlign:'center',
        fontSize:12
    },
    rowContainer:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-around'
    },
    warpDown:{
        height:50,
        width:90,
        justifyContent:'center',
        alignItems:'center'
    }
})

export default Account