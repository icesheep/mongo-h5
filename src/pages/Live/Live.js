import React, { Component } from 'react';
// import { connect } from 'dva';
import { Row, Col } from 'antd';
import moment from 'moment';
import styles from './Live.less';
import Pic from '../../assets/p1.png';
import Play from '../../assets/play.png';
import Pause from '../../assets/pause.png';

class Live extends Component {
  state = {
    lastTime: '',
    startLive: false,
  };

  componentDidMount() {
    this.loopData();
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
    cancelAnimationFrame(this.requestRef);
  }

  loopData = () => {
    this.requestRef = requestAnimationFrame(() => {
      this.timer = setTimeout(() => {
        const deadTime = moment('2018-12-31 09:00:00');
        const now = moment();
        if(deadTime.isAfter(now)) {
          const temp = deadTime.diff(now,'seconds')
          const hour = Math.floor(temp/3600)
          const minute = Math.floor(temp%3600/60)&&`${Math.floor(temp%3600/60)}`.length<2 ? `0${Math.floor(temp%3600/60)}` : Math.floor(temp%3600/60)
          const second = temp%3600%60&&`${temp%3600%60}`.length<2 ? `0${temp%3600%60}` : temp%3600%60
          const str = `${hour}: ${minute}: ${second}`
          this.setState(
            {
              lastTime: str,
            },
            () => {
              this.loopData();
            }
          );
        }else {
          this.setState(
            {
              startLive: true,
            }
          );
        }
      }, 1000);
    });
  };

  render() {
    const {lastTime, startLive} = this.state;
    return (
      <div className={styles.main}>
        {startLive ? 
          <Row className={styles.div1}>
            <Col className={styles.item1}>2019湖南卫视跨年演唱会</Col>
          </Row>:
          <Row className={styles.div1}>
            <Col className={styles.item1}>2019湖南卫视跨年演唱会</Col>
            <Col className={styles.item1}>即将呈现</Col>
            <Col className={styles.item2}>节目简介：自2005年开创国内跨年演唱会先河起，湖南卫视 十三年间打造出了国内最具影响力和价值的跨年品牌。</Col>
            <Col className={styles.item3}>
              <div className={styles.p1}>距离开始</div>
              <div className={styles.p2}>{lastTime}</div>
            </Col>
            <Col className={styles.item4}>背景</Col>
            <Col className={styles.item5}>
              今年，湖南卫视跨年演唱会即将携全面升级的概念、互动、 舞台以及阵容，重磅开启。震撼升级的跨年演唱会，即将 点燃激情，唱响青春，为全新的2019年揭开精彩序章。
            </Col>
            <Col className={styles.item6}>
              往期跨年直播
            </Col>
          </Row>}
        <Row className={styles.div2}>
          <Col span={5} className={styles.leftcol}><img alt="" src={Pic} /></Col>
          <Col span={16} className={styles.rightcol}>
            <p className={styles.p1}><span style={{color: '#EB032A'}}>2018跨年演唱会</span>{startLive ? <span className={styles.p3}>直播中</span> : null}</p>
            <p className={styles.p2}>震撼升级的跨年演唱会，即将点燃激情， 唱响青春，为全新的2019年揭开精彩…</p>
          </Col>
          <Col span={3} className={styles.playCol}>
            <img alt="" src={Play} />
          </Col>
        </Row>
        <Row className={styles.div2}>
          <Col span={5} className={styles.leftcol}><img alt="" src={Pic} /></Col>
          <Col span={16} className={styles.rightcol}>
            <p className={styles.p1}><span>2017跨年演唱会</span>{startLive ? <span className={styles.p3}>直播中</span> : null}</p>
            <p className={styles.p2}>张惠妹献唱经典温暖如初</p>
          </Col>
          <Col span={3} className={styles.playCol}>
            <img alt="" src={Play} />
          </Col>
        </Row>
        <Row className={styles.div2}>
          <Col span={5} className={styles.leftcol}><img alt="" src={Pic} /></Col>
          <Col span={16} className={styles.rightcol}>
            <p className={styles.p1}><span>2016跨年演唱会</span>{startLive ? <span className={styles.p3}>直播中</span> : null}</p>
            <p className={styles.p2}>张杰六连唱十年金曲超燃LIVE</p>
          </Col>
          <Col span={3} className={styles.playCol}>
            <img alt="" src={Play} />
          </Col>
        </Row>
      </div>
    );
  }
}

export default Live;
