import React, { Component } from 'react';
import { Row, Col, Icon } from 'antd';
import mgLogo from '../../assets/mgdt_logo.png';
import styles from './index.less';

class DownloadTip extends Component {
  constructor(props) {
    super(props);
    this.isApp = navigator.userAgent.includes('DongTing') || WebView_isDongTing();
    this.state = {
      showFix: true, //下载提示状态
    };
  }

  // 关闭弹窗
  closeFix = () => {
    this.setState({
      showFix: false,
    });
  };

  // 下载app
  downApp = () => {
    window.open('https://fm.tingdao.com/html/h5.html');
  };

  render() {
    const { showFix } = this.state;
    return (
      <div>
        {showFix&&!this.isApp ? (
          <Row className={styles.fix1}>
            <Icon type="close" className={styles.close} onClick={this.closeFix} />
            <Col span={4}>
              <img src={mgLogo} />
            </Col>
            <Col span={14} className={styles.p1}>
              芒果动听APP 邀您一起加入
              <br /> 加油美好生活！
            </Col>
            <Col span={6} className={styles.p2} onClick={this.downApp}>
              下载APP
            </Col>
          </Row>
        ) : null}
      </div>
    );
  }
}

export default DownloadTip;
