import React , { Component } from 'react' //#endregion
import setAxios from '../../utils/axios'
import { formatterSongsList } from './hotSongsAdapter'
import { FlatList, StyleSheet, View, TouchableHighlight } from 'react-native'
import { ListItem } from 'react-native-elements'
import Icon from 'react-native-vector-icons/Feather'

class hotSongs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageInfo: {},
      isLoading: false
     };
  }
  componentDidMount(){
    setAxios('top/list?idx=1').then(v=>{
      const musicInfo = formatterSongsList(v.playlist.tracks)
      let pageInfo = {}

      Object.assign( pageInfo, { musicInfo ,songListName:v.playlist.name ,coverImgUrl:v.playlist.coverImgUrl } )

      this.setState({
        pageInfo,
        isLoading: true
      })
    })
  }
  /**
   * id  音乐id
   */
  handleList = ( musicId, musicName, authorNames, e ) => {
    this.props.navigation.navigate('playPage',{ musicId, musicName, authorNames })
  }

  keyExtractor = (item, index) => index.toString()

  renderItem = ({ item }) => (
      <ListItem
      title={ item.songName }
      titleStyle={{ fontSize: 13, color: 'rgba(0,0,0,1)' }}
      subtitle={item.authorNames}
      subtitleStyle={{ fontSize: 12, marginTop: 5 }}
      leftAvatar={{ source: { uri: item.picUrl } }}
      rightIcon={{ name: 'chevron-right' }}
      containerStyle={{ borderBottomWidth: 1,borderBottomColor: '#ccc' }}
      onPress={this.handleList.bind(this,item.musicId,item.songName,item.authorNames)}
    />
  )
  render() {
    const { pageInfo ,isLoading } = this.state

    return (
     isLoading ?
      <FlatList
        keyExtractor={this.keyExtractor}
        data={pageInfo.musicInfo}
        renderItem={this.renderItem}
      />:
      <View style={styles.container}>
        <Icon name={'loader'} size={25}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  }
})

export default hotSongs;
