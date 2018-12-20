import React, { Component } from 'react';
import { connect } from 'dva';
import { Row, Col, Icon, Affix, Modal } from 'antd';
import { stringify } from 'qs';
import request from '@/utils/request';
import VideoJsForReact from '@/components/Videojs';
import styles from './Share.less';
import Jay from '../../assets/jay.jpg';
import mgLogo from '../../assets/mgdt_logo.png';
import Play from '../../assets/play.png';
import Pause from '../../assets/pause.png';

@connect(({global }) => ({
  global,
}))
class Share extends Component {
  state = {
    playing: false,
    showFix: true,
    selectedAudio: {},
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
        "type": 2,
        "cid": "246105478579200"
      }
    };
    dispatch({
      type: 'global/webview',
      payload: params,
    });
  }

  closeFix = () => {
    this.setState({
      showFix: false,
    })
  }

  downApp = () => {
    window.open('https://fm.tingdao.com/html/h5.html')
  }

  playAudio = (v,index) => {
    // const {selectedAudio,playing} = this.state;
    // if(selectedAudio === v) {
    //   if(playing) {
    //     this.setState({
    //       playing: false,
    //     },() => {
    //       this.videoContainer.pause();
    //     })
    //   }else {
    //     this.setState({
    //       playing: true,
    //     },() => {
    //       this.videoContainer.play();
    //     })
    //   }
    // }else {
    //   this.setState({
    //     playing: true,
    //     selectedAudio: v,
    //   },() => {
    //     this.videoContainer.play();
    //   })
    // }
    const urlParams = new URL(window.location.href);
    window.location.href = `${urlParams.origin}${urlParams.pathname}#/activity/share-player?${index}`
  }

  formatterNum = (num) => {
    if(num < 10) {
      num = `0${num}`
    }
    return num;
  }

  render() {
    const {showFix,selectedAudio, playing} = this.state;
    const {
      global: { list ={} },
    } = this.props;
    const {content=[], count, detail=[]} = list;
    const detailDetail = detail&&detail.length>0?detail[0]:{};
    console.log(this.props)
    return (
      <div className={styles.main}>
        <Row className={styles.div1}>
          <img src={detailDetail.imgUrl} className={styles.img1} />
          <Col className={styles.item1}>{detailDetail.title}</Col>
          <Col className={styles.item2}>
            {/* <span>{detailDetail.title}</span> */}
            <span style={{marginLeft:'0.2333rem'}}><Icon type="customer-service" style={{marginRight: '0.2333rem'}} />{detailDetail.playCount}</span>
          </Col>
          <Col className={styles.item3}>
            所有节目
          </Col>
          {
            content&&content.map((v,index) =>
              <Col className={styles.item4}>
                <Row className={selectedAudio === v ? styles.selected : styles.unselected} onClick={()=>{this.playAudio(v,index)}}>
                  <Col span={4} className={styles.list1}>{this.formatterNum(index+1)}</Col>
                  <Col span={16}className={styles.list2}>
                    <p className={styles.p1}>{v.title}</p>
                    <p className={styles.p2}>{v.publishName}</p>
                  </Col>
                  {/* <Col span={4} className={styles.list3}>
                    {selectedAudio === v ?<img alt="" src={playing?Pause:Play} /> : null}
                  </Col> */}
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
        {/* <VideoJsForReact
          sourceChanged={(player,players) => {console.log('准备完毕', player,players);this.setState({players})}}
          onReady={(player,players) => {console.log('准备完毕', player,players);this.setState({players})}}
          {...this.state.videoJsOptions}
        /> */}
        <audio
          id="player"
          src={selectedAudio.playUrl}
          style={{display:'none'}}
          ref={node => this.videoContainer = node}
          preload="none" controlsList="nodownload"
        ></audio>
      </div>
    );
  }
}

export default Share;
