import React, { Component } from 'react';
// import { connect } from 'dva';
import { Row, Col, Icon, Affix, Modal } from 'antd';
import VideoJsForReact from '@/components/Videojs';
import styles from './PlayShare.less';
import Jay from '../../assets/jay.jpg';
import PlayGray from '../../assets/play-gray.png';
import mgLogo from '../../assets/mgdt_logo.png';
import PauseGray from '../../assets/pause-gray.png';
import gequ from '../../assets/jinse.mp3';

class PlayShare extends Component {
  state = {
    playingtime: 0,
    duration: 0,
    playing: false,
    showFix: true,
  };

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
    const {showFix, playing, duration, playingtime} = this.state;
    return (
      <div className={styles.main}>
        <Row className={styles.div1}>
          <img src={Jay} className={styles.img1} />
          <Col className={styles.item1}>我想和你唱</Col>
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
          src={gequ}
          style={{display:'none'}}
          ref={node => this.videoContainer = node}
          preload="none" controlsList="nodownload"
        ></audio>
      </div>
    );
  }
}

export default PlayShare;
