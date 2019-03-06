import { View, StyleSheet, Image, Text, ImageBackground } from 'react-native'
import propTypes from 'prop-types'
import React,{ Component } from 'react'

class Audio extends Component {
  constructor(props) {
    super(props);
    this.state = {  };
  }
  render() {
    const { picUrl } = this.props


    return (
      <View style={styles.container}>
        <View style={styles.record_Warpper}>
          <ImageBackground source = {require('../../../assets/recode_cover.jpg')} style={{width: 236,height: 236}}>
            <View style={styles.recode}>
              <Image style={styles.recode_pic} source={{ uri : picUrl }}/>
            </View>
          </ImageBackground>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  record_Warpper: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    width: "100%",
    height: 360,
  },
  recode: {
    justifyContent:'center',
    alignItems:'center',
    width: 236,
    height: 236,
    borderRadius: 118,
  },
  recode_pic:{
    width: 153,
    height: 153,
    borderRadius: 76.5,
  }
})

export default Audio;
