import * as React from 'react'
import { SearchBar } from 'react-native-elements'
import { View ,Text } from 'react-native'
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
    setAxios(`search?keywords=${search}`).then(v=>{
      adapterSearchResult(v.result.songs)
    })
  }
  render() {
    const { search } = this.state
    return (
      <View>
        <SearchBar
          placeholder="Type Here..."
          onChangeText={this.updateSearch}
          value={search}
          platform='default'
          round={true}
        />
      </View>
    );
  }
}

export default Search;

function adapterSearchResult(data){
  let result = []
  result = data.map(v=>{
    return {
      singer_pic : v.artists.map(vv=>vv.img1v1Url).join(''),
      singer_name : v.artists.map(vv=>vv.name).join(''),
      song_name : v.album.name,
      song_id : v.album.id
    }
  })

  return result
}
