import React, { Component } from 'react';
import { connect } from 'dva';
import { Row, Col, Icon } from 'antd';
import DownloadTip from '@/components/DownloadTip';
import styles from './Player.less';
import Jay from '../../assets/jay.jpg';
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
    });
  }

  componentWillUnmount() {
  }

  render() {
    const { playing, playIndex } = this.state;
    const {
      global: { list },
    } = this.props;
    const { content = [] } = list;
    let detail = {};
    // if (content.length >= playIndex || content.length === 0) {
    //   detail = content[playIndex];
    // } else if (playIndex !== 0) {
    //   this.stopPlay();
    // }
    return (
      <div className={styles.main}>
        <div
          style={{ backgroundImage:`url("${Jay}")` }}
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
            onClick={()=>{this.audio.playAudio()}}
            src={playing ? PauseGray : PlayGray}
            className={styles.img2}
          />
          <Col className={styles.item2}>
            <Audio ref = {e => {this.audio = e}} />
          </Col>
        </Row>
        <DownloadTip />
      </div>
    );
  }
}

export default PlayShare;
