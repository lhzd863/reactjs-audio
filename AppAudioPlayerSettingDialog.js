import React, { Component } from 'react';
import { Button,Dialog,Form,Slider} from 'element-react';
import 'element-theme-default';
import { createForm } from 'rc-form';
import PropTypes from 'prop-types';


class AppAudioPlayerSettingDialog extends Component {

  constructor(props) {
      super(props);
      this.state = {
                    setting_title: '',slider_val: 1
                   };
  }

  handleClickDialogSubmit() {
      this.props.dialogVisibleDataCreate(false);
  }

  handleClickSlider(e){
     var t_val = 1
     if(e===undefined){
       t_val = 1;
     }else{
       t_val = e;
     }
     this.props.audioPlayBackRateCreate(t_val);
     //this.props.dialogVisibleDataCreate(false);
  }

  render() {
    //const { getFieldProps } = this.props.form;
    const dialogvisible = this.props.dialogvisible;
    
    return (
        <div>
                  <Dialog
                    title={'设置'}
                    visible={ dialogvisible }
                    size = "large"
                    onCancel={ () => {this.props.dialogVisibleDataCreate(false) } }
                  >
                      <Dialog.Body>
                          <Form >
                              <Form.Item label={'播放速度'} labelWidth={80} >
                                  <Slider 
                                     value={this.state.slider_val} 
                                     showInput={true} 
                                     min={0.1}
                                     max={5}
                                     step={0.1}
                                     onChange={(e)=>{this.handleClickSlider(e)}}
                                  />
                              </Form.Item>
                          </Form>
                      </Dialog.Body>

                      <Dialog.Footer className="dialog-footer">
                          <Button onClick={ () => { this.props.dialogVisibleDataCreate(false) } }>取 消</Button>
                          <Button type="primary" onClick={ () => { this.handleClickDialogSubmit() } }>确 定</Button>
                      </Dialog.Footer>
                  </Dialog>
        </div>
    );
  }

  static propTypes = {
    dialogvisible: PropTypes.bool,
    dialogVisibleDataCreate: PropTypes.func,
    audio_play_back_rate: PropTypes.number,
    audioPlayBackRateCreate: PropTypes.func,   
  }
}
const AppAudioPlayerSettingDialogWrapper = createForm()(AppAudioPlayerSettingDialog);
export default AppAudioPlayerSettingDialogWrapper;
