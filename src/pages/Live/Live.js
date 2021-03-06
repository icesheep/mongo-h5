/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
// import { connect } from 'dva';
import { Row, Col, Icon, Affix, Modal } from 'antd';
import TweenOne from 'rc-tween-one';
import moment from 'moment';
// import VideoJsForReact from 'videojs-for-react';
import VideoJsForReact from '@/components/Videojs';
import styles from './Live.less';
import Pic from '../../assets/p1.png';
import Pic1 from '../../assets/1.png';
import Pic2 from '../../assets/2.png';
import Pic3 from '../../assets/3.png';
import Pic4 from '../../assets/4.png';
import Pic5 from '../../assets/5.png';
import Pic6 from '../../assets/6.png';
import Play from '../../assets/play.png';
import Pause from '../../assets/pause.png';
import PlayGray from '../../assets/play-gray.png';
import PauseGray from '../../assets/pause-gray.png';
import Wave from '../../assets/wave.png';
import playBg from '../../assets/bg-play.jpg';
import playLive from '../../assets/player_live.png';
import bgLive from '../../assets/bg-live.jpg';
import music3 from '../../assets/3.mp3';
import mgLogo from '../../assets/mgdt_logo.png';
import Pic11 from '../../assets/p11.png';
import Pic12 from '../../assets/p12.png';
import Pic13 from '../../assets/p13.png';
import Pic14 from '../../assets/p14.png';
import Pic15 from '../../assets/p15.png';
import Pic16 from '../../assets/p16.png';
import Pic17 from '../../assets/p17.png';
import Pic18 from '../../assets/p18.png';
import Pic19 from '../../assets/p19.png';
import Pic20 from '../../assets/p20.png';
import Pic21 from '../../assets/p21.png';
import Pic22 from '../../assets/p22.png';
import Pic23 from '../../assets/p23.png';

//活动开始时间
const activityStartTime = '2018-12-31 15:00:00';
const activityendTime = '2019-01-01 00:30:00';
// 往期活动列表
const lastPlayList = [
  /**{
    id: '2018',
    title: '2017-2018跨年演唱会', 
    desc: '震撼升级的跨年演唱会，即将点燃激情， 唱响青春，为全新的2019年揭开精彩…',
    imgsrc: Pic1,
    playsrc: music3,
  },**/
  /**********
  {
    id: '2018',
    title: '2017-2018跨年演唱会',
    desc: '张惠妹献唱经典温暖如初',
    imgsrc: Pic1,
    playsrc: 'http://mgtj-live.oss-cn-shanghai.aliyuncs.com/hi/tdbucketaudio_2017-2018%E6%B9%96%E5%8D%97%E5%8D%AB%E8%A7%86%E8%B7%A8%E5%B9%B4%E6%BC%94%E5%94%B1%E4%BC%9A_128.aac',
  },
  {
    id: '2017',
    title: '2016-2017跨年演唱会',
    desc: '张杰六连唱十年金曲超燃LIVE',
    imgsrc: Pic2,
    playsrc: 'http://mgtj-live.oss-cn-shanghai.aliyuncs.com/hi/tdbucketaudio_2016-2017%E6%B9%96%E5%8D%97%E5%8D%AB%E8%A7%86%E8%B7%A8%E5%B9%B4%E6%BC%94%E5%94%B1%E4%BC%9A_128.aac',
  },
  {
    id: '2016',
    title: '2015-2016跨年演唱会',
    desc: '“四大三小”首次同台PK',
    imgsrc: Pic3,
    playsrc: 'http://mgtj-live.oss-cn-shanghai.aliyuncs.com/hi/tdbucketaudio_2015-2016%E6%B9%96%E5%8D%97%E5%8D%AB%E8%A7%86%E8%B7%A8%E5%B9%B4%E6%BC%94%E5%94%B1%E4%BC%9A_128.aac',
  },
  {
    id: '2015',
    title: '2014-2015跨年演唱会',
    desc: '李宇春零点压轴演绎十年金曲',
    imgsrc: Pic4,
    playsrc: 'http://mgtj-live.oss-cn-shanghai.aliyuncs.com/hi/tdbucketaudio_2014-2015%E6%B9%96%E5%8D%97%E5%8D%AB%E8%A7%86%E8%B7%A8%E5%B9%B4%E6%BC%94%E5%94%B1%E4%BC%9A_128.aac',
  },
  {
    id: '2014',
    title: '2013-2014跨年演唱会',
    desc: '华晨宇再现花式咆哮音',
    imgsrc: Pic5,
    playsrc: 'http://mgtj-live.oss-cn-shanghai.aliyuncs.com/hi/tdbucketaudio_2013-2014%E6%B9%96%E5%8D%97%E5%8D%AB%E8%A7%86%E8%B7%A8%E5%B9%B4%E6%BC%94%E5%94%B1%E4%BC%9A_128.aac',
  },
  {
    id: '2013',
    title: '2012-2013跨年演唱会',
    desc: '刘德华实力来袭引全场欢呼',
    imgsrc: Pic6,
    playsrc: 'http://mgtj-live.oss-cn-shanghai.aliyuncs.com/hi/tdbucketaudio_2012-2013%E6%B9%96%E5%8D%97%E5%8D%AB%E8%A7%86%E8%B7%A8%E5%B9%B4%E6%BC%94%E5%94%B1%E4%BC%9A_128.aac',
  },***********/
  {
    id: '1',
    title: '汪涵',
    desc: '邀你参加跨年演唱会',
    imgsrc: Pic11,
    playsrc:
      'http://mgtj-live.oss-cn-shanghai.aliyuncs.com/hi/v1/%E6%B1%AA%E6%B6%B5%E9%82%80%E4%BD%A0%E5%8F%82%E5%8A%A0%E8%B7%A8%E5%B9%B4%E6%BC%94%E5%94%B1%E4%BC%9A.mp3',
  },
  {
    id: '2',
    title: '何炅',
    desc: '发来跨年邀请函！',
    imgsrc: Pic12,
    playsrc:
      'http://mgtj-live.oss-cn-shanghai.aliyuncs.com/hi/v1/%E4%BD%95%E7%82%85%E5%8F%91%E6%9D%A5%E8%B7%A8%E5%B9%B4%E9%82%80%E8%AF%B7%E5%87%BD%EF%BC%81.mp3',
  },
  {
    id: '3',
    title: 'TFBOYS',
    desc: '发来的添福套餐你收到了吗？',
    imgsrc: Pic13,
    playsrc:
      'http://mgtj-live.oss-cn-shanghai.aliyuncs.com/hi/v1/TFBOYS%E5%8F%91%E6%9D%A5%E7%9A%84%E6%B7%BB%E7%A6%8F%E5%A5%97%E9%A4%90%E4%BD%A0%E6%94%B6%E5%88%B0%E4%BA%86%E5%90%97%EF%BC%9F.mp3',
  },
  {
    id: '4',
    title: '朱一龙',
    desc: '能量套餐来给你充电啦',
    imgsrc: Pic14,
    playsrc:
      'http://mgtj-live.oss-cn-shanghai.aliyuncs.com/hi/v1/%E6%9C%B1%E4%B8%80%E9%BE%99%E7%9A%84%E8%83%BD%E9%87%8F%E5%A5%97%E9%A4%90%E6%9D%A5%E7%BB%99%E4%BD%A0%E5%85%85%E7%94%B5%E5%95%A6.mp3',
  },
  {
    id: '5',
    title: '火箭少女101',
    desc: '带你迎接新鲜2019',
    imgsrc: Pic15,
    playsrc:
      'http://mgtj-live.oss-cn-shanghai.aliyuncs.com/hi/v1/%E7%81%AB%E7%AE%AD%E5%B0%91%E5%A5%B3101%E5%B8%A6%E4%BD%A0%E8%BF%8E%E6%8E%A5%E6%96%B0%E9%B2%9C2019.mp3',
  },
  {
    id: '6',
    title: '吴青峰',
    desc: '带你听跨年夜的暖暖清流',
    imgsrc: Pic16,
    playsrc:
      'http://mgtj-live.oss-cn-shanghai.aliyuncs.com/hi/v1/%E5%90%B4%E9%9D%92%E5%B3%B0%E5%B8%A6%E4%BD%A0%E5%90%AC%E8%B7%A8%E5%B9%B4%E5%A4%9C%E7%9A%84%E6%9A%96%E6%9A%96%E6%B8%85%E6%B5%81.mp3',
  },
  {
    id: '7',
    title: '田馥甄',
    desc: '和你一起甜蜜跨年！',
    imgsrc: Pic17,
    playsrc:
      'http://mgtj-live.oss-cn-shanghai.aliyuncs.com/hi/v1/%E9%87%91%E5%BF%97%E6%96%87%E9%98%BF%E4%BA%91%E6%97%B6%E9%80%81%E8%BE%BE%E8%83%BD%E9%87%8F%E5%A5%97%E9%A4%90.mp3',
  },
  {
    id: '8',
    title: '梁静茹',
    desc: '和你一起度过暖暖跨年夜',
    imgsrc: Pic18,
    playsrc:
      'http://mgtj-live.oss-cn-shanghai.aliyuncs.com/hi/v1/%E6%A2%81%E9%9D%99%E8%8C%B9%E5%92%8C%E4%BD%A0%E4%B8%80%E8%B5%B7%E5%BA%A6%E8%BF%87%E6%9A%96%E6%9A%96%E8%B7%A8%E5%B9%B4%E5%A4%9C.mp3',
  },
  {
    id: '9',
    title: '杨紫',
    desc: '为你送上鲜美套餐',
    imgsrc: Pic19,
    playsrc:
      'http://mgtj-live.oss-cn-shanghai.aliyuncs.com/hi/v1/%E6%9D%A8%E7%B4%AB%E4%B8%BA%E4%BD%A0%E9%80%81%E4%B8%8A%E9%B2%9C%E7%BE%8E%E5%A5%97%E9%A4%90.mp3',
  },
  {
    id: '10',
    title: '冯绍峰',
    desc: '品尝快乐套餐',
    imgsrc: Pic20,
    playsrc:
      'http://mgtj-live.oss-cn-shanghai.aliyuncs.com/hi/v1/%E5%93%81%E5%B0%9D%E5%86%AF%E7%BB%8D%E5%B3%B0%E7%9A%84%E5%BF%AB%E4%B9%90%E5%A5%97%E9%A4%90.mp3',
  },
  {
    id: '11',
    title: '刘涛',
    desc: '已准备好最经典的跨年套餐',
    imgsrc: Pic21,
    playsrc:
      'http://mgtj-live.oss-cn-shanghai.aliyuncs.com/hi/v1/%E5%88%98%E6%B6%9B%E5%B7%B2%E5%87%86%E5%A4%87%E5%A5%BD%E6%9C%80%E7%BB%8F%E5%85%B8%E7%9A%84%E8%B7%A8%E5%B9%B4%E5%A5%97%E9%A4%90.mp3',
  },
  {
    id: '12',
    title: '金志文、声入人心歌手',
    desc: '送达能量套餐',
    imgsrc: Pic22,
    playsrc:
      'http://mgtj-live.oss-cn-shanghai.aliyuncs.com/hi/v1/%E9%87%91%E5%BF%97%E6%96%87%E9%98%BF%E4%BA%91%E6%97%B6%E9%80%81%E8%BE%BE%E8%83%BD%E9%87%8F%E5%A5%97%E9%A4%90.mp3',
  },
  {
    id: '13',
    title: '沈月、陈翔',
    desc: '已做好跨年套餐',
    imgsrc: Pic23,
    playsrc:
      'http://mgtj-live.oss-cn-shanghai.aliyuncs.com/hi/v1/%E6%B2%88%E6%9C%88%E9%99%88%E7%BF%94%E5%B7%B2%E5%81%9A%E5%A5%BD%E8%B7%A8%E5%B9%B4%E5%A5%97%E9%A4%90.mp3',
  },
];
class Live extends Component {
  state = {
    showFix: false,
    activityEnd: false, //直播结束
    lastTime: '', //倒计时
    livingTime: '', //直播时间
    startLive: moment().isAfter(moment(activityStartTime)), //直播开始、停止
    players: null, //直播播放控件
    playing: false, //往期录播播放状态
    playingLast: false, //正在播放的往期节目id
    videoJsOptions: {
      preload: 'auto', // 预加载
      bigPlayButton: {}, // 大按钮
      autoplay: false, // 自动播放
      controls: true, // 是否开启控制栏
      width: 0, // 播放器宽度
      height: 0, // 播放器高度
      playbackRates: [1, 1.5, 2], // 播放倍速
      sources: [
        // 视频源
        {
          src: 'http://mgtj-live.oss-cn-shanghai.aliyuncs.com/h2/index.m3u8', //音频地址
          type: 'application/x-mpegURL', //音频类型m3u8：application/x-mpegURL，mp3、mp4：video/mp4
          label: 'HLS1',
          withCredentials: false,
          res: 960,
        },
      ],
    },
  };

  componentDidMount() {
    this.loopData();
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
    cancelAnimationFrame(this.requestRef);
    clearTimeout(this.timer2);
    cancelAnimationFrame(this.requestRef2);
  }

  // 开始直播
  startLive = () => {
    // this.setState({startLive: true})
    // this.livingData();
  };

  closeFix = () => {
    this.setState({
      showFix: false,
    });
  };

  downApp = () => {
    window.open('https://fm.tingdao.com/html/h5.html');
  };

  // 直播播放、暂停功能
  play = () => {
    const { players, playing, playingLast } = this.state;
    // console.log(players.currentTime(),players.duration())
    if (playing) {
      this.setState(
        {
          playing: false,
        },
        () => {
          players.pause();
        }
      );
    } else {
      this.setState(
        {
          playing: true,
        },
        () => {
          // players.play();
          let playPromise = players.play();
          if (playPromise) {
            playPromise
              .then(() => {
                // 音频加载成功
                setTimeout(() => {
                  // 后续操作
                  console.log('done');
                }, 1000); // audio.duration 为音频的时长单位为秒
              })
              .catch(e => {
                console.log('Operation is too fast, audio play fails');
              });
          }
          if (playingLast) {
            this.playLastAudio(lastPlayList.find(e => e.id === playingLast));
          }
        }
      );
    }
  };

  // 刷新倒计时
  loopData = () => {
    this.requestRef = requestAnimationFrame(() => {
      this.timer = setTimeout(() => {
        const deadTime = moment(activityStartTime);
        const now = moment();
        if (deadTime.isAfter(now)) {
          const temp = deadTime.diff(now, 'seconds');
          const day = Math.floor(temp / 86400);
          const hour = Math.floor((temp % 86400) / 3600);
          const minute =
            Math.floor((temp % 3600) / 60) && `${Math.floor((temp % 3600) / 60)}`.length < 2
              ? `0${Math.floor((temp % 3600) / 60)}`
              : Math.floor((temp % 3600) / 60);
          const second =
            (temp % 3600) % 60 && `${(temp % 3600) % 60}`.length < 2
              ? `0${(temp % 3600) % 60}`
              : (temp % 3600) % 60;
          const str = `${day > 0 ? `${day}天` : ''} ${hour}: ${minute}: ${second}`;
          this.setState(
            {
              lastTime: str,
            },
            () => {
              this.loopData();
            }
          );
        } else {
          clearTimeout(this.timer);
          cancelAnimationFrame(this.requestRef);
          this.setState(
            {
              startLive: true,
            },
            this.livingData
          );
        }
      }, 1000);
    });
  };

  // 刷新直播时间
  livingData = () => {
    this.requestRef2 = requestAnimationFrame(() => {
      this.timer2 = setTimeout(() => {
        const deadTime = moment(activityStartTime);
        const endTime = moment(activityendTime);
        const now = moment();
        if (!deadTime.isAfter(now) && endTime.isAfter(now)) {
          const temp = now.diff(deadTime, 'seconds');
          const hour = Math.floor(temp / 3600);
          const minute =
            Math.floor((temp % 3600) / 60) && `${Math.floor((temp % 3600) / 60)}`.length < 2
              ? `0${Math.floor((temp % 3600) / 60)}`
              : Math.floor((temp % 3600) / 60);
          const second =
            (temp % 3600) % 60 && `${(temp % 3600) % 60}`.length < 2
              ? `0${(temp % 3600) % 60}`
              : (temp % 3600) % 60;
          const str = `${hour}: ${minute}: ${second}`;
          this.setState(
            {
              livingTime: str,
            },
            () => {
              this.livingData();
            }
          );
        } else {
          clearTimeout(this.timer2);
          cancelAnimationFrame(this.requestRef2);
          this.setState({
            startLive: false,
            activityEnd: now.isAfter(endTime),
          });
        }
      }, 1000);
    });
  };

  // 往期音频播放、暂停
  playLastAudio = v => {
    const { players, playing, playingLast } = this.state;
    if (v) {
      if (playingLast === v.id) {
        this.setState(
          {
            playingLast: false,
          },
          () => {
            this.videoContainer.pause();
          }
        );
      } else {
        this.setState(
          {
            playingLast: v.id,
            playing: false,
          },
          () => {
            if (playing) {
              players.pause();
            }
            if (this.videoContainer.src !== v.playsrc) {
              this.videoContainer.src = v.playsrc;
            }
            this.videoContainer.play();
          }
        );
      }
    } else {
      this.setState({
        playingLast: false,
      });
    }
  };

  getHeight = i =>
    this.state.playing
      ? (this.wave && Math.random() * this.wave.clientHeight) || 0
      : (this.wave && (this.wave.clientHeight * i) / 10) || 0;

  render() {
    const {
      showFix,
      lastTime,
      startLive,
      playing,
      livingTime,
      playingLast,
      activityEnd,
    } = this.state;
    // console.log(this.state)
    return (
      <div className={styles.main}>
        {showFix ? (
          <Row className={styles.fix1}>
            <Icon type="close" className={styles.close} onClick={this.closeFix} />
            <Col span={4}>
              <img src={mgLogo} />
            </Col>
            <Col span={14} className={styles.p1}>
              芒果动听APP 邀您一起加入
              <br /> 加油美好生活！
            </Col>
            <Col span={6} className={styles.p2} onClick={this.downApp}>
              下载APP
            </Col>
          </Row>
        ) : null}
        {startLive ? (
          //直播页面
          <Row className={styles.div1}>
            <div style={{ backgroundImage: bgLive }} className={styles.bglive}>
              <Col className={styles.item7} onClick={this.play}>
                <img alt="" src={playing ? PauseGray : PlayGray} />
              </Col>
              <Col className={styles.item8}>2019湖南卫视跨年演唱会</Col>
              <img className={styles.item9} src={playLive} />
              <Col className={styles.item10}>
                {/* <img alt="" src={Wave} /> */}
                <div
                  className={styles.wave}
                  ref={ref => {
                    this.wave = ref;
                  }}
                >
                  <TweenOne
                    animation={{
                      height: this.getHeight(2),
                    }}
                    className={styles.wave1}
                  />
                  <TweenOne
                    animation={{
                      height: this.getHeight(6),
                    }}
                    className={styles.wave1}
                  />
                  <TweenOne
                    animation={{
                      height: this.getHeight(10),
                    }}
                    className={styles.wave1}
                  />
                  <TweenOne
                    animation={{
                      height: this.getHeight(10),
                    }}
                    className={styles.wave1}
                  />
                  <TweenOne
                    animation={{
                      height: this.getHeight(6),
                    }}
                    className={styles.wave1}
                  />
                  <TweenOne
                    animation={{
                      height: this.getHeight(2),
                    }}
                    className={styles.wave1}
                  />
                </div>
                {livingTime ? <div className={styles.d1}>{livingTime}</div> : null}
              </Col>
            </div>
            <div style={{ backgroundColor: '#191955', paddingTop: '1px' }}>
              {/* 如需要多个活动页面，复制下面代码，配置图片和文字 */}
              <Col className={styles.item4}>
                <img alt="" src={playBg} />
              </Col>
              <Col className={styles.item5}>
                青春盛典，等你集结！
                <br />
                唱响美好，一起跨年！
                <br />
                湖南卫视2018-2019跨年演唱会，
                <br />
                带你聆听美好，告白新时代！
              </Col>
              {/* */}
            </div>
          </Row>
        ) : !activityEnd ? (
          // 预热页面
          <Row className={styles.div1}>
            <div style={{ backgroundImage: bgLive }} className={styles.bglive}>
              <Col className={styles.item1}>2019湖南卫视跨年演唱会</Col>
              <Col className={styles.item1}>即将呈现</Col>
              <Col className={styles.item2}>
                时间：2018年12月31日 <br />
                地点：广州萝岗演艺中心 <br />
                参演嘉宾：TFboys、冯绍峰、朱一龙、张艺兴、火箭少女101、韩红、谭维维、华晨宇、罗志祥、梁静茹、吴青峰、HEBE田馥甄、刘涛、杨紫、芒果群星等
              </Col>
              <Col className={styles.item3} onClick={this.startLive}>
                <div className={styles.p1}>距离开始</div>
                <div className={styles.p2}>{lastTime}</div>
              </Col>
            </div>
            <div style={{ backgroundColor: '#191955' }}>
              <Col className={styles.item4}>
                <img alt="" src={bgLive} />
              </Col>
              <Col className={styles.item5}>
                青春盛典，等你集结！
                <br />
                唱响美好，一起跨年！
                <br />
                湖南卫视2018-2019跨年演唱会，
                <br />
                带你聆听美好，告白新时代！
              </Col>
            </div>
          </Row>
        ) : (
          // 直播结束页面
          <Row className={styles.div1}>
            <div style={{ backgroundImage: bgLive }} className={styles.bglive}>
              <Col className={styles.item1}>2019湖南卫视跨年演唱会</Col>
              <Col className={styles.item2}>
                时间：2018年12月31日 <br />
                地点：广州萝岗演艺中心 <br />
                参演嘉宾：TFboys、冯绍峰、朱一龙、张艺兴、火箭少女101、韩红、谭维维、华晨宇、罗志祥、梁静茹、吴青峰、HEBE田馥甄、刘涛、杨紫、芒果群星等
              </Col>
              <Col className={styles.item3}>
                <div className={styles.p1}>直播已结束</div>
              </Col>
            </div>
            <div style={{ backgroundColor: '#191955' }}>
              <Col className={styles.item4}>
                <img alt="" src={bgLive} />
              </Col>
              <Col className={styles.item5}>
                青春盛典，等你集结！
                <br />
                唱响美好，一起跨年！
                <br />
                湖南卫视2018-2019跨年演唱会，
                <br />
                带你聆听美好，告白新时代！
              </Col>
            </div>
          </Row>
        )}
        {/* 往期列表 */}
        <Row>
          <Col className={styles.item6}>跨年演唱会宣传片</Col>
        </Row>
        {lastPlayList.map(v => (
          <Row
            className={styles.div2}
            onClick={() => {
              this.playLastAudio(v);
            }}
          >
            <Col span={5} className={styles.leftcol}>
              <img alt="" src={v.imgsrc} />
            </Col>
            <Col span={16} className={styles.rightcol}>
              <p className={styles.p1}>
                <span style={{ color: playingLast === v.id ? '#EB032A' : '' }}>{v.title}</span>
                {playingLast === v.id ? <div className={styles.p3}>播放中</div> : null}
              </p>
              <p className={styles.p2}>{v.desc}</p>
            </Col>
            <Col span={3} className={styles.playCol}>
              <img alt="" src={playingLast !== v.id ? Play : Pause} />
            </Col>
          </Row>
        ))}
        {/* 往期音频播放控件 */}
        <audio
          id="player"
          src={lastPlayList[0].playsrc}
          style={{ display: 'none' }}
          ref={node => (this.videoContainer = node)}
          preload="none"
          controlsList="nodownload"
          onEnded={this.playLastAudio}
        />
        {/* 直播音频播放控件 */}
        <VideoJsForReact
          sourceChanged={(player, players) => {
            console.log('准备完毕', player, players);
            this.setState({ players });
          }}
          onReady={(player, players) => {
            console.log('准备完毕', player, players);
            this.setState({ players });
          }}
          {...this.state.videoJsOptions}
        />
      </div>
    );
  }
}

export default Live;
