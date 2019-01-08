import React, { Component } from 'react';
import { connect } from 'dva';
import { Row, Col, Icon, Affix, Modal } from 'antd';
import { stringify } from 'qs';
import request from '@/utils/request';
import VideoJsForReact from '@/components/Videojs';
import DownloadTip from '@/components/DownloadTip';
import styles from './List.less';
import Jay from '../../assets/jay.jpg';
import Play from '../../assets/play.png';
import Pause from '../../assets/pause.png';
import mm from '../../assets/3.mp3';

@connect(({ global }) => ({
  global,
}))
class Share extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: false,
      showFix: true,
      selectedAudio: {},
    };
  }

  componentDidMount() {
    const cid = this.props.location.query.cid;
    const { dispatch } = this.props;
    const params = {
      base: {},
      param: {
        type: 2,
        cid: cid,
      },
    };
    dispatch({
      type: 'global/webview',
      payload: params,
    });
  }

  closeFix = () => {
    this.setState({
      showFix: false,
    });
  };

  downApp = () => {
    window.open('https://fm.tingdao.com/html/h5.html');
  };

  playAudio = (v, index) => {
    const cid = this.props.location.query.cid;
    const type = parseInt(this.props.location.query.type) || 2;
    const urlParams = new URL(window.location.href);
    window.location.href = `${urlParams.origin}${
      urlParams.pathname
    }#/activity/share-player?cid=${cid}&type=${type}&index=${index}`;
  };

  formatterNum = num => {
    if (num < 10) {
      num = `0${num}`;
    }
    return num;
  };

  render() {
    const { showFix, selectedAudio, playing } = this.state;
    const {
      global: { list = {} },
    } = this.props;
    const { content = [], count, detail = [] } = list;
    const detailDetail = detail && detail.length > 0 ? detail[0] : {};
    console.log(this.props);
    return (
      <div className={styles.main}>
        <div style={{ backgroundImage: `url("${Jay}")` }} className={styles.main1}>
          {' '}
        </div>
        <Row className={styles.div1}>
          <img src={Jay} className={styles.img1} />
          <Col className={styles.item1}>{detailDetail.title}</Col>
          <Col className={styles.item2}>
            {/* <span>{detailDetail.title}</span> */}
            <span style={{ marginLeft: '0.2333rem' }}>
              <Icon type="customer-service" style={{ marginRight: '0.2333rem' }} />
              {detailDetail.playCount}
            </span>
          </Col>
          <Col className={styles.item3}>所有节目</Col>
          {content &&
            content.map((v, index) => (
              <Col className={styles.item4}>
                <Row
                  className={selectedAudio === v ? styles.selected : styles.unselected}
                  onClick={() => {
                    this.playAudio(v, index);
                  }}
                >
                  <Col span={4} className={styles.list1}>
                    {this.formatterNum(index + 1)}
                  </Col>
                  <Col span={20} className={styles.list2}>
                    <p className={styles.p1}>{v.title}</p>
                    <p className={styles.p2}>{v.publishName}</p>
                  </Col>
                  {/* <Col span={4} className={styles.list3}>
                    {selectedAudio === v ?<img alt="" src={playing?Pause:Play} /> : null}
                  </Col> */}
                </Row>
              </Col>
            ))}
        </Row>
        <DownloadTip />
        {/* <VideoJsForReact
          sourceChanged={(player,players) => {console.log('准备完毕', player,players);this.setState({players})}}
          onReady={(player,players) => {console.log('准备完毕', player,players);this.setState({players})}}
          {...this.state.videoJsOptions}
        /> */}
        <audio
          id="player"
          src={selectedAudio.playUrl}
          style={{ display: 'none' }}
          ref={node => (this.videoContainer = node)}
          preload="none"
          controlsList="nodownload"
        />
      </div>
    );
  }
}

export default Share;
