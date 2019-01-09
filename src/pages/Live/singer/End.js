import React, { Component } from 'react';
import LastList from './LastList';
import styles from './End.less';
import IntroImg from '../../../assets/singer/intro.png';
import bg1 from '../../../assets/singer/bg1.png';

class SingerEnd extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    // console.log(this.state)
    const { banner_images, banner_playurl, banner_title, data_list } = this.props;
    return (
      <div className={styles.main}>
        <img className={styles.imgBg} src={banner_images||bg1} />  
        <div className={styles.mask} />
        <div className={styles.div1}>
          <div className={styles.item1}>{banner_title}</div>
          <div className={styles.item2}>直播已结束</div>
          <div className={styles.item3}>
            <div className={styles.bg1}>
              <img src={IntroImg} />
              <div className={styles.title}>往期精彩剪辑片</div>
              <img src={IntroImg} />
            </div>
          </div>
        </div>
        <LastList />
      </div>
    );
  }
}

export default SingerEnd;
