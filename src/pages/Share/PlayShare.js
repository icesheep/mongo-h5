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
    playingtime: 0,   //播放时间 
    buffertime: 0,   //缓冲时间
    duration: 0,   //总时长
    playing: false,   //播放状态
    showFix: true,   //下载提示状态
    playIndex: 0,   //当前播放曲目index
  };

  componentDidMount() {
    const {
      global: { list },
    } = this.props;
    const {content=[]} = list;
    const {type,cid,index} = this.props.location.query;
    // 如果参数中有index，代表是专辑分享界面跳转过来的
    if(index>=0) {
      this.setState({
        playIndex: index
      })
    }
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
        "type": type||1,
        "cid": cid||"189477276583936"
      }
    };
    dispatch({
      type: 'global/webview',
      payload: params,
    });
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
    cancelAnimationFrame(this.requestRef);
  }

  // 播放时间刷新
  PlayingMusic = () => {
    this.requestRef = requestAnimationFrame(() => {
      this.timer = setTimeout(() => {
        if(this.videoContainer) {
          let timeRages = this.videoContainer.buffered;
          let bufferedTime = 0
          if(timeRages.length !== 0){
              bufferedTime = timeRages.end(timeRages.length-1);
          }
          if(this.videoContainer.currentTime === this.videoContainer.duration) {
            let {playIndex} = this.state;
            let temp = parseInt(playIndex)+1
            this.setState(
              {
                playingtime: this.videoContainer.currentTime,
                duration: this.videoContainer.duration,
                buffertime: bufferedTime,
                playIndex: temp,
              },
              () => {
                this.videoContainer.play();
                this.PlayingMusic();
              }
            );
          }else {
            this.setState(
              {
                playingtime: this.videoContainer.currentTime,
                duration: this.videoContainer.duration,
                buffertime: bufferedTime,
              },
              () => {
                this.PlayingMusic();
              }
            );
          }
        }
      }, 1000);
    });
  };

  // 格式化时间
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

  // 关闭弹窗
  closeFix = () => {
    this.setState({
      showFix: false,
    })
  }

  // 下载app
  downApp = () => {
    window.open('https://fm.tingdao.com/html/h5.html')
  }

  // 播放、暂停功能
  playAudio = () => {
    const {playing,playIndex} = this.state;
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
        playIndex : playIndex===-1 ? 0 : playIndex,
        playing: true,
      }, ()=>{
        this.videoContainer.play();
        this.PlayingMusic();
      })
    }
  }

  // 停止播放
  stopPlay = () => {
    this.setState({
      playIndex: -1,
      playing: false,
    })
  }
  //PC端设置进度条
  setTimeOnPc = (time) =>{
    let audio = this.videoContainer;
    if(audio.currentTime !== 0) {
        audio.currentTime = time;
        this.setState(
          {
            playingtime: time,
          }
        );
    }
  }
  //PC端点击事件
  clickChangeTime = (e) =>{
    const {duration} = this.state;
    if(!e.pageX&& !duration){
        return
    }
    this.setTimeOnPc((e.pageX-this.progressDiv.clientWidth*0.1666666667)/(this.progressDiv.clientWidth*0.6666666667)*duration)
  }
  // 开始拖动
  startChangeTime = (e) =>{
    var point = this.getPoint(e);
    const {duration} = this.state;
    if(!point.pageX&& !duration){
        return
    }
    this.setTimeOnPc((point.pageX-this.progressDiv.clientWidth*0.1666666667)/(this.progressDiv.clientWidth*0.6666666667)*duration)
  }
  // 拖动播放条
  moveProgress = (e) =>{
    e.preventDefault(); //阻止默认行为
    var point = this.getPoint(e);
    const {duration} = this.state;
    if(!point.pageX&& !duration){
        return
    }
    this.setTimeOnPc((point.pageX-this.progressDiv.clientWidth*0.1666666667)/(this.progressDiv.clientWidth*0.6666666667)*duration)
  }
  //默认以第一个手指的位置计算
  getPoint =(e) =>{
    return e.touches ? e.touches[0] : e;
  };

  render() {
    const {showFix, playing,buffertime, duration, playingtime, playIndex} = this.state;
    const {
      global: { list },
    } = this.props;
    const {content=[]} = list;
    let detail = {};
    if( content.length >= playIndex || content.length === 0) {
      detail = content[playIndex];
    }else if(playIndex !== 0) {
      this.stopPlay();
    }
    return (
      <div className={styles.main}>
        <div style={{backgroundImage: `url("${detail&&detail.imgUrl}")`}} className={styles.main1}> </div>
        {/* <div className={styles.mengban}></div> */}
        <Row className={styles.div1}>
          <img src={detail&&detail.imgUrl} className={styles.img1} />
          <Col span={20} offset={2} className={styles.item1}>{detail&&detail.title}</Col>
          <img onClick={this.playAudio} src={playing ? PauseGray:PlayGray} className={styles.img2} />
          <Col className={styles.item2}>
            <Row>
              <Col span={4}>{playingtime?this.formatterTime(playingtime):`00:00`}</Col>
              <div ref={node => this.progressDiv = node}>

                <Col span={16} className={styles.all}
                  onTouchMove={this.moveProgress}
                  onTouchStart={this.startChangeTime}
                  onClick={this.clickChangeTime}
                >
                  <div 
                    className={styles.playing} 
                    style={{width: (duration) ? `${playingtime/duration*100}%` : duration}}
                  ></div>
                  {/* <div 
                    className={styles.buffer} 
                    style={{width: (buffertime) ? `${buffertime/duration*100}%` : 0}}
                  ></div> */}
                </Col>
              </div>
              <Col span={4}>{duration?this.formatterTime(duration):`00:00`}</Col>
            </Row>
          </Col>
        </Row>
        {showFix ?
        <Row className={styles.fix1}>
          <Icon type="close" className={styles.close} onClick={this.closeFix}/>
          <Col span={4}><img src={mgLogo} /></Col>
          <Col span={14} className={styles.p1}>芒果动听APP 邀您一起加入<br/> 加油美好生活！</Col>
          <Col span={6} className={styles.p2} onClick={this.downApp}>下载APP</Col>
        </Row> : null}
        <audio
          id="player"
          src={detail&&detail.playUrl}
          style={{display:'none'}}
          ref={node => this.videoContainer = node}
          preload="none" controlsList="nodownload"
        ></audio>
      </div>
    );
  }
}

export default PlayShare;
