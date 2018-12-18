import React, { Component } from 'react';
// import { connect } from 'dva';
import { Row, Col, Icon, Affix, Modal } from 'antd';
import VideoJsForReact from '@/components/Videojs';
import styles from './Share.less';
import Jay from '../../assets/jay.jpg';
import mgLogo from '../../assets/mgdt_logo.png';


class Share extends Component {
  state = {
    players: null,
    showFix: true,
    list: ['01','02','03','04'],
    selectedAudio: null,
    videoJsOptions: {
      preload: 'auto',  // 预加载
      autoplay: false,   // 自动播放
      controls: true,  // 是否开启控制栏
      width: 0,   // 播放器宽度
      height: 0,  // 播放器高度
      playbackRates: [1, 1.5, 2], // 播放倍速
      sources: [  // 视频源
        {
          src: 'http://prertmp.tingdao.com:91/index.m3u8',
          type: 'application/x-mpegURL',
        }
      ]
    }
  };

  closeFix = () => {
    this.setState({
      showFix: false,
    })
  }

  downApp = () => {
    
  }

  playAudio = (v) => {
    const {selectedAudio,players} = this.state;
    if(selectedAudio === v) {
      this.setState({
        selectedAudio: null,
      },() => {
        players.pause();
      })
    }else {
      this.setState({
        selectedAudio: v,
      },() => {
        players.play();
      })
    }
  }

  render() {
    const {showFix,list,selectedAudio} = this.state;
    return (
      <div className={styles.main}>
        <Row className={styles.div1}>
          <img src={Jay} className={styles.img1} />
          <Col className={styles.item1}>平安精灵 一路畅行</Col>
          <Col className={styles.item2}>
            <span>#小资</span>
            <span style={{marginLeft:'0.2333rem'}}><Icon type="customer-service" />24万</span>
          </Col>
          <Col className={styles.item3}>
            所有节目
          </Col>
          {
            list&&list.map(v =>
              <Col className={styles.item4}>
                <Row className={selectedAudio === v ? styles.selected : styles.unselected} onClick={()=>{this.playAudio(v)}}>
                  <Col span={4} className={styles.list1}>{v}</Col>
                  <Col span={20}className={styles.list2}>
                    <p className={styles.p1}>平安精灵 一路畅行</p>
                    <p className={styles.p2}>湖南交通频道</p>
                  </Col>
                </Row>
              </Col>
            )
          }
        </Row>
        {showFix ?
        <Row className={styles.fix1}>
          <Icon type="close" className={styles.close} onClick={this.closeFix}/>
          <Col span={5}><img src={mgLogo} /></Col>
          <Col span={13} className={styles.p1}>芒果动听APP 要您一起加入<br/> 加油美好生活！</Col>
          <Col span={6} className={styles.p2} onClick={this.downApp}>下载APP</Col>
        </Row> : null}
        <VideoJsForReact
          sourceChanged={(player,players) => {console.log('准备完毕', player,players);this.setState({players})}}
          onReady={(player,players) => {console.log('准备完毕', player,players);this.setState({players})}}
          {...this.state.videoJsOptions}
        />
      </div>
    );
  }
}

export default Share;
