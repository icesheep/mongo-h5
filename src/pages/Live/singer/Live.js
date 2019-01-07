import React, { Component } from 'react';
import Wave from '@/components/Wave';
import moment from 'moment';
import VideoJsForReact from '@/components/Videojs';
import styles from './Live.less';

import IntroImg from '../../../assets/singer/intro.png';
import PlayImg from '../../../assets/singer/play.png';
import PauseImg from '../../../assets/singer/pause.png';

class SingerLive extends Component {
  constructor(props) {
    super(props);
    this.isApp = WebView_isDongTing();
    this.state = {
      players: null, //直播播放控件
      playing: false, //播放状态
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
            // src: 'http://mgtj-live.oss-cn-shanghai.aliyuncs.com/h2/index.m3u8',
            src: '', //音频地址
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

  playInApp = () => {
    const { playing } = this.state;
    const { banner_playurl } = this.props;
    if (playing) {
      this.setState(
        {
          playing: false,
        },
        () => {
          WebView_getGeShouLiveInfo('1', '1', banner_playurl, function(data) {
            console.log(data);
          });
        }
      );
    } else {
      this.setState(
        {
          playing: true,
        },
        () => {
          WebView_getGeShouLiveInfo('1', '1', banner_playurl, function(data) {
            console.log(data);
          });
        }
      );
    }
  };

  // 直播播放、暂停功能
  play = () => {
    if (this.isApp) {
      this.playInApp();
    } else {
      const { players, playing } = this.state;
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
            // setTimeout(() => {
              players.play();
            // }, 10);
          }
        );
      }
    }
  };

  render() {
    const { playing, videoJsOptions } = this.state;
    const {
      begin_time,
      end_time,
      banner_images,
      banner_playurl,
      banner_title,
      data_list = [],
      msg,
      desc,
    } = this.props;
    videoJsOptions.sources[0].src = banner_playurl;
    return (
      <div className={styles.main}>
        <div
          className={styles.mask}
          style={{ background: playing ? 'rgba(0,0,0,.6)' : 'rgba(0,0,0,.4)' }}
        />
        <div
          className={styles.div1}
          style={{ backgroundImage: banner_images && `url(${banner_images})` }}
        >
          <img className={styles.img1} onClick={this.play} src={playing ? PauseImg : PlayImg} />
          <div className={styles.item1}>{banner_title}</div>
          <div className={styles.item2}>{msg}</div>
          <div className={styles.img2} style={{ display: playing ? '' : 'none' }}>
            <Wave
              width={document.getElementsByTagName('html')[0].offsetWidth}
              height={
                document.getElementsByTagName('html')[0].style.fontSize.replace('px', '') * 1.2
              }
            />
          </div>
        </div>
        <div className={styles.div2}>
          <div className={styles.item4}>
            <img src={IntroImg} />
            <div className={styles.title}>节目简介</div>
          </div>
          <div className={styles.item5}>{desc}</div>
          {data_list.length > 0 &&
            data_list.map(v => (
              <div style={{ backgroundImage: `url(${v.images})` }} className={styles.item6} />
            ))}
        </div>
        {/* 直播音频播放控件 */}
        <VideoJsForReact
          sourceChanged={(player, players) => {
            this.setState({ players }, this.play);
          }}
          onReady={(player, players) => {
            this.setState({ players }, this.play);
          }}
          {...videoJsOptions}
        />
      </div>
    );
  }
}

export default SingerLive;
