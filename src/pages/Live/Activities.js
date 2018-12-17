import React, { Component } from 'react';
// import { connect } from 'dva';
import { Row, Col } from 'antd';
import styles from './Activities.less';
import Pic from '../../assets/p1.png';


class LoginPage extends Component {
  state = {
  };

  render() {
    return (
      <div className={styles.main}>
        <Row className={styles.div1}>
          <Col className={styles.item1}>大家都在关注</Col>
          <Col className={styles.item2}>2018湖南卫视跨年演唱会</Col>
          <Col className={styles.item2}>即将呈现</Col>
        </Row>
        <Row className={styles.div2}>
          <Col span={8} className={styles.leftcol}><img alt="" src={Pic} /></Col>
          <Col span={16} className={styles.rightcol}>
            <p className={styles.p1}>2018湖南跨年演唱会</p>
            <p className={styles.p2}>开始时间：2018.12.30-21：00</p>
            <p className={styles.p3}>大型跨年</p>
          </Col>
        </Row>
      </div>
    );
  }
}

export default LoginPage;
