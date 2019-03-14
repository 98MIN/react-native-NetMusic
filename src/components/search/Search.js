import * as React from 'react'
import { SearchBar } from 'react-native-elements'
import { View ,Text } from 'react-native'


class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ''
     };
  }
  updateSearch = search => {
    this.setState({ search });
  };
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
