import React, { Component } from 'react';
import { WingBlank, List,SearchBar} from 'antd-mobile';
import MyHeader from '../../components/MyHeader.js';
import { createForm } from 'rc-form';
import PropTypes from 'prop-types';

const Item = List.Item;

class AppAudioCatalog extends Component {

  constructor(props) {
      super(props);
      this.state = {audio_play_catalog: props.audio_play_catalog||''
                   };
  }

  handleClickCatalog(e) {
      if(e===undefined||e.length<1){
         console.log(e);
      }else{
         this.props.audioPlayCatalogCreate(e);
         this.props.history.push('/app/audio/list');
      }
  }

  handleClickSearchFocus(){
     this.props.history.push('/app/audio/search');
  }
  render() {
    return (
        <div>
              <MyHeader myheadertitle={ global.constants.const_app_audio_catalog } />
              <WingBlank>
                 <SearchBar placeholder="Search" onFocus={()=>{this.handleClickSearchFocus()}}/>
                 <List renderHeader={() => '分类'} className="my-list">
                     <Item arrow="horizontal" onClick={() => {this.handleClickCatalog("玄幻小说")} }>玄幻小说</Item>
                     <Item arrow="horizontal" onClick={() => {this.handleClickCatalog("官场商战")} }>官场商战</Item>
                     <Item arrow="horizontal" onClick={() => {this.handleClickCatalog("有声文学")} }>有声文学</Item>
                     <Item arrow="horizontal" onClick={() => {this.handleClickCatalog("评书")} }>评书</Item>
                     <Item arrow="horizontal" onClick={() => {this.handleClickCatalog("音乐")} }>音乐</Item>
                 </List>
              </WingBlank>
        </div>
    );
  }

  static propTypes = {
    audio_play_catalog: PropTypes.string,
    audioPlayCatalogCreate: PropTypes.func,
  }

}
const AppAudioCatalogWrapper = createForm()(AppAudioCatalog);
export default AppAudioCatalogWrapper;
