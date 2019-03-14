import * as React from 'react'
import { SearchBar, ListItem } from 'react-native-elements'
import { View ,Text, FlatList } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import setAxios from '../../utils/axios'
import { debounce } from '../../utils/utils'


class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      search_result: []
     };
  }
  updateSearch = search => {
    this.setState({ search });
    debounce(this.handleSearchInfo(search))
  };
  handleSearchInfo = search => {
    setAxios(`search?keywords=${search}`).then(v=>
       this.setState({
          search_result: adapterSearchResult(v.result.songs)
      })
    )
  }
  handleList = (musicId, musicName, authorNames, musicTime, picUrl, e) => {
    this.props.navigation.navigate('Play', { musicId, musicName, authorNames, musicTime, picUrl })
  }
  keyExtractor = (({item,index}) => index.toString())
  renderItem = (({item,index}) => {
    return (
        <ListItem
        title={ item.song_name }
        subtitle={ item.singer_name }
        leftAvatar={{source: { uri: item.singer_pic }}}
        onPress={this.handleList.bind(
          this,
          item.song_id,
          item.song_name,
          item.singer_name,
          item.song_time,
          item.singer_pic
        )}
        titleStyle={{ fontSize: 13, color: 'rgba(0,0,0,1)' }}
        subtitleStyle={{ fontSize: 12, marginTop: 5 }}
        />
    )
  })
  render() {
    const { search } = this.state
    return (
      <View>
        <SearchBar
          placeholder="请输入歌曲名..."
          onChangeText={this.updateSearch}
          value={search}
          platform='default'
          placeholderTextColor='#fff'
          containerStyle={{ backgroundColor: 'rgb(206,19,33)' }}
          inputContainerStyle={{ backgroundColor: 'rgba(85, 85, 85, 0.3)'}}
          round={true}
          inputStyle={{ fontSize: 15, color: '#fff' }}
          leftIconContainerStyle={{color:'#fff'}}
          searchIcon={<Icon name='search' color={'#fff'} size={16}/>}
          clearIcon={<Icon name='x' color={'#fff'} size={16}/>}
        />
        <FlatList
          data={this.state.search_result}
          key={this.keyExtractor}
          renderItem={this.renderItem}
        />
        <View style={{marginBottom: 50}}></View>
      </View>
    );
  }
}

export default Search;

function adapterSearchResult(data){
  let result = []
  result = data.map(v=>{
    console.log(v)
    return {
      singer_pic : v.artists.map(vv=>vv.img1v1Url).join(''),
      singer_name : v.artists.map(vv=>vv.name).join('-'),
      song_name : v.name,
      song_id : v.id,
      song_time : v.duration
    }
  })

  return result
}
