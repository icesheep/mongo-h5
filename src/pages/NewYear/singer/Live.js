import React, { Component } from 'react';
import Wave from '@/components/Wave';
import moment from 'moment';
import VideoJsForReact from '@/components/Videojs';
import styles from './Live.less';

import DengLongImg from '../../../assets/newyear/denglong.png';
import bg1 from '../../../assets/singer/bg1.png';
import PlayImg from '../../../assets/singer/play.png';
import PauseImg from '../../../assets/singer/pause.png';

class SingerLive extends Component {
  constructor(props) {
    super(props);
    this.isApp = navigator.userAgent.includes('DongTing') || WebView_isDongTing();
    this.appPlaying = false;
    this.state = {
      showIcon: true,
      players: null, //直播播放控件
      playing: false, //播放状态
      videoJsOptions: {
        preload: 'auto', // 预加载
        bigPlayButton: {}, // 大按钮
        autoplay: false, // 自动播放
        controls: false, // 是否开启控制栏
        width: 0, // 播放器宽度
        height: 0, // 播放器高度
        playbackRates: [1, 1.5, 2], // 播放倍速
        sources: [
          // 视频源
          {
            src: 'http://mgtj-live.oss-cn-shanghai.aliyuncs.com/h2/index.m3u8',
            // src: '', //音频地址
            type: 'application/x-mpegURL', //音频类型m3u8：application/x-mpegURL，mp3、mp4：video/mp4
            label: 'HLS1',
            withCredentials: false,
            res: 960,
          },
        ],
      },
    };
  }

  componentDidMount() {
    this.endLive();
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  endLive = () => {
    this.timer = setInterval(() => {
      const { end_time, refresh } = this.props;
      if (moment().isAfter(moment(end_time))) {
        clearInterval(this.timer);
        refresh();
      }
    }, 1000);
  };

  appFirstPlay = () => {
    const that = this;
    const { banner_title, banner_playurl, playType, playId } = this.props;
    WebView_getGeShouLiveInfo(playId, playType, banner_playurl,banner_title, function(data) {
      console.log(data);
      that.appPlaying = true;
    });
  }

  playInApp = () => {
    const { playing } = this.state;
    if (!this.appPlaying) {
      this.setState(
        {
          playing: true,
        },
        ()=>{this.appFirstPlay();setTimeout(()=>{this.hideIcon(true)},0) }
      );
    } else {
      if(playing) {
        this.setState(
          {
            playing: false,
          },
          () => {
            WebView_pauseOrResumeVideo(false);
            setTimeout(()=>{this.hideIcon(false)},0)
          }
        );
      }else {
        this.setState(
          {
            playing: true,
          },
          () => {
            WebView_pauseOrResumeVideo(true);
            setTimeout(()=>{this.hideIcon(true)},0)
          }
        );
      }
    }
  };

  // 直播播放、暂停功能
  play = (lag) => {
    const { players, playing } = this.state;
    // if(players.played) players.pause();
    if (this.isApp) {
      this.playInApp();
    } else {
      if (playing) {
        this.setState(
          {
            playing: false,
          },
          () => {
            players&&players.pause();
            setTimeout(()=>{this.hideIcon(false)},0)
          }
        );
      } else {
        this.setState(
          {
            playing: true,
          },
          () => {
            if(lag === true) {
              setTimeout(() => {
                players&&players.play();
              }, 1000);
            }else {
              players&&players.play();
            }
            setTimeout(()=>{this.hideIcon(true)},0)
          }
        );
      }
    }
  };

  hideIcon = (flag) => {
    this.setState({showIcon: !flag})
  }

  render() {
    const { showIcon, playing, videoJsOptions } = this.state;
    // console.log(this.state,this.props,this.isApp,this.appPlaying)
    const {
      end_time,
      banner_images,
      banner_playurl,
      banner_title,
      data_list = [],
      msg,
      desc,
    } = this.props;
    if(videoJsOptions.sources[0].src === '') {
      videoJsOptions.sources[0].src = banner_playurl;
      if(banner_playurl&&videoJsOptions.sources[0].src.includes('m3u8')) {
        videoJsOptions.sources[0].type= 'application/x-mpegURL'
      }else {
        videoJsOptions.sources[0].type= 'video/mp4'
      }
    }
    return (
      <div className={styles.main}>
        <img className={styles.imgBg} src={banner_images||bg1} />   
        <div
          className={styles.mask}
          style={{ background: playing ? 'rgba(9,9,9,.5)' : 'rgba(9,9,9,.4)' }}
        />
        <div
          className={styles.div1}
          onClick={this.play}
        >
          <img style={{display: showIcon ? 'block' : 'none'}} className={styles.img1} src={playing ? PauseImg : PlayImg} />
          <div className={styles.item1}>{banner_title}</div>
          <div className={styles.item2}>{msg}</div>
          <div className={styles.img2} style={{ display: playing ? '' : 'none' }}>
            <Wave
              color
              width={document.getElementsByTagName('html')[0].offsetWidth}
              height={
                document.getElementsByTagName('html')[0].style.fontSize.replace('px', '') * 1.2
              }
            />
          </div>
        </div>
        <div className={styles.div2}>
          <div className={styles.item4}>
            <img src={DengLongImg} />
            <div className={styles.title}>节目简介</div>
            <img src={DengLongImg} />
          </div>
          <div className={styles.item5}>{desc}</div>
          {data_list.length > 0 &&
            data_list.map((v,index) => (
              <div key={index} className={styles.item6}>
                <img
                  className={styles.img1}
                  src={v.images}
                />
              </div>
            ))}
        </div>
        {/* 直播音频播放控件 */}
        <VideoJsForReact
          sourceChanged={(player, players) => {
            this.setState({ players });
          }}
          onReady={(player, players) => {
            console.log('ready!!!!!!!!!!!!!!!!!!!!!!')
            this.setState({ players }, ()=>{this.play(true)});
          }}
          onCanPlay={(player, players) => {
            console.log('canplay!!!!!!!!!!!!!!!!!!!!!!')
            this.setState({ players }, ()=>{this.play(true)});
          }}
          {...videoJsOptions}
        />
      </div>
    );
  }
}

export default SingerLive;
