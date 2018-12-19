import React, { Component } from 'react';
import { connect } from 'dva';
import { Row, Col, Icon, Affix, Modal } from 'antd';
import VideoJsForReact from '@/components/Videojs';
import styles from './VideoShare.less';
import Jay from '../../assets/jay.jpg';
import PlayGray from '../../assets/play-gray.png';
import mgLogo from '../../assets/mgdt_logo.png';
import PauseGray from '../../assets/pause-gray.png';

@connect(({global }) => ({
  global,
}))
class VideoShare extends Component {
  state = {
    playing: false,
    showFix: true,
    videoJsOptions: {
      preload: 'auto',  // 预加载
      bigPlayButton: {},  // 大按钮
      autoplay: false,   // 自动播放
      controls: true,  // 是否开启控制栏
      width: 0,   // 播放器宽度
      height: 0,  // 播放器高度
      playbackRates: [1, 1.5, 2], // 播放倍速
      sources: [  // 视频源
        {
          src: '',
          type: 'application/x-mpegURL',
          label: 'HLS1',
          withCredentials: false,
          res: 960
        }
      ]
    }
  };

  componentDidMount() {
    const { dispatch } = this.props;
    const params = {
      "base" : {
        "userid" : "1810232029531260",
        "caller" : "18514281314",
        "imei" : "db658275cf708690c350ec01b3f6e863db6627a4",
        "ua" : "apple|iPhone|iPhone9,1|12.0.1|750*1334",
        "version" : "2.1",
        "osid" : "ios",
        "apn" : "wifi",
        "df" : "22010000"
      },
      "param" : {
        "type": 3,
        "cid": "1"
      }
    };
    dispatch({
      type: 'global/webview',
      payload: params,
    });
  }

  componentWillUnmount() {
  }

  closeFix = () => {
    this.setState({
      showFix: false,
    })
  }

  downApp = () => {
    
  }

  playAudio = () => {
    const {players,playing} = this.state;
    console.log(players)
    if(playing) {
      this.setState({
        playing: false
      },() => {
        players.pause();
      })
    }else {
      this.setState({
        playing: true
      },() => {
        players.play();
      })
    }
    
  }

  render() {
    const {showFix, playing, videoJsOptions} = this.state;
    const {
      global: { list },
    } = this.props;
    const {content=[]} = list;
    const detail = content.length>0?content[0]:{};
    if(detail.uri) {
      videoJsOptions.sources[0].src = detail.uri
    }
    console.log(videoJsOptions)
    return (
      <div className={styles.main}>
        <div style={{backgroundImage: `url("${detail.logo}")`}} className={styles.main1} > </div>
        {/* <div className={styles.mengban}></div> */}
        <Row className={styles.div1}>
          <img src={detail.logo} className={styles.img1} />
          <Col className={styles.item1}>{detail.showName}</Col>
          <img onClick={this.playAudio} src={playing ? PauseGray:PlayGray} className={styles.img2} />
        </Row>
        {showFix ?
        <Row className={styles.fix1}>
          <Icon type="close" className={styles.close} onClick={this.closeFix}/>
          <Col span={5}><img src={mgLogo} /></Col>
          <Col span={13} className={styles.p1}>芒果动听APP 要您一起加入<br/> 加油美好生活！</Col>
          <Col span={6} className={styles.p2} onClick={this.downApp}>下载APP</Col>
        </Row> : null}
        {detail.uri ? <VideoJsForReact
          sourceChanged={(player,players) => {console.log('准备完毕', player,players);this.setState({players})}}
          onReady={(player,players) => {console.log('准备完毕', player,players);this.setState({players})}}
          {...videoJsOptions}
        /> : null}
      </div>
    );
  }
}

export default VideoShare;
