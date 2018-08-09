import * as React from 'react'
import { select, event } from 'd3-selection'
import { drag } from 'd3-drag'
interface ICircle {
  cx: number,
  cy: number,
  r: number
}
export default class Interaction extends React.Component {
  // svg绘制区域的宽度
  private width: number = 1280;
  // svg绘制区域的高度
  private height: number = 400;
  private circles: ICircle[] = [
    { cx: 150, cy: 200, r: 30 },
    { cx: 250, cy: 200, r: 30 }
  ]
  public render() {
    return <svg id="dragSvg" />
  }
  public componentDidMount() {
    const svg = select('#dragSvg')
      .attr('width', this.width)
      .attr('height', this.height);
    const dg = drag()
      .subject((d: ICircle, i) => {
        return { x: d.cx, y: d.cy }
      })
      .on('start', (d: ICircle, i) => {
        console.log("drag start")
      })
      .on('end', (d: ICircle, i) => {
        console.log("drag end")
      })
      .on('drag', (d: ICircle, i: number) => {
        select(`#drag_circle_${i}`)
          .attr('cx', d.cx = event.x)
          .attr('cy', d.cy = event.y)
      })
    /* 在写call的时候需要写bind(this)类型才会正确 */
    svg.selectAll('circle')
      .data(this.circles)
      .enter()
      .append('circle')
      .attr('id', (d: ICircle, i: number) => `drag_circle_${i}`)
      .attr('cx', (d) => d.cx)
      .attr('cy', (d) => d.cy)
      .attr('r', (d) => d.r)
      .attr('fill', 'black')
      .call(dg.bind(this))
  }
}