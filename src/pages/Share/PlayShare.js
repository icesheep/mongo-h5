import React, { Component } from 'react';
import { connect } from 'dva';
import { Row, Col, Icon, Affix, Modal } from 'antd';
import VideoJsForReact from '@/components/Videojs';
import styles from './PlayShare.less';
import Jay from '../../assets/jay.jpg';
import PlayGray from '../../assets/play-gray.png';
import mgLogo from '../../assets/mgdt_logo.png';
import PauseGray from '../../assets/pause-gray.png';

@connect(({global }) => ({
  global,
}))
class PlayShare extends Component {
  state = {
    playingtime: 0,
    duration: 0,
    playing: false,
    showFix: true,
    playIndex: null,
  };

  componentDidMount() {
    const {
      global: { list },
    } = this.props;
    const {content=[]} = list;
    if(window.location.href.split('?').length > 1 && content.length > 0) {
      this.setState({
        playIndex: window.location.href.split('?')[1]
      })
    }else {
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
          "type": 1,
          "cid": "189477276583936"
        }
      };
      dispatch({
        type: 'global/webview',
        payload: params,
      });
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
    cancelAnimationFrame(this.requestRef);
  }


  PlayingMusic = () => {
    this.requestRef = requestAnimationFrame(() => {
      this.timer = setTimeout(() => {
        if(this.videoContainer) {
          this.setState(
            {
              playingtime: this.videoContainer.currentTime,
              duration: this.videoContainer.duration,
            },
            () => {
              this.PlayingMusic();
            }
          );
        }
      }, 1000);
    });
  };

  formatterTime = (time) => {
    let minutes = Math.floor(Math.round(time)/60);
    let seconds = Math.floor(Math.round(time)%60);
    if(minutes < 10) {
      minutes = `0${minutes}`
    }
    if(seconds < 10) {
      seconds = `0${seconds}`
    }
    return `${minutes}:${seconds}`
  }

  closeFix = () => {
    this.setState({
      showFix: false,
    })
  }

  downApp = () => {
    window.open('https://fm.tingdao.com/html/h5.html')
  }

  playAudio = () => {
    const {playing} = this.state;
    if(playing) {
      this.setState({
        playing: false,
      }, ()=>{
        this.videoContainer.pause();
        clearTimeout(this.timer);
        cancelAnimationFrame(this.requestRef);
      })
    }else {
      this.setState({
        playing: true,
      }, ()=>{
        this.videoContainer.play();
        this.PlayingMusic();
      })
    }
  }

  render() {
    const {showFix, playing, duration, playingtime, playIndex} = this.state;
    const {
      global: { list },
    } = this.props;
    const {content=[]} = list;
    let detail = {};
    if(playIndex && content.length >= playIndex) {
      detail = content[playIndex];
    }else {
      detail = content.length>0?content[0]:{};
    }
    return (
      <div className={styles.main}>
        <div style={{backgroundImage: `url("${detail.imgUrl}")`}} className={styles.main1}> </div>
        {/* <div className={styles.mengban}></div> */}
        <Row className={styles.div1}>
          <img src={detail.imgUrl} className={styles.img1} />
          <Col span={20} offset={2} className={styles.item1}>{detail.title}</Col>
          <img onClick={this.playAudio} src={playing ? PauseGray:PlayGray} className={styles.img2} />
          <Col className={styles.item2}>
            <Row>
              <Col span={4}>{playingtime?this.formatterTime(playingtime):null}</Col>
              <Col span={16} className={styles.all}>
                <div className={styles.playing} style={{width: (duration) ? `${playingtime/duration*100}%` : duration}}></div>
              </Col>
              <Col span={4}>{duration?this.formatterTime(duration):null}</Col>
            </Row>
          </Col>
        </Row>
        {showFix ?
        <Row className={styles.fix1}>
          <Icon type="close" className={styles.close} onClick={this.closeFix}/>
          <Col span={5}><img src={mgLogo} /></Col>
          <Col span={13} className={styles.p1}>芒果动听APP 要您一起加入<br/> 加油美好生活！</Col>
          <Col span={6} className={styles.p2} onClick={this.downApp}>下载APP</Col>
        </Row> : null}
        <audio
          id="player"
          src={detail.playUrl}
          style={{display:'none'}}
          ref={node => this.videoContainer = node}
          preload="none" controlsList="nodownload"
        ></audio>
      </div>
    );
  }
}

export default PlayShare;
