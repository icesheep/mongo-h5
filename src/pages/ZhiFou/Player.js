import React, { Component } from 'react';
import { connect } from 'dva';
import { Row, Col, Icon } from 'antd';
import DownloadTip from '@/components/DownloadTip';
import styles from './Player.less';
import Jay from '../../assets/bg-play.png';
import PlayGray from '../../assets/play-gray.png';
import PauseGray from '../../assets/pause-gray.png';
import mm from '../../assets/3.mp3';
import Audio from '@/components/TimeLine';
import Tip from '@/components/Tip';

@connect(({ global }) => ({
  global,
}))
class PlayShare extends Component {
  state = {
    playing: false, //播放状态
    playIndex: 0, //当前播放曲目index
    tipVisible: false,
  };

  componentDidMount() {
    const {
      global: { list },
    } = this.props;
    const { content = [] } = list;
    const { type, cid, index } = this.props.location.query;
    // 如果参数中有index，代表是专辑分享界面跳转过来的
    if (index >= 0) {
      this.setState({
        playIndex: index,
      });
    }
    const { dispatch } = this.props;
    const params = {
      base: {},
      param: {
        type: type || 1,
        cid: cid || '189477276583936',
        count: 100,
        offset: 1
      },
    };
    dispatch({
      type: 'global/webview',
      payload: params,
      // callback: this.play,
    });
  }

  componentWillUnmount() {
  }

  play = (flag) => {
    const {playing, playIndex} = this.state;
    console.log('start play!!!!!!!!!!!!!!!!!!!!')
    const {
      global: { list },
    } = this.props;
    const { content = [] } = list;
    let detail = {};
    if (content.length > playIndex) {
      detail = content[playIndex];
    } 
    console.log(detail,flag,playing)
    if(Object.keys(detail).length > 0) {
      if(flag===true || !playing) {
        this.setState({
          playing: true
        },this.audio&&this.audio.startPlay())
      }else {
        console.log('stop!!!!!')
        this.setState({
          playing: false,
        },this.audio&&this.audio.stopPlay())
      }
    }
  }

  next = () => {
    const {playing, playIndex} = this.state;
    console.log(this.audio,playing,'next!!!!!!!!!!!!!')
    if(playIndex == 2) {
      this.openTip();
    }
    this.setState({
      playIndex: playIndex == 2 ? playIndex : parseInt(playIndex)+1,
    },()=>{this.audio&&this.audio.loadPlay();})
  }

  openTip = ()=> {
    this.setState({
      tipVisible: true
    })
  }

  closeTip = ()=> {
    this.setState({
      tipVisible: false
    })
  }

  render() {
    const { playing, playIndex, tipVisible } = this.state;
    const {
      global: { list },
    } = this.props;
    const { content = [] } = list;
    let detail = {};
    if (content.length > playIndex) {
      detail = content[playIndex];
    } 
    console.log(detail,this.state,this.props)
    return (
      <div className={styles.main}>
        <div
          style={{ backgroundImage:`url("${detail&&detail.imgUrl || Jay}")` }}
          className={styles.main1}
        >
          {' '}
        </div>
        {/* <div className={styles.mengban}></div> */}
        <Row className={styles.div1}>
          <img src={detail && detail.imgUrl ||Jay} className={styles.img1} />
          <Col span={20} offset={2} className={styles.item1}>
            {detail && detail.title}
          </Col>
          <img
            // onClick={this.playAudio}
            onClick={this.play}
            src={playing ? PauseGray : PlayGray}
            className={styles.img2}
          />
          <Col className={styles.item2}>
            <Audio 
              play = {this.play}
              next = {this.next}
              src={detail.playUrl}  
              ref = {e => {this.audio = e}} />
          </Col>
        </Row>
        <DownloadTip />
        {tipVisible ? <Tip close={this.closeTip}/> : null}
      </div>
    );
  }
}

export default PlayShare;
