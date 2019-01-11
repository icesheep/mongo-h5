import React, { Component } from 'react';
import styles from './index.less';

class LoginTip extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  login = () => {
    WebView_login();
  }

  render() {
    return (
      <div className={styles.fix1}>
        <div className={styles.title}>登录后可收听完整章节</div>
        <div className={styles.button} onClick={this.login}>登录</div>
      </div>
    );
  }
}

export default LoginTip;
