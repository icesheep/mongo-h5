import React, { Component } from 'react';
import styles from './LastList.less';

import PlayImg from '../../../assets/singer/play.png';
import Bg1Img from '../../../assets/singer/bg3.png';
import Bg2Img from '../../../assets/singer/bg4.png';

class LastList extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    return (
      <div className={styles.main}>
        <div className={styles.div1}>
          <div className={styles.title}>20180121期</div>
          <div className={styles.list}>
            <div className={styles.item}>
              <img src={Bg1Img} className={styles.img1} />
              <img src={PlayImg} className={styles.img2} />
              <div className={styles.intro}>这里显示一行简介，这里显示一行简介。这里显示介…</div>
            </div>
            <div className={styles.item}>
              <img src={Bg1Img} className={styles.img1} />
              <img src={PlayImg} className={styles.img2} />
              <div className={styles.intro}>这里显示一行简介，这里显示一行简介。这里显示介…</div>
            </div>
            <div className={styles.item}>
              <img src={Bg1Img} className={styles.img1} />
              <img src={PlayImg} className={styles.img2} />
              <div className={styles.intro}>这里显示一行简介，这里显示一行简介。这里显示介…</div>
            </div>
          </div>
        </div>
        <div className={styles.div1}>
          <div className={styles.title}>20180121期</div>
          <div className={styles.list}>
            <div className={styles.item}>
              <img src={Bg1Img} className={styles.img1} />
              <img src={PlayImg} className={styles.img2} />
              <div className={styles.intro}>这里显示一行简介，这里显示一行简介。这里显示介…</div>
            </div>
            <div className={styles.item}>
              <img src={Bg1Img} className={styles.img1} />
              <img src={PlayImg} className={styles.img2} />
              <div className={styles.intro}>这里显示一行简介，这里显示一行简介。这里显示介…</div>
            </div>
            <div className={styles.item}>
              <img src={Bg1Img} className={styles.img1} />
              <img src={PlayImg} className={styles.img2} />
              <div className={styles.intro}>这里显示一行简介，这里显示一行简介。这里显示介…</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LastList;
