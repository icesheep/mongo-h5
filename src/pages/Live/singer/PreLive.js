import React, { Component } from 'react';
import styles from './PreLive.less';

import IntroImg from '../../../assets/singer/intro.png';
import bg1 from '../../../assets/singer/bg1.png';

class PreLive extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    // console.log(this.state)
    const { banner_images, banner_playurl, banner_title, data_list = [], desc } = this.props;
    return (
      <div className={styles.main}>
        <img className={styles.imgBg} src={banner_images||bg1} />  
        <div className={styles.mask} />
        <div
          className={styles.div1}
          // style={{ backgroundImage: banner_images && `url(${banner_images})` }}
        >
          <div className={styles.item1}>{banner_title}</div>
          <div className={styles.item3}>
            <div className={styles.bg1}>
              
              <div className={styles.item3_1}>
                <div>敬请关注</div>
                <div>
                  每<span>周五</span>晚
                </div>
              </div>
              <div className={styles.item3_2}>
                <div className={styles.time}>20</div>
                <div className={styles.devide}>:</div>
                <div className={styles.time}>00</div>
                <div className={styles.devide}>-</div>
                <div className={styles.time}>22</div>
                <div className={styles.devide}>:</div>
                <div className={styles.time}>00</div>
              </div>
            </div>
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
      </div>
    );
  }
}

export default PreLive;
