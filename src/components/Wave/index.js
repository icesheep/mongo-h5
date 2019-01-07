import React, { Component } from 'react';

class Wave extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.arr =[];
    this.v = 2;
    this.devide = 6;
  }

  componentDidMount() {
    // this.drawCanvas();
    this.requestRef = window.requestAnimationFrame(this.drawCanvas);
  }

  componentWillUnmount() {
    // clearTimeout(this.timer);
    cancelAnimationFrame(this.requestRef);
  }

  drawCanvas = () => {
    if (this.canvas.getContext) {
      var ctx = this.canvas.getContext('2d');
      ctx.fillStyle = '#F7105C';
      ctx.clearRect(0, 0, this.canvas.offsetWidth, this.canvas.offsetHeight);
      for (let i = 0; i <= this.canvas.offsetWidth; i += this.devide) {
        if(this.arr.length > Math.floor(i/this.devide)) {
          this.arr[Math.floor(i/this.devide)].height = this.arr[Math.floor(i/this.devide)].height + this.arr[Math.floor(i/this.devide)].speed;
        }else {
          let t = parseInt(Math.random() * this.canvas.offsetHeight);
          let v = (0.2 + Math.random()).toFixed(2);
          this.arr.push({height: t, speed: v});
        }
        if (this.arr[Math.floor(i/this.devide)].height + this.arr[Math.floor(i/this.devide)].speed > this.canvas.offsetHeight || 
        this.arr[Math.floor(i/this.devide)].height + this.arr[Math.floor(i/this.devide)].speed < 0) {
          this.arr[Math.floor(i/this.devide)].speed = -this.arr[Math.floor(i/this.devide)].speed;
        }
        ctx.fillRect(i, this.canvas.offsetHeight - this.arr[Math.floor(i/this.devide)].height, 2, this.arr[Math.floor(i/this.devide)].height);
      }
    }
    this.requestRef = window.requestAnimationFrame(this.drawCanvas);
  };

  render() {
    return (
      <canvas
        width={this.props.width}
        height={this.props.height}
        ref={ref => {
          this.canvas = ref;
        }}
      />
    );
  }
}

export default Wave;
