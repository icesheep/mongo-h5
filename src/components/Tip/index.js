import React, { Component } from 'react';
import styles from './index.less';

class Tip extends Component {
  constructor(props) {
    super(props);
    this.isApp = navigator.userAgent.includes('DongTing') || WebView_isDongTing();
    this.state = {
    };
  }

  login = () => {
    WebView_login(this.props.setLogin);
    this.props.close(true);
  }

  download = () => {
    this.props.close();
    window.open('https://fm.tingdao.com/html/h5.html');
  }

  render() {
    return (
      <div>
      <div className={styles.fix1}></div>
        <div className={styles.button1} onClick={this.isApp ? this.login : this.download}>{this.isApp ? '登录听全部' : '下载听全部'}</div>
        <div className={styles.button2} onClick={this.props.close}>再逛逛</div>
      </div>
    );
  }
}

export default Tip;
