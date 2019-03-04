import { View, Text, Image, StyleSheet } from 'react-native'
import { Avatar } from 'react-native-elements'
import React, { Component } from 'react'
import Swiper from 'react-native-swiper'
import setAxios from '../../utils/axios'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      bannerImages: [],
      isSwiperShow: false,
    }

    this.boxs = [
      {name:'radio',title:'私人FM'},
      {name:'account-box',title:'每日歌曲推荐'},
      {name:'assessment',title:'云音乐热歌榜'}
    ]
  }
  componentDidMount() {
    setAxios('banner').then((v) => {
      this.setState({
        bannerImages: v.banners,
      })
    })

    setTimeout(() => {
      this.setState({
        isSwiperShow: true,
      })
    }, 0)
  }
  renderSwiper = () => {
    const { bannerImages } = this.state

    return (
      <Swiper
        height={124}
        autoplay={true}
        removeClippedSubviews={false}
        loop={true}
        key={bannerImages.length}
        showsPagination={false}
        showsPagination={true}
        paginationStyle={{ bottom : 5 }}
      >
        {bannerImages.map((v, index) => {
          return (
            <View style={{ height: 124 }} key={index}>
              <Image source={{ uri: v.picUrl }} style={{ width: '100%', height: 124 }} />
            </View>
          )
        })}
      </Swiper>
    )
  }
  render() {
    const { isSwiperShow } = this.state
    return isSwiperShow ? (
      <View>
        <View style={{ height: 124 }}>{this.renderSwiper()}</View>
          <View style={styles.boxWrap}>
            {this.boxs.map((v,index)=>{
             return (<View style={styles.box} key={index}>
                <Avatar rounded size={56}  icon={{name: v.name}} overlayContainerStyle={{backgroundColor:'#cd1220'}} />
                <Text>{v.title}</Text>
              </View>)
            })}
          </View>

      </View>
    ) : (
      <View style={{ height: 200 }}>
        <Image source={require('../../assets/timg.jpg')} style={styles.bannerImg} />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  imgWrapper: {
    width: '100%',
    height: 124,
  },
  imgView: {
    height: 124,
  },
  bannerImg: {
    width: '100%',
    height: 124,
  },
  boxWrap:{flexDirection:'row',justifyContent:'space-around',marginTop:10,marginBottom:10},
  box: {
    width: 120,
    height: 80,
    justifyContent:'space-between',
    alignItems:'center'
  }
})

export default Home
