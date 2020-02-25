import React, { Component } from 'react';
import { WingBlank, Card,Button,Flex,WhiteSpace,Icon} from 'antd-mobile';
import MyHeader from '../../components/MyHeader.js';
import { createForm } from 'rc-form';
import PropTypes from 'prop-types';
import './AppAudioPlay.css';
import audiostatement from "./AudioStatement.md";
import ReactMarkdown from 'react-markdown';
import AppAudioPlayerSettingDialogContainers from '../../redux/containers/AppAudioPlayerSettingDialogContainers.js';

var arrAudioPlay = [];
function pad(num, n) {  
    var len = num.toString().length;  
    while(len < n) {  
        num = "0" + num;  
        len++;  
    }  
    return num;  
}

class AppAudioPlay extends Component {

  constructor(props) {
      super(props);
      this.state = {audio_play_catalog: props.audio_play_catalog||'',data: ''
                   };
  }

  componentDidMount(){
      const const_audio_play_amount = this.props.audio_play_amount;
      var cv = "";
      for(var i=1;i<=Number(const_audio_play_amount);i++){
          cv = pad(i,3);
          arrAudioPlay.push({seq: cv});
      }
      //const audio = document.getElementById('audioplayer');
      //audio.playbackRate = 1;
  }

  handleClickPre(e) {
     const audio = document.getElementById('audioplayer1');
     audio.playbackRate = this.props.audio_play_back_rate;
     const const_audio_play_sequence = this.props.audio_play_sequence;
     var cur_val = Number(const_audio_play_sequence);
     if (cur_val===1){
         this.props.audioPlaySequenceCreate("001");
         return;
     }
     var cv = pad(cur_val-1,3);
     this.props.audioPlaySequenceCreate(cv);
  }

  handleClickNext(e) {
     const audio = document.getElementById('audioplayer1');
     audio.playbackRate = this.props.audio_play_back_rate;
     console.log(this.props.audio_play_back_rate);

     const const_audio_play_amount = this.props.audio_play_amount;
     const const_audio_play_sequence = this.props.audio_play_sequence;
     var cur_val = Number(const_audio_play_sequence);
     if (cur_val>Number(const_audio_play_amount)){
         alert("最后一集");
         return;
     }
     var cv = pad(cur_val+1,3);
     this.props.audioPlaySequenceCreate(cv);
  }

  handleClickContent(e) {
      this.props.history.push('/app/audio/playset');
  }
   
  handleClickSetting(){
     this.props.dialogVisibleDataCreate(true);
  }

  render() {
    const const_audio_play_catalog = this.props.audio_play_catalog;
    const const_audio_play_name = this.props.audio_play_name;
    const const_audio_sequence = this.props.audio_play_sequence;
    const const_audio_format = this.props.audio_play_format;
    const const_play_url = this.props.audio_play_url+"/"+const_audio_play_catalog+"/"+const_audio_play_name+"/"+const_audio_sequence+"."+const_audio_format;
    return (
        <div>
              <MyHeader myheadertitle={ const_audio_play_name } preurl={'/app/audio/playset'} />
              <WhiteSpace />
              <WingBlank>
                 <Card>
                      <Card.Header
                        title={<div><Flex wrap="wrap" ><Flex.Item><span>{const_audio_sequence}</span></Flex.Item> <Flex.Item> <Icon type="right" size={"xxs"} onClick={() => {this.handleClickSetting()}} /></Flex.Item> </Flex> </div>}
                      />
                      <Card.Body>
                          <audio
                           src={const_play_url}
                           preload={"metadata"}
                           controls
                           id="audioplayer1"
                           autoPlay={"autoplay"}
                          />
                      </Card.Body>
                      <Card.Footer content={<div><Flex wrap="wrap" ><Flex.Item><Button onClick={()=>{this.handleClickPre()}}>上一集</Button></Flex.Item> <Flex.Item><Button onClick={()=>{this.handleClickContent()}}>目录</Button> </Flex.Item><Flex.Item><Button onClick={()=>{this.handleClickNext()}}>下一集</Button></Flex.Item> </Flex> </div>} />
                 </Card>
                 <WhiteSpace />
                 <ReactMarkdown
                   source={audiostatement}
                   escapeHtml={false}
                 />
                 <AppAudioPlayerSettingDialogContainers />
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
    audio_play_udt: PropTypes.string,
    audio_play_format: PropTypes.string,
    dialogvisible: PropTypes.bool,
    dialogVisibleDataCreate: PropTypes.func,
    audio_play_back_rate: PropTypes.number,
  }

}
const AppAudioPlayWrapper = createForm()(AppAudioPlay);
export default AppAudioPlayWrapper;
