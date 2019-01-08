import React, { Component } from 'react';
import { connect } from 'dva';
import { Row, Col, Icon, Affix, Modal } from 'antd';
import { stringify } from 'qs';
import request from '@/utils/request';
import DownloadTip from '@/components/DownloadTip';
import LoginTip from '@/components/LoginTip';
import styles from './List.less';
import Jay from '../../assets/jay.jpg';
import Rec from '../../assets/singer/rec3.png';
import Jieshao from '../../assets/singer/jieshao.png';

@connect(({ global }) => ({
  global,
}))
class Share extends Component {
  constructor(props) {
    super(props);
    this.isApp = navigator.userAgent.includes('DongTing') || WebView_isDongTing();
    this.isLogin = navigator.userAgent.includes('DongTing') || WebView_isDongTing();
    this.state = {
      visible: false,
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

  showIntro = (visible) => {
    this.setState({
      visible,
    })
  }

  play = (index) => {
    if(this.isApp) {
      if(this.isLogin) {
        WebView_getGeShouLiveInfo(playId, playType, banner_playurl,banner_title, function(data) {
          console.log(data);
        });
      }else {
        WebView_getGeShouLiveInfo(playId, playType, banner_playurl,banner_title, function(data) {
          console.log(data);
        });
      }
    }else {
      const cid = this.props.location.query.cid;
      const type = parseInt(this.props.location.query.type) || 2;
      const urlParams = new URL(window.location.href);
      window.location.href = `${urlParams.origin}${
        urlParams.pathname
      }#/zhifou/player?cid=${cid}&type=${type}&index=${index}`;
    }
  }

  render() {
    const { visible } = this.state;
    const {
      global: { list = {} },
    } = this.props;
    return (
      <div className={styles.main}>
        <div style={{ backgroundImage: `url("${Jay}")` }} className={styles.main1}>
          {' '}
        </div>
        <div className={styles.div1}>
          <img src={Jay} className={styles.img1} />
          <div className={styles.item1}>
            <div className={styles.p1}>知否？知否？应是绿肥红瘦</div>
            <div className={styles.p2}>配音：花亦如玉、子慕、辰羽</div>
            <div className={styles.p3} onClick={()=>{this.showIntro(true)}}>{'简介：赵丽颖、冯绍峰联袂主演同名电视剧原著小说。关心则乱，经典宅斗种田小说。 由晋江文学城授权、飞科聚力出品、鼎鼎有声制作；华衣如雨、子慕、辰羽、五一先生等众多主播携手演播多人有声剧震撼上线！'.substring(0,28)+'...'}
            <Icon type="right" style={{ }} />
            </div>
          </div>
        </div>
        <div className={styles.div2}>
          <div className={styles.item3}>
            {[1,2,3,4,5].map(v=>
            <div className={styles.title}><div style={{fontWeight: v===1 ? '600' : null}} className={styles.name}>分栏分期</div>
            <div className={v === 1 ? styles.border : ''}></div>
            </div>)}
          </div>
          <div className={styles.play}>
            <Icon onClick={this.play} type="play-circle" style={{fontSize:'0.64rem', marginRight: '0.2333rem' }} />
            <div className={styles.all}>全部播放</div>
            <Icon type="menu-fold" style={{fontSize:'0.64rem' }} />
          </div>
          {[1] &&
            [1,2,3,4,5,6,7].map((v, index) => (
              <div onClick={()=>{if(index < 3){this.play(index)}}} className={index >= 3 && !this.isLogin ? styles.item40 : styles.item4}>
                <div className={styles.index}>{index+1}</div>
                <div className={styles.detail}>
                  <div className={styles.name}>第1集 上：郑秋冬在工厂车间慷慨演</div>
                  <div className={styles.mark}>
                    <div className={styles.time}>2019-01-03</div>
                    <Icon type="clock-circle" style={{fontSize:'0.2933rem', marginLeft: '0.4533rem' }} />
                    <div className={styles.duration}>21:20</div>
                    <Icon type="customer-service" style={{fontSize:'0.2933rem', marginLeft: '0.3467rem' }} />
                    <div className={styles.count}>6260</div>
                  </div>
                </div>
              </div>
            ))}
        </div>
        {!this.isApp ? <DownloadTip /> : null}
        {this.isApp && !this.isLogin ? <LoginTip /> : null}
        {visible ? <div style={{ backgroundImage: `url("${Rec}")` }} className={styles.tanchuang}>
          <div className={styles.title}>知否？知否？应是绿肥红瘦</div>
          <div className={styles.content}>
              <img src={Jieshao} />
              <div className={styles.detail}>
              赵丽颖、冯绍峰联袂主演同名电视剧原著小说。关心则乱，经典宅斗种田小说。 由晋江文学城授权、飞科聚力出品、鼎鼎有声制作；华衣如雨、子慕、辰羽、五一先生等众多主播携手演播多人有声剧震撼上线！
              </div>
          </div>
          <div onClick={()=>{this.showIntro(false)}} className={styles.close}>
            <Icon type="close" />
          </div>
        </div> : null}
      </div>
    );
  }
}

export default Share;
