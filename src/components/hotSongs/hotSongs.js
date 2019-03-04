import React , { Component } from 'react' //#endregion
import setAxios from '../../utils/axios'
class hotSongs extends Component {
  constructor(props) {
    super(props);
    this.state = {  };
  }
  componentDidMount(){
    setAxios('top/list?idx=1').then(v=>{
      console.log(v)
    })
  }
  render() {
    return (
      null
    );
  }
}

export default hotSongs;
