import React, { Component } from 'react';
import { WingBlank, Grid, SearchBar,Toast,WhiteSpace } from 'antd-mobile';
import MyHeader from '../../components/MyHeader.js';
import { createForm } from 'rc-form';
import PropTypes from 'prop-types';


class AppAudioSearch extends Component {

  constructor(props) {
      super(props);
      this.state = {audio_play_catalog: props.audio_play_catalog||'',data: '',display_ret: 'none'
                   };
  }

  handleClickSearch(e){
    var search_title = "";
    if (e===undefined) {
       return
    }
    search_title = e;
    var data;
    let accesstoken = '';
    if (JSON.parse(localStorage.getItem(global.constants.const_localstorage_id) || '[]')[0]===undefined||
          JSON.parse(localStorage.getItem(global.constants.const_localstorage_id) || '[]')[0].username===undefined){
          accesstoken = global.constants.const_default_accesstoken
    }else{
          accesstoken = JSON.parse(localStorage.getItem(global.constants.const_localstorage_id) || '[]')[0].accesstoken;
    }
    //const const_audio_play_catalog = this.props.audio_play_catalog;
    
    Toast.loading('Loading...', 0, () => {
         console.log('Load complete !!!');
    });
    let url = global.constants.const_api_url + "/audio/search?accesstoken=" + accesstoken;
    fetch(url,{
      method: "Post",
      mode: "cors",
      headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        catalog: search_title
      })
     })
     .then(response => response.json())
     .then((dat) => {
         data=dat;
         Toast.hide();
         this.setState({data:data,display_ret:'block'});
     })
     .catch(function (err) {
          console.log(err);
     });

  }

  componentDidMount() {
    this.autoFocusInst.focus();
  }

  handleClick(e) {
     if (e===undefined) {
        alert("警告,未选择");
        return;
     }
     this.props.audioPlayNameCreate(e.name);
     this.props.audioPlayAmountCreate(e.amount);
     this.props.audioPlayUrlCreate(e.url);
     this.props.audioPlayInfoCreate(e);
     this.props.audioPlayAuthorCreate(e.author);
     this.props.audioPlayAnnouncerCreate(e.announcer);
     this.props.audioPlayContextCreate(e.context);
     this.props.audioPlayImgCreate(e.img);
     this.props.audioPlayStatusCreate(e.status);
     this.props.audioPlaySequenceCreate("001");
     this.props.audioPlayUdtCreate(e.udt);
     var const_format = (e.format).length>0?e.format:'mp3';
     this.props.audioPlayFormatCreate(const_format);
     this.props.history.push('/app/audio/playset');
  }

  render() {
    //const const_audio_play_catalog = this.props.audio_play_catalog;
    const const_data = this.state.data;
    const const_len_data = const_data.length;
    const const_display_ret = this.state.display_ret;
    return (
        <div>
              <MyHeader myheadertitle={ '搜索' } preurl={'/app/audio/catalog'} />
              <WingBlank>
                   <SearchBar 
                      placeholder="Search"
                      showCancelButton={true}
                      cancelText="搜索"
                      ref={ref => this.autoFocusInst = ref}
                      onCancel={(e)=>{this.handleClickSearch(e)}}
                   />
                   <WhiteSpace />
                   <div style={{ display: const_display_ret }}><span>搜索结果:{const_len_data}</span></div>
                   <WhiteSpace />
                   <Grid data={const_data}
                    columnNum={3}
                    square={false}
                    renderItem={dataItem => (
                       <div style={{ padding: '12.5px' }}>
                           <img src={dataItem.img} style={{ width: '75px', height: '75px' }} alt="" />
                           <div style={{ color: '#888', fontSize: '14px', marginTop: '12px' }}>
                               <span>{dataItem.name}</span>
                           </div>
                       </div>
                    )}
                    onClick={(e)=>{this.handleClick(e)}}
                   />
              </WingBlank>
        </div>
    );
  }

  static propTypes = {
    audio_play_catalog: PropTypes.string,
    audio_play_name: PropTypes.string,
    audioPlayNameCreate: PropTypes.func,
    audio_play_info: PropTypes.string,
    audioPlayInfoCreate: PropTypes.func,
    audio_play_sequence: PropTypes.string,
    audioPlaySequenceCreate: PropTypes.func,
    audio_play_status: PropTypes.string,
    audioPlayStatusCreate: PropTypes.func,
    audio_play_url: PropTypes.string,
    audioPlayUrlCreate: PropTypes.func,
    audio_play_img: PropTypes.string,
    audioPlayImgCreate: PropTypes.func,
    audio_play_context: PropTypes.string,
    audioPlayContextCreate: PropTypes.func,
    audio_play_amount: PropTypes.string,
    audioPlayAmountCreate: PropTypes.func,
    audio_play_author: PropTypes.string,
    audioPlayAuthorCreate: PropTypes.func,
    audio_play_udt: PropTypes.string,
    audioPlayUdtCreate: PropTypes.func,
    audio_play_format: PropTypes.string,
    audioPlayFormatCreate: PropTypes.func,
  }

}
const AppAudioSearchWrapper = createForm()(AppAudioSearch);
export default AppAudioSearchWrapper;
