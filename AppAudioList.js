import React, { Component } from 'react';
import { WingBlank, Grid , Toast,PullToRefresh } from 'antd-mobile';
import MyHeader from '../../components/MyHeader.js';
import { createForm } from 'rc-form';
import PropTypes from 'prop-types';



class AppAudioList extends Component {

  constructor(props) {
      super(props);
      this.state = {audio_play_catalog: props.audio_play_catalog||'',
                    data: '',audio_total_amount:0, 
                    current_page_amount:0,
                    total_amount:0,
                    arrlst: [],
                    total_page: 0,
                    display_page_step: 'none',
                    refreshing: true,
                    down: true
                   };
  }


  componentDidMount(){
    var data;
    let accesstoken = '';
    if (JSON.parse(localStorage.getItem(global.constants.const_localstorage_id) || '[]')[0]===undefined||
          JSON.parse(localStorage.getItem(global.constants.const_localstorage_id) || '[]')[0].username===undefined){
          accesstoken = global.constants.const_default_accesstoken
    }else{
          accesstoken = JSON.parse(localStorage.getItem(global.constants.const_localstorage_id) || '[]')[0].accesstoken;
    }
    const const_audio_play_catalog = this.props.audio_play_catalog;
    
    Toast.loading('Loading...', 0, () => {
         console.log('Load complete !!!');
    });
    let url = global.constants.const_api_url + "/audio/catalog/list?accesstoken=" + accesstoken;
    fetch(url,{
      method: "Post",
      mode: "cors",
      headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        catalog: const_audio_play_catalog
      })
     })
     .then(response => response.json())
     .then((dat) => {
         data=dat;
         //console.log(data.length);
         this.setState({data:data,total_amount: data.length});
         //this.handleClickNextStep(0);
         this.handleClickNextRefresh();
         if(data.length>9){
           this.setState({display_page_step: 'block'});
         }
         Toast.hide();
     })
     .catch(function (err) {
          console.log(err);
     });
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
  handleClickNextStep(e){
     var t_cur_val = 0;
     if(e===undefined){
         t_cur_val = 0;
     }else{
         t_cur_val = e;
     }
     var cv ;
     var arrLst = [];
     var const_total_amount = parseInt(this.state.total_amount/9)+1;
     var arrdata = this.state.data;
     if(t_cur_val>=this.state.current_page_amount){
       if (this.state.current_page_amount<const_total_amount-1){
          for(var i=0;i<9;i++){
              cv = arrdata[i+this.state.current_page_amount*9];
              arrLst.push(cv);
          }
       }else{
          for(var j=0;j+this.state.current_page_amount*9<this.state.total_amount;j++){
              cv = arrdata[j+this.state.current_page_amount*9];
              arrLst.push(cv);
          }
       }
     }else{
       for(var k=(t_cur_val-1)*9;k<((this.state.current_page_amount-1)*9>this.state.total_amount?this.state.total_amount:(this.state.current_page_amount-1)*9);k++){
          cv = arrdata[k];
          arrLst.push(cv);
       }
     }
     this.setState({arrlst: arrLst,current_page_amount: (t_cur_val===0)?1:t_cur_val, total_page: const_total_amount });
  }
  
  handleClickNextRefresh(){
     var t_cur_val = this.state.current_page_amount+1;
     var cv ;
     var arrLst = this.state.arrlst;
     var const_total_amount = parseInt(this.state.total_amount/9)+1;
     var arrdata = this.state.data;
     if (this.state.current_page_amount<const_total_amount-1){
          for(var i=0;i<9;i++){
              cv = arrdata[i+this.state.current_page_amount*9];
              arrLst.push(cv);
          }
     }else{
          for(var j=0;j+this.state.current_page_amount*9<this.state.total_amount;j++){
              cv = arrdata[j+this.state.current_page_amount*9];
              arrLst.push(cv);
          }
     }
     this.setState({arrlst: arrLst,current_page_amount: t_cur_val,refreshing: true });
     setTimeout(() => {
        this.setState({ refreshing: false });
     }, 1500);
  }


  render() {
    const const_audio_play_catalog = this.props.audio_play_catalog;
    const const_data = this.state.arrlst;
    //const const_audio_total_amount = this.state.total_page;
    //const const_current_page_amount = this.state.current_page_amount;
    //const const_display_page = this.state.display_page_step;
    return (
        <div>
              <MyHeader myheadertitle={ const_audio_play_catalog } preurl={'/app/audio/catalog'} />
              <WingBlank>
                 <PullToRefresh
                    refreshing={this.state.refreshing}
                    direction={'down'}
                    onRefresh={() => {
                          this.handleClickNextRefresh();
                          this.setState({ refreshing: true });
                          setTimeout(() => {
                            this.setState({ refreshing: false });
                          }, 1000);
                    }}
                 >
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
                 </PullToRefresh> 
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
const AppAudioListWrapper = createForm()(AppAudioList);
export default AppAudioListWrapper;
