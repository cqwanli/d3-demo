import * as React from 'react'
import { select, BaseType, Selection } from 'd3-selection'
import { scaleLinear, ScaleLinear } from 'd3-scale'
import { max } from 'd3-array'
import { axisBottom, axisLeft } from 'd3-axis'
/**
 * 散点图
 */
export default class ScatterDiagram extends React.Component {
  private width: number = 600;
  private height: number = 600;
  private xAxisWidth: number = 400;
  private yAxisHeight: number = 300;
  private center = [[0, 0.1], [0.5, 0.5], [0.7, 0.8], [0.4, 0.9], [0.11, 0.32], [0.88, 0.25], [0.75, 0.12], [0.5, 1], [0.2, 0.3], [0.4, 0.1], [0.6, 0.7]];
  private padding = { left: 30, right: 30, top: 30, bottom: 30 }
  public componentDidMount() {
    const scatter = select('#scatter')
      .attr('width', this.width)
      .attr('height', this.height)
    const xScale = scaleLinear()
      .domain([0, max(this.center, (d: any) => d[0])])
      .range([0, this.xAxisWidth])
    const xAxis = axisBottom(xScale)
    scatter.append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(${100 + this.padding.left},${this.yAxisHeight + this.padding.top})`)
      .call(xAxis)
    const yScale = scaleLinear()
      .domain([0, max(this.center, (d: any) => d[1])])
      .range([0, this.yAxisHeight])
    const yAxis = axisLeft(yScale);
    scatter.append('g')
      .attr('class', 'y-axis')
      .attr('transform', `translate(${100 + this.padding.left},${this.padding.top})`)
      .call(yAxis)
    this.drawCircle(scatter, xScale, yScale);
  }
  public render() {
    return <svg id="scatter" />
  }
  /**
   * 画圆形散点
   * @param svg svg对象
   * @param xScale x坐标缩放
   * @param yScale y坐标缩放
   */
  private drawCircle(svg: Selection<BaseType, {}, HTMLElement, any>, xScale: ScaleLinear<number, number>, yScale: ScaleLinear<number, number>) {
    svg.selectAll('circle')
      .data(this.center)
      .enter()
      .append('circle')
      .attr('fill', 'black')
      .attr('cx', (d: any) => {
        return 100 + this.padding.left + xScale(d[0]);
      })
      .attr('cy', (d: any) => {
        return this.yAxisHeight + this.padding.top - yScale(d[1]);
      })
      .attr('r', 5)
  }
}