import React, { Component } from 'react';
import { WingBlank, Grid,Card,List,Accordion,WhiteSpace,Pagination, Icon} from 'antd-mobile';
import MyHeader from '../../components/MyHeader.js';
import { createForm } from 'rc-form';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import audiostatement from "./AudioStatement.md";
import './AppAudioPlay.css';

const Item = List.Item;

//var arrAudioPlay = [];
function pad(num, n) {  
    var len = num.toString().length;  
    while(len < n) {  
        num = "0" + num;  
        len++;  
    }  
    return num;  
}

class AppAudioPlaySet extends Component {

  constructor(props) {
      super(props);
      this.state = {audio_play_catalog: props.audio_play_catalog||'',
                    data: '',arraudioplay:[],
                    total_page_amount: 0,
                    current_page_amount: 0,
                    display_page_step: 'none'
                   };
  }

  componentDidMount(){
      //const const_audio_play_amount = this.props.audio_play_amount;
      //var const_total_amount = parseInt(const_audio_play_amount/60)+1;
      //console.log(const_total_amount);
      //this.setState({total_page_amount:const_total_amount,current_page_amount: 1});

      //var cv = "";
      //var arrAudioPlay = [];
      //if(arrAudioPlay.length!==const_audio_play_amount){
      //    for(var i=1;i<=Number(const_audio_play_amount);i++){
      //        cv = pad(i,3);
      //        arrAudioPlay.push({seq: cv});
      //    }
      //    this.setState({arraudioplay:arrAudioPlay});
      //}
      var const_total_amount = parseInt(this.props.audio_play_amount/60)+1;
      this.setState({total_page_amount:const_total_amount});
      this.handleClickNextStep();
      if(const_total_amount>1){
        this.setState({display_page_step: 'block'});
      }
  }
  
  handleClickNextStep(e){
     var t_cur_val = 0;
     if(e===undefined){
         t_cur_val = 0;
     }else{
         t_cur_val = e;
     }
     var cv = "";
     var arrAudioPlay = [];
     var const_total_amount = parseInt(this.props.audio_play_amount/60)+1;
     //var t_current_page_amount = 0 ;
     //console.log(t_cur_val+">="+this.state.current_page_amount)
     if(t_cur_val>=this.state.current_page_amount){
       if (this.state.current_page_amount<const_total_amount-1){
          for(var i=1;i<=60;i++){
              cv = pad(i+this.state.current_page_amount*60,3);
              arrAudioPlay.push({seq: cv});
          }
       }else{
          for(var j=1;j+this.state.current_page_amount*60<=this.props.audio_play_amount;j++){
              cv = pad(j+this.state.current_page_amount*60,3);
              arrAudioPlay.push({seq: cv});
          }
       }
     }else{
       for(var k=(t_cur_val-1)*60+1;k<=((this.state.current_page_amount-1)*60>this.props.audio_play_amount?this.props.audio_play_amount:(this.state.current_page_amount-1)*60);k++){
          cv = pad(k,3);
          arrAudioPlay.push({seq: cv});
       }
     }
     this.setState({arraudioplay:arrAudioPlay,current_page_amount: (t_cur_val===0)?1:t_cur_val });
  }
  handleClick(e) {
     //console.log(e.seq);
     this.props.audioPlaySequenceCreate(e.seq);
     this.props.history.push('/app/audio/play');
  }

  render() {
    const const_audio_play_name = this.props.audio_play_name;
    const const_audio_play_img = this.props.audio_play_img;
    const const_audio_play_context = this.props.audio_play_context;
    const const_audio_play_announcer = this.props.audio_play_announcer;
    const const_audio_play_status = this.props.audio_play_status;
    const const_audio_amount = this.props.audio_play_amount;
    const const_audio_catalog = this.props.audio_play_catalog;
    const const_audio_total_amount = this.state.total_page_amount;
    const const_current_page_amount = this.state.current_page_amount;
    
    const const_audio_udt = (this.props.audio_play_udt).length>10?(this.props.audio_play_udt).substring(0,10):this.props.audio_play_udt;
    const arrAudioPlay = this.state.arraudioplay;
    const const_display_page = this.state.display_page_step;
    //const const_data = this.state.data;
    return (
        <div>
              <MyHeader myheadertitle={ const_audio_play_name } preurl={'/app/audio/list'}/>
              <WingBlank>
                 <List>
                   <Item>
                       <div className="audio-playset-box">
                           <div className="audio-playset-box-img">
                               <img src={const_audio_play_img} style={{width:'80px',height:'90px'}} alt="" />
                           </div>
                           <ul className="audio-playset-box-list">
                               <li><span>播音:</span>{const_audio_play_announcer}</li>
                               <li><span>状态:</span>{const_audio_play_status}</li>
                               <li><span>类别:</span>{const_audio_catalog}</li>
                               <li><span>更新时间:</span>{const_audio_udt}</li>
                           </ul>
                       </div>
                   </Item>
                 </List>
                 <WhiteSpace/>
                   <Accordion defaultActiveKey="0" accordion={false}>
                     <Accordion.Panel header="简介">
                       <Card>
                          <Card.Body>
                            <div>{const_audio_play_context}</div>
                          </Card.Body>
                       </Card>
                     </Accordion.Panel>
                 </Accordion>
                 <WhiteSpace/>
                 <span>播放列表({const_audio_amount})</span>
                 <Grid data={arrAudioPlay}
                    columnNum={6}
                    square={true}
                    renderItem={dataItem => (
                           <div style={{ color: '#888', fontSize: '14px', marginTop: '12px' }}>
                               <span>{dataItem.seq}</span>
                           </div>
                    )}
                    onClick={(e)=>{this.handleClick(e)}}
                 />
                 <WhiteSpace/>
                 <div style={{display: const_display_page}}>
                   <Pagination total={const_audio_total_amount}
                      className="custom-pagination-with-icon"
                      current={const_current_page_amount}
                      locale={{
                        prevText: (<span className="arrow-align"><Icon type="left" />上一页</span>),
                        nextText: (<span className="arrow-align">下一页<Icon type="right" /></span>),
                      }}
                      onChange={(e)=>{this.handleClickNextStep(e)}}
                   />
                 </div>
                 <ReactMarkdown
                   source={audiostatement}
                   escapeHtml={false}
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
    audio_play_udt: PropTypes.string,
    audio_play_format: PropTypes.string,
    audioPlayFormatCreate: PropTypes.func,
  }

}
const AppAudioPlaySetWrapper = createForm()(AppAudioPlaySet);
export default AppAudioPlaySetWrapper;
