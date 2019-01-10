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

@connect(({ global }) => ({
  global,
}))
class PlayShare extends Component {
  state = {
    playing: false, //播放状态
    playIndex: 0, //当前播放曲目index
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
    if(detail !== {}) {
      if(flag || !playing) {
        this.setState({
          playing: true
        },this.audio&&this.audio.startPlay())
      }else {
        this.setState({
          playing: false,
        },this.audio&&this.audio.stopPlay())
      }
    }
  }

  next = () => {
    const {playing, playIndex} = this.state;
    console.log(this.audio,playing,'next!!!!!!!!!!!!!')
    this.setState({
      playIndex: playIndex === 2 ? playIndex : playIndex+1,
    },this.audio&&this.audio.startPlay())
  }

  render() {
    const { playing, playIndex } = this.state;
    const {
      global: { list },
    } = this.props;
    const { content = [] } = list;
    let detail = {};
    if (content.length > playIndex) {
      detail = content[playIndex];
    } else if (playIndex !== 0) {
      this.play();
    }

    return (
      <div className={styles.main}>
        <div
          style={{ backgroundImage:`url("${detail.imgUrl || Jay}")` }}
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
      </div>
    );
  }
}

export default PlayShare;
