import React, { Component } from 'react';
import { connect } from 'dva';
import { Row, Col, Icon, Affix, Modal } from 'antd';
import { stringify } from 'qs';
import request from '@/utils/request';
import DownloadTip from '@/components/DownloadTip';
import LoginTip from '@/components/LoginTip';
import Tip from '@/components/Tip';
import styles from './List.less';
import Jay from '../../assets/bg-play.png';
import Rec from '../../assets/singer/rec3.png';
import Jieshao from '../../assets/singer/jieshao.png';

@connect(({ global }) => ({
  global,
}))
class Share extends Component {
  constructor(props) {
    super(props);
    this.isApp = navigator.userAgent.includes('DongTing') || WebView_isDongTing();
    // this.isLogin = WebView_isLogin();
    this.state = {
      visible: false,
      tipVisible: false,
      nowTheme: {},
      isLogin: WebView_isLogin() ? true : false,
    };
  }

  componentDidMount() {
    this.isApp = navigator.userAgent.includes('DongTing') || WebView_isDongTing();
    this.setState({
      isLogin: WebView_isLogin() ? true : false,
    });
    this.getData();
    console.log("isLogin:", WebView_isLogin() ? true : false); // 判断登录信息
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  getData = () => {
    const { dispatch } = this.props;
    const params = {
      "base": {
        "userid": "1810232029531260",
        "caller": "18514281314",
        "imei": "db658275cf708690c350ec01b3f6e863db6627a4",
        "ua": "apple|iPhone|iPhone9,1|12.0.1|750*1334",
        "version": "2.1",
        "osid": "ios",
        "apn": "wifi",
        "df": "22010000"
      }, 
      "param": {},
    };
    dispatch({
      type: 'global/zhifou',
      payload: params,
      callback: () => {
        const {global: {queryZhifou}} = this.props;
        const {data_list = []} = queryZhifou;
        if(data_list.length > 0) {
          this.setState({nowTheme: data_list[0]});
          this.getList(data_list[0]);
        }
      }
    });
  };

  getList = (v) => {
    const { dispatch } = this.props;
    const params = {
      base: {},
      param: {
        type: v.type,
        cid: v.themeid,
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
    const {isLogin} = this.state;
    const {
      global: { list = {}},
    } = this.props;
    const { content = []} = list;
    const nowDetail = (content.length>0 && content[index||0]) || {};
    const {nowTheme} = this.state;
    const themeid = nowTheme.themeid;
    const type = parseInt(nowTheme.type);
    const urlParams = new URL(window.location.href);
    if(this.isApp) {
      if(isLogin) {
        WebView_playInApp(type, nowDetail.id, themeid, nowDetail.playUrl, function(data) {
          console.log(data);
        });
      }else {
        this.startTimeout();
        WebView_playInApp(type, nowDetail.id, themeid, nowDetail.playUrl, function(data) {
          console.log(data);
        });
      }
    }else {
      if(type && themeid) {
        window.location.href = `${urlParams.origin}${
          urlParams.pathname
        }#/zhifou/player?cid=${themeid}&type=${type}&index=${index}`;
      }
    }
  }

  startTimeout = () => {
    this.timer = setTimeout(this.openTip,120000);
  }

  showTheme = (nowTheme) => {
    this.setState({nowTheme},this.getList(nowTheme))
  }

  // 格式化时间
  formatterTime = (time) => {
    time = time/1000;
    let hours = Math.floor(Math.round(time) / 3600);
    let minutes = Math.floor(Math.round(time) % 3600 / 60);
    let seconds = Math.floor(Math.round(time) % 60);
    minutes = minutes.toString().padStart(2,'0').substr('-2');
    seconds = seconds.toString().padStart(2,'0').substr('-2');
    return hours ? `${hours}:${minutes}:${seconds}` : `${minutes}:${seconds}`;
  }

  openTip = ()=> {
    this.setState({
      tipVisible: true
    })
  }

  closeTip = (flag)=> {
    this.setState({
      tipVisible: false
    },()=>{if(!flag){this.startTimeout()}})
  }

  setLogin = (e) => {
    if(e) {
      this.setState({isLogin: true})
    }
  }

  render() {
    const { visible, nowTheme, tipVisible, isLogin } = this.state;
    const {
      global: { list = {}, queryZhifou = {} },
    } = this.props;
    const {data_list = []} = queryZhifou;
    const { content = [], count, detail = [] } = list;
    const detailDetail = detail && detail.length > 0 ? detail[0] : {};
    console.log(this.state,this.props,this.isApp,isLogin)
    return (
      <div className={styles.main}>
        <div
          style={{ backgroundImage:`url("${detailDetail.imgUrl || Jay}")` }}
          className={styles.main1}
        >
          {' '}
        </div>
        <div className={styles.div1}>
          <img src={detailDetail.imgUrl || Jay} className={styles.img1} />
          <div className={styles.item1}>
            <div className={styles.p1}>{detailDetail.title}</div>
            <div className={styles.p2}>{detailDetail.subhead&&detailDetail.subhead.length>14 ? `${detailDetail.subhead.substring(0,15)}...` : detailDetail.subhead}</div>
            <div className={styles.p3} onClick={()=>{this.showIntro(true)}}>{detailDetail.summary&&detailDetail.summary.length>28 ? `${detailDetail.summary.substring(0,30)}...` : detailDetail.summary}
            <Icon type="right" className={styles.icon} />
            </div>
          </div>
        </div>
        <div className={styles.div2}>
          <div className={styles.item3}>
            {data_list.length>0&&data_list.map(v=>
            <div onClick={()=>{this.showTheme(v)}} className={styles.title}><div style={{fontWeight: v.id===nowTheme.id ? '600' : null}} className={styles.name}>{v.title}</div>
            <div className={v.id===nowTheme.id ? styles.border : ''}></div>
            </div>)}
          </div>
          <div className={styles.play}>
            <Icon onClick={this.play} type="play-circle" style={{fontSize:'0.64rem', marginRight: '0.2333rem' }} />
            <div className={styles.all}>全部播放</div>
            <Icon type="menu-fold" style={{fontSize:'0.64rem', display: 'none' }} />
          </div>
          {content.length > 0 &&
            content.map((v, index) => (
              <div onClick={()=>{if(index < 3 || isLogin){this.play(index)}else{this.openTip()}}} className={index >= 3 && !isLogin ? styles.item40 : styles.item4}>
                <div className={styles.index}>{index+1}</div>
                <div className={styles.detail}>
                  <div className={styles.name}>{v.title}</div>
                  <div className={styles.mark}>
                    <div className={styles.time}>{v.broadcastTime&&v.broadcastTime.substring(0,10)}</div>
                    <Icon type="clock-circle" style={{ marginLeft: '0.4533rem' }} />
                    <div className={styles.duration}>{this.formatterTime(v.duration)}</div>
                    <Icon type="customer-service" style={{ marginLeft: '0.3467rem' }} />
                    <div className={styles.count}>{v.playCount}</div>
                  </div>
                </div>
              </div>
            ))}
        </div>
        {!this.isApp ? <DownloadTip style={{position: 'fixed'}} /> : null}
        {this.isApp && !isLogin ? <LoginTip setLogin={this.setLogin} style={{position: 'fixed'}} /> : null}
        {visible ? <div style={{ backgroundImage: `url("${Rec}")` }} className={styles.tanchuang}>
          <div className={styles.head}>
            <div className={styles.border}>
              <div className={styles.title}>{detailDetail.title}</div>
              <div className={styles.subhead}>{detailDetail.subhead}</div>
            </div>
          </div>
          <div className={styles.content}>
              <img src={Jieshao} />
              <div className={styles.detail}>
              {detailDetail.summary}
              </div>
          </div>
          <div onClick={()=>{this.showIntro(false)}} className={styles.close}>
            <Icon type="close" />
          </div>
        </div> : null}
        {tipVisible ? <Tip setLogin={this.setLogin} close={this.closeTip}/> : null}
      </div>
    );
  }
}

export default Share;
