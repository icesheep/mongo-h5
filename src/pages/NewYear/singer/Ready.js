import React, { Component } from 'react';
import moment from 'moment';
import VideoJsForReact from '@/components/Videojs';
import styles from './Ready.less';

import music3 from '../../../assets/3.mp3';
import DengLongImg from '../../../assets/newyear/denglong.png';
import PlayImg from '../../../assets/newyear/play.png';
import PauseImg from '../../../assets/newyear/pause.png';
import bg1 from '../../../assets/singer/bg1.png';
// import fmImg from '../../../assets/singer/fm.png';

class Ready extends Component {
  constructor(props) {
    super(props);
    this.state = {
      players: null, //直播播放控件
      nowPlayUrl: null,
      hour: '00',
      minute: '00',
      second: '00',
      playing: false, //往期录播播放状态
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
            src: '',
            // src: 'http://mgtj-live.oss-cn-shanghai.aliyuncs.com/h1/index.m3u8',   //音频地址
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
    this.loopTime();
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
    cancelAnimationFrame(this.requestRef);
  }

  // 刷新倒计时
  loopTime = () => {
    this.requestRef = requestAnimationFrame(() => {
      this.timer = setTimeout(() => {
        const { begin_time, refresh } = this.props;
        const deadTime = moment(begin_time);
        const now = moment();
        if (deadTime.isAfter(now)) {
          const temp = deadTime.diff(now, 'seconds');
          const hour = `0${Math.floor(temp / 3600)}`.substr(-2);
          const minute = `0${Math.floor((temp % 3600) / 60)}`.substr(-2);
          const second = `0${(temp % 3600) % 60}`.substr(-2);
          this.setState(
            {
              hour,
              minute,
              second,
            },
            () => {
              this.loopTime();
            }
          );
        } else {
          clearTimeout(this.timer);
          cancelAnimationFrame(this.requestRef);
          refresh&&refresh();
        }
      }, 1000);
    });
  };

  // 往期音频播放、暂停
  playLastAudio = (v, index) => {
    const { players, playing, nowPlayUrl, videoJsOptions } = this.state;
    if (v) {
      if (playing === index) {
        this.setState(
          {
            playing: false,
          },
          () => {
            players.pause();
          }
        );
      } else {
        if (nowPlayUrl === index) {
          this.setState(
            {
              playing: index,
            },
            () => {
              players.play();
            }
          );
        } else {
          videoJsOptions.sources[0].src = v.playurl;
          if (v.playurl.indexOf('m3u8') !== -1) {
            videoJsOptions.sources[0].type = 'application/x-mpegURL';
          } else {
            videoJsOptions.sources[0].type = 'video/mp4';
          }
          this.setState(
            {
              playing: index,
              nowPlayUrl: index,
              videoJsOptions,
            },
            () => {
              players.play();
            }
          );
        }
      }
    } else {
      this.setState(
        {
          playing: false,
        },
        () => {
          players.pause();
        }
      );
    }
  };

  render() {
    const { hour, minute, second, playing, videoJsOptions, nowPlayUrl } = this.state;
    const {
      begin_time,
      end_time,
      banner_images,
      banner_playurl,
      banner_title,
      data_list = [1],
      msg,
      desc,
    } = this.props;
    if(videoJsOptions.sources[0].src === '' && data_list.length > 0) {
      videoJsOptions.sources[0].src = data_list[nowPlayUrl || 0].playurl;
      if(data_list[nowPlayUrl || 0].playurl&&videoJsOptions.sources[0].src.includes('m3u8')) {
        videoJsOptions.sources[0].type= 'application/x-mpegURL'
      }else {
        videoJsOptions.sources[0].type= 'video/mp4'
      }
    }
    return (
      <div className={styles.main}>
        <img className={styles.imgBg} src={banner_images||bg1} />  
        <div className={styles.mask} />
        <div className={styles.div1}>
          {/* <img src={fmImg} className={styles.fmlogo} /> */}
          <div className={styles.item1}>{banner_title}</div>
          <div className={styles.item2}>即将呈现</div>
          <div className={styles.item3}>
            <div className={styles.bg1}>
              <div className={styles.item3_1}>直播倒计时</div>
              <div className={styles.item3_2}>
                <div className={styles.time}>{hour}</div>
                <div className={styles.devide}>:</div>
                <div className={styles.time}>{minute}</div>
                <div className={styles.devide}>:</div>
                <div className={styles.time}>{second}</div>
              </div>
            </div>
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
            data_list.map((v, index) => (
              <div style={{position: 'relative'}}>
                <div className={styles.mask} />
                <div className={styles.item6}>
                  <img
                    className={styles.img1}
                    src={v.images}
                  />
                  <img
                    className={styles.img2}
                    onClick={() => this.playLastAudio(v, index)}
                    src={index === playing ? PauseImg : PlayImg}
                  />
                  <div className={styles.title}>{v.title}</div>
                </div>
                <div className={styles.item7}>{v.desc}</div>
              </div>
            ))}
        </div>
        {/* <audio
          id="player"
          src=""
          style={{display:'none'}}
          ref={node => this.videoContainer = node}
          preload="none" controlsList="nodownload"
          onEnded={this.playLastAudio}
        ></audio> */}
        <VideoJsForReact
          sourceChanged={(player, players) => {
            this.setState({ players });players.load();
          }}
          onReady={(player, players) => {
            this.setState({ players });players.load();
          }}
          onEnded={this.playLastAudio}
          {...videoJsOptions}
        />
      </div>
    );
  }
}

export default Ready;
