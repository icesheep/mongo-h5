/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
// import { connect } from 'dva';
import { Row, Col } from 'antd';
import moment from 'moment';
// import VideoJsForReact from 'videojs-for-react';
import VideoJsForReact from '@/components/Videojs';
import styles from './Live.less';
import Pic from '../../assets/p1.png';
import Play from '../../assets/play.png';
import Pause from '../../assets/pause.png';
import PlayGray from '../../assets/play-gray.png';
import PauseGray from '../../assets/pause-gray.png';
import Wave from '../../assets/wave.png';
import playBg from '../../assets/bg-play.png';
import playLive from '../../assets/player_live.png';
import bgLive from '../../assets/bg-live.png';
import music1 from '../../assets/1.mp3';
import music2 from '../../assets/2.mp3';
import music3 from '../../assets/3.mp3';

const lastPlayList = [
  {
    id: '2018',
    title: '2018跨年演唱会',
    desc: '震撼升级的跨年演唱会，即将点燃激情， 唱响青春，为全新的2019年揭开精彩…',
    imgsrc: Pic,
    playsrc: music1,
  },
  {
    id: '2017',
    title: '2017跨年演唱会',
    desc: '张惠妹献唱经典温暖如初',
    imgsrc: Pic,
    playsrc: music2,
  },
  {
    id: '2016',
    title: '2016跨年演唱会',
    desc: '张杰六连唱十年金曲超燃LIVE',
    imgsrc: Pic,
    playsrc: music3,
  },
]
class Live extends Component {
  state = {
    lastTime: '',
    livingTime: '',
    startLive: false,
    players: null,
    playing: false,
    playingLast: false,
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
          src: 'http://prertmp.tingdao.com:91/index.m3u8',
          type: 'application/x-mpegURL',
          label: 'HLS1',
          withCredentials: false,
          res: 960
        }
      ]
    }
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

  startLive = () => {
    this.setState({startLive: true})
  }

  play = () => {
    const {players,playing} = this.state;
    console.log(players.currentTime())
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

  loopData = () => {
    this.requestRef = requestAnimationFrame(() => {
      this.timer = setTimeout(() => {
        const deadTime = moment('2018-12-31 21:00:00');
        const now = moment();
        if(deadTime.isAfter(now)) {
          const temp = deadTime.diff(now,'seconds')
          const day = Math.floor(temp/86400)
          const hour = Math.floor(temp%86400/3600)
          const minute = Math.floor(temp%3600/60)&&`${Math.floor(temp%3600/60)}`.length<2 ? `0${Math.floor(temp%3600/60)}` : Math.floor(temp%3600/60)
          const second = temp%3600%60&&`${temp%3600%60}`.length<2 ? `0${temp%3600%60}` : temp%3600%60
          const str = `${day>0 ? `${day}天` : ''} ${hour}: ${minute}: ${second}`
          this.setState(
            {
              lastTime: str,
            },
            () => {
              this.loopData();
            }
          );
        }else {
          clearTimeout(this.timer);
          cancelAnimationFrame(this.requestRef);
          this.setState(
            {
              startLive: true,
            }
          );
        }
      }, 1000);
    });
  };

  livingData = () => {
    this.requestRef2 = requestAnimationFrame(() => {
      this.timer2 = setTimeout(() => {
        const deadTime = moment('2018-12-31 21:00:00');
        const now = moment();
        if(!deadTime.isAfter(now)) {
          const temp = deadTime.diff(now,'seconds')
          const hour = Math.floor(temp/3600)
          const minute = Math.floor(temp%3600/60)&&`${Math.floor(temp%3600/60)}`.length<2 ? `0${Math.floor(temp%3600/60)}` : Math.floor(temp%3600/60)
          const second = temp%3600%60&&`${temp%3600%60}`.length<2 ? `0${temp%3600%60}` : temp%3600%60
          const str = `${hour}: ${minute}: ${second}`
          this.setState(
            {
              livingTime: str,
            },
            () => {
              this.livingData();
            }
          );
        }else {
          clearTimeout(this.timer2);
          cancelAnimationFrame(this.requestRef2);
          this.setState(
            {
              startLive: false,
            }
          );
        }
      }, 1000);
    });
  };

  playLastAudio = (v) => {
    console.log(v,this.videoContainer.src )
    const {playingLast} = this.state;
    if(playingLast === v.id) {
      this.setState({
        playingLast: false,
      }, ()=>{
        this.videoContainer.pause();
      })
    }else {
      this.setState({
        playingLast: v.id,
      }, ()=>{
        this.videoContainer.src  = v.playsrc;
        this.videoContainer.play();
      })
    }
  }

  render() {
    const {lastTime, startLive, playing, livingTime, playingLast} = this.state;
    return (
      <div className={styles.main}>
        {startLive ? 
          <Row className={styles.div1}>
            <div style={{backgroundImage: bgLive}} className={styles.bglive}> </div>
            {/* <ReactPlayer url="http://prertmp.tingdao.com:91/index.m3u8" controls loop /> */}
            <VideoJsForReact
              sourceChanged={(player,players) => {console.log('准备完毕', player,players);this.setState({players})}}
              onReady={(player,players) => {console.log('准备完毕', player,players);this.setState({players})}}
              {...this.state.videoJsOptions}
            />
            <Col className={styles.item7} onClick={this.play}><img alt="" src={playing ? PauseGray:PlayGray} /></Col>
            <Col className={styles.item8}>2019湖南卫视跨年演唱会</Col>
            <img className={styles.item9} src={playLive} />
            <Col className={styles.item10}>
              <img alt="" src={Wave} />
              {livingTime ? <div className={styles.d1}>{livingTime}</div> : null}
            </Col>
            <Col className={styles.item4}>
              <img alt="" src={playBg} />
            </Col>
            <Col className={styles.item5}>
              今年，湖南卫视跨年演唱会即将携全面升级的概念、互动、 舞台以及阵容，重磅开启。震撼升级的跨年演唱会，即将 点燃激情，唱响青春，为全新的2019年揭开精彩序章。
            </Col>
            
          </Row>:
          <Row className={styles.div1}>
            <div style={{backgroundImage: bgLive}} className={styles.bglive}> </div>
            <Col className={styles.item1}>2019湖南卫视跨年演唱会</Col>
            <Col className={styles.item1}>即将呈现</Col>
            <Col className={styles.item2}>节目简介：自2005年开创国内跨年演唱会先河起，湖南卫视 十三年间打造出了国内最具影响力和价值的跨年品牌。</Col>
            <Col className={styles.item3} onClick={this.startLive}>
              <div className={styles.p1}>距离开始</div>
              <div className={styles.p2}>{lastTime}</div>
            </Col>
            <Col className={styles.item4}>
              <img alt="" src={bgLive} />
            </Col>
            <Col className={styles.item5}>
              今年，湖南卫视跨年演唱会即将携全面升级的概念、互动、 舞台以及阵容，重磅开启。震撼升级的跨年演唱会，即将 点燃激情，唱响青春，为全新的2019年揭开精彩序章。
            </Col>
          </Row>}
        <Row>
          <Col className={styles.item6}>
            往期跨年直播
          </Col>
        </Row>
        {lastPlayList.map(v => 
          <Row className={styles.div2} onClick = {()=>{this.playLastAudio(v)}}>
          <Col span={5} className={styles.leftcol}><img alt="" src={v.imgsrc} /></Col>
          <Col span={16} className={styles.rightcol}>
            <p className={styles.p1}><span style={{color: playingLast===v.id ?'#EB032A':''}}>{v.title}</span>{playingLast===v.id ? <div className={styles.p3}>播放中</div>: null}</p>
            <p className={styles.p2}>{v.desc}</p>
          </Col>
          <Col span={3} className={styles.playCol}>
            <img alt="" src={playingLast!==v.id ? Play : Pause} />
          </Col>
        </Row>)}
        <audio
          id="player"
          src={lastPlayList[0].playsrc}
          style={{display:'none'}}
          ref={node => this.videoContainer = node}
          preload="none" controlsList="nodownload"
        ></audio>
      </div>
    );
  }
}

export default Live;
