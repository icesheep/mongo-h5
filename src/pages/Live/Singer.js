/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import {Spin} from 'antd';
import { connect } from 'dva';
import moment from 'moment';
import Ready from './singer/Ready';
import Live from './singer/Live';
import PreLive from './singer/PreLive';
import End from './singer/End';

@connect(({ global }) => ({
  global,
}))
class Singer extends Component {
  state = {};

  componentDidMount() {
    this.getData();
  }

  componentWillUnmount() {}

  getData = () => {
    const { dispatch } = this.props;
    const params = {
      base: {
        userid: '1810232029531260',
        caller: '18514281314',
        imei: 'db658275cf708690c350ec01b3f6e863db6627a4',
        ua: 'apple|iPhone|iPhone9,1|12.0.1|750*1334',
        version: '2.1',
        osid: 'ios',
        apn: 'wifi',
        df: '22010000',
      },
      param: {
        periodoftime: '20190101',
      },
    };
    dispatch({
      type: 'global/singer',
      payload: params,
    });
  };

  refresh = () => {
    this.getData();
  };

  render() {
    const {
      global: { singerInfo },
    } = this.props;
    const {
      banner_ext = {},
      banner_images,
      banner_playurl,
      banner_title,
      data_list = [],
      desc,
      id : playId,
      type : playType,
    } = singerInfo;
    let { begin_time, end_time, type, msg } = banner_ext;
    // begin_time = '2019-01-05 22:23:23';end_time = '2019-01-05 23:11:11';
    return (
      <div style={{ height: '100%' }}>
        {type == 1 ? (
          moment().isBefore(moment(begin_time)) ? (
            <Ready
              begin_time={begin_time}
              banner_images={banner_images}
              banner_playurl={banner_playurl}
              banner_title={banner_title}
              data_list={data_list}
              desc={desc}
              refresh={this.refresh}
            />
          ) : moment().isBefore(moment(end_time)) ? (
            <Live
              begin_time={begin_time}
              end_time={end_time}
              banner_images={banner_images}
              banner_playurl={banner_playurl}
              banner_title={banner_title}
              data_list={data_list}
              msg={msg}
              desc={desc}
              playId={playId}
              playType={playType}
              refresh={this.refresh}
            />
          ) : (
            <End
              banner_images={banner_images}
              banner_playurl={banner_playurl}
              banner_title={banner_title}
              data_list={data_list}
            />
          )
        ) : (
          type ? 
          <PreLive
            banner_images={banner_images}
            banner_playurl={banner_playurl}
            banner_title={banner_title}
            data_list={data_list}
            desc={desc}
          /> : <div style={{ paddingTop: 100, textAlign: 'center' }}>
            <Spin size="large" />
          </div>
        )}
      </div>
    );
  }
}

export default Singer;
