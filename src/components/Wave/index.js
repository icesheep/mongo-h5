import React, { Component } from 'react';

class Wave extends Component {
  constructor(props) {
    super(props);
    this.state = {
     
    };
  }

  componentDidMount() {
    this.drawCanvas()
  }

  
  componentWillUnmount() {
    clearTimeout(this.timer)
    cancelAnimationFrame(this.requestRef);
  }
  
  drawCanvas = () => {
      this.requestRef = window.requestAnimationFrame(() => {
        this.timer = setTimeout(() => {
          if (this.canvas.getContext) {
            var ctx = this.canvas.getContext('2d');
            ctx.fillStyle = '#F7105C';
            ctx.clearRect(0,0,this.canvas.offsetWidth,this.canvas.offsetHeight);
            let lastPointX = 0, lastPointY = 0;
            for(let i = 0;i <= this.canvas.offsetWidth; i+=7) {
              // ctx.fillRect(i, temp, 1, 1);
              let t = parseInt(Math.random()*this.canvas.offsetHeight)
              ctx.fillRect(i, this.canvas.offsetHeight-t, 1, t);
              // ctx.beginPath();
              // ctx.moveTo(i, temp);
              // ctx.lineTo(lastPointX, lastPointY);
              // ctx.lineTo(lastPointX+1, lastPointY+1);
              // ctx.lineTo(i+1, temp+1);
              // ctx.fill();
            }
          }
          this.drawCanvas()
        },500)
      });
    
  }

  render() {
    return (
      <canvas
        width={this.props.width}
        height={this.props.height}
        ref = {ref => {this.canvas = ref}}
      />
    );
  }
}

export default Wave;
