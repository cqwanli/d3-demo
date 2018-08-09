import * as React from 'react'
import { select, touches, event } from 'd3-selection'
export default class TouchEvent extends React.Component {
  // svg绘制区域的宽度
  private width: number = 400;
  // svg绘制区域的高度
  private height: number = 400;
  public render() {
    return <svg id="touchSvg" />
  }
  public componentDidMount() {
    const svg = select('#touchSvg')
      .attr('width', this.width)
      .attr('height', this.height);
    svg.append('circle')
      .attr('id', 'circle1')
      .attr('cx', 150)
      .attr('cy', 200)
      .attr('r', 50)
      .attr('fill', 'blue')
      .on('touchstart', () => {
        select('#circle1').attr('fill', 'yellow')
      })
      .on('touchmove', () => {
        const pos = touches(event.target)[0]
        select('#circle1')
          .attr('cx', pos[0])
          .attr('cy', pos[1])
      })
      .on('touchend', () => {
        select('#circle1').attr('fill', 'blue')
      })
  }
}