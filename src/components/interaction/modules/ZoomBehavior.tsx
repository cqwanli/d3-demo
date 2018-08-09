/**
 * 缩放行为demo
 */
import * as React from 'react'
import { select, event } from 'd3-selection'
import { zoom } from 'd3-zoom'
interface ICircle {
  cx: number,
  cy: number,
  r: number
}
export default class Interaction extends React.Component {
  private titleStyle: React.CSSProperties = {
    fontSize: '24px'
  }
  // svg绘制区域的宽度
  private width: number = 400;
  // svg绘制区域的高度
  private height: number = 400;
  private circles: ICircle[] = [
    { cx: 150, cy: 200, r: 30 },
    { cx: 220, cy: 200, r: 30 },
    { cx: 150, cy: 270, r: 30 },
    { cx: 220, cy: 270, r: 30 },
  ]
  public render() {
    return <div>
      <h1 style={this.titleStyle}>zoom</h1>
      <svg id="zoomSvg" />
    </div>
  }
  public componentDidMount() {
    const svg = select('#zoomSvg')
      .attr('width', this.width)
      .attr('height', this.height);
    const tZoom = zoom()
      .scaleExtent([1, 10])
      .on('zoom', (d, i) => {
        select(`#zoom_circle_${i}`)
          .attr('transform', `${event.transform}`)
      })
    const g = svg.append('g')
      .call(tZoom);
    g.selectAll('circle')
      .data(this.circles)
      .enter()
      .append('circle')
      .attr('id', (d: ICircle, i: number) => `zoom_circle_${i}`)
      .attr('cx', (d: ICircle) => d.cx)
      .attr('cy', (d: ICircle) => d.cy)
      .attr('r', (d: ICircle) => d.r)
      .attr('fill', 'black')
  }
}