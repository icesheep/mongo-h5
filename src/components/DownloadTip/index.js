import React, { Component } from 'react';
import { Row, Col, Icon } from 'antd';
import mgLogo from '../../assets/mgdt_logo.png';
import mangguo from '../../assets/singer/mangguo.png';
import styles from './index.less';

class DownloadTip extends Component {
  constructor(props) {
    super(props);
    this.isApp = navigator.userAgent.includes('DongTing') || WebView_isDongTing();
    this.state = {
      showFix: true, //下载提示状态
    };
  }

  componentDidMount() {
    this.isApp = navigator.userAgent.includes('DongTing') || WebView_isDongTing();
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
          <div style={this.props.style} className={styles.fix1}>
            <Icon type="close" className={styles.close} onClick={this.closeFix} />
            <div span={4}>
              <img src={mgLogo} />
            </div>
            <div span={14} className={styles.p1}>
              <img className={styles.d1} src={mangguo} />
              <div className={styles.d2}>湖南广电唯一官方音频平台</div>
            </div>
            <div className={styles.p2} onClick={this.downApp}>
            下载听全集
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default DownloadTip;
