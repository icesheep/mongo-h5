import React, {Component} from 'react';
import Music from '../../assets/3.mp3';
import styles from './index.less';

export default class Page1 extends Component {

  constructor(props) {
    super(props)
    this.state = { 
      playingtime: 0,   //播放时间 
      buffertime: 0,   //缓冲时间
      duration: 0,   //总时长
    };
  }

  componentDidMount() {
    // 为元素添加事件监听   
    document.getElementById('playLine').addEventListener("touchstart", (e) => {
      // 执行滚动回调
      this.startChangeTime(e)
    }, {
      passive: false //  禁止 passive 效果
    })
    document.getElementById('playLine').addEventListener("touchmove", (e) => {
      // 执行滚动回调
      this.moveProgress(e)
    }, {
      passive: false //  禁止 passive 效果
    })
    document.getElementById('playLine').addEventListener("touchend", (e) => {
      // 执行滚动回调
      this.moveEnd(e)
    }, {
      passive: false //  禁止 passive 效果
    })
  }

  componentDidUpdate(prevProps) {
    if (this.props.src !== prevProps.src && prevProps.src !== undefined) {
      // this.videoContainer.load();
      // this.videoContainer.play();
      // this.PlayingMusic();
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
    cancelAnimationFrame(this.requestRef);
  }

  // 播放时间刷新
  PlayingMusic = () => {
    this.requestRef = requestAnimationFrame(() => {
      this.timer = setTimeout(() => {
        if(this.videoContainer&&this.videoContainer.duration) {
          let timeRages = this.videoContainer.buffered;
          let bufferedTime = 0
          if(timeRages.length !== 0){
              bufferedTime = timeRages.end(timeRages.length-1);
          }
          if (this.videoContainer.currentTime === this.videoContainer.duration) {
            // let { playIndex } = this.state;
            // let temp = playIndex == 2  ? 2 : parseInt(playIndex) + 1;
            this.setState(
              {
                playingtime: this.videoContainer.currentTime,
                duration: this.videoContainer.duration,
                buffertime: bufferedTime,
                // playIndex: temp,
              },
              () => {
                clearTimeout(this.timer);
                cancelAnimationFrame(this.requestRef);
                this.props.next();
              }
            );
          } else {
            this.setState(
              {
                playingtime: this.videoContainer.currentTime,
                duration: this.videoContainer.duration,
                buffertime: bufferedTime,
              },
              () => {
                this.PlayingMusic();
              }
            );
          }
        }
      }, 1000);
    });
  };

  // 格式化时间
  formatterTime = (time) => {
    let hours = Math.floor(Math.round(time) / 3600);
    let minutes = Math.floor(Math.round(time) % 3600 / 60);
    let seconds = Math.floor(Math.round(time) % 60);
    minutes = minutes.toString().padStart(2,'0').substr('-2');
    seconds = seconds.toString().padStart(2,'0').substr('-2');
    return hours ? `${hours}:${minutes}:${seconds}` : `${minutes}:${seconds}`;
  }

  // 播放
  loadPlay = () => {
    this.videoContainer.load();
  }
  // 播放
  startPlay = () => {
    this.videoContainer.pause();
    this.videoContainer.play();
    this.PlayingMusic();
  }

  // 停止播放
  stopPlay = () => {
    this.videoContainer.pause();
    clearTimeout(this.timer);
    cancelAnimationFrame(this.requestRef);
  }
  //设置进度条
  setTimeOnPc = (time) =>{
    let audio = this.videoContainer;
    if(audio.currentTime !== 0) {
        audio.currentTime = time;
        this.setState(
          {
            playingtime: time,
          }
        );
    }
  }

  //点击事件
  clickChangeTime = (e) =>{
    const {duration} = this.state;
    if(!e.pageX&& !duration){
        return
    }
    if(e.pageX-this.progressDiv.offsetLeft < this.progressDiv.clientWidth) {
      this.setTimeOnPc((e.pageX-this.progressDiv.offsetLeft)/(this.progressDiv.clientWidth)*duration)
    }
  }
  // 开始拖动
  startChangeTime = (e) =>{
    e.preventDefault();
    clearTimeout(this.timer);
    cancelAnimationFrame(this.requestRef);
  }
  // 拖动播放条
  moveProgress = (e) =>{
    e.preventDefault();
    var point = this.getPoint(e);
    const {duration} = this.state;
    if(!point.pageX&& !duration){
        return
    }
    if(point.pageX-this.progressDiv.offsetLeft < this.progressDiv.clientWidth) {
      this.setState(
        {
          playingtime: (point.pageX-this.progressDiv.offsetLeft)/(this.progressDiv.clientWidth)*duration,
        }
      );
    }
    // this.setTimeOnPc()
  }

  moveEnd = (e) => {
    e.preventDefault();
    let audio = this.videoContainer;
    const {playingtime} = this.state;
    if(audio.currentTime !== 0 && playingtime <= audio.duration) {
        audio.currentTime = playingtime;
    }
    this.videoContainer.play();
    this.PlayingMusic();
  }
  //默认以第一个手指的位置计算
  getPoint =(e) =>{
    return e.touches ? e.touches[0] : e;
  };


  render() {
    const {buffertime, duration, playingtime} = this.state;
    return <div className={styles.music}>
        <div className={styles.row}>
          <div className={`${styles.time} ${styles.right}`}>{this.formatterTime(playingtime)}</div>
          <div className={styles.progress} ref={node => this.progressDiv = node} onClick={this.clickChangeTime}>
            <div 
              className={styles.playing}
              style={{width: (duration) ? `${playingtime/duration*100}%` : duration}}
            />
            <div 
              id="playLine"
              // onTouchStart={this.startChangeTime}
              // onTouchMove={this.moveProgress}
              // onTouchEnd={this.moveEnd}
              // onMouseDown={this.startChangeTime}
              // onMouseMove={this.moveProgress}
              // onMouseUp={this.moveEnd}
              className={styles.dot}
              style={{left: (duration) ? `${playingtime/duration*100}%` : duration}}
            />
            {/* <div 
              className={styles.buffer}
              style={{width: (buffertime) ? `${buffertime/duration*100}%` : 0}}
            /> */}
          </div>
          <div className={styles.time}>{this.formatterTime(duration)}</div>
        </div>
        <audio
          id="player"
          src={this.props.src}
          style={{display:'none'}}
          ref={node => this.videoContainer = node}
          preload='auto'
          // onEnded={this.props.next}
          onCanPlay={()=>{console.log('canplay!!!!!!!!!!!!!!!!!!!!!!');this.props.play(true)}}
        ></audio>
      </div>;
  }
}