import * as React from 'react'
import { select, Selection, BaseType } from 'd3-selection'
import { scaleLinear } from 'd3-scale'
import { axisBottom, axisLeft } from 'd3-axis'
export interface IState {
  center: Array<[number, number]>
}
export default class Transform extends React.Component<any, IState> {
  private width: number = 500;
  private height: number = 500;
  private padding = { top: 30, bottom: 30, left: 30, right: 30 }
  private xAxisWidth = 300;
  private yAxisWidth = 300;
  private xScale = scaleLinear().domain([0, 1]).range([0, this.xAxisWidth])
  private yScale = scaleLinear().domain([0, 1]).range([0, this.yAxisWidth])
  constructor(props: object) {
    super(props)
    this.state = {
      center: [[0.5, 0.5], [0.7, 0.8], [0.4, 0.9], [0.11, 0.32], [0.88, 0.25], [0.75, 0.12], [0.5, 0.1], [0.2, 0.3], [0.4, 0.1], [0.6, 0.7]]
    }
    this.update = this.update.bind(this)
    this.add = this.add.bind(this)
    this.sub = this.sub.bind(this)
  }
  public componentDidMount() {
    const svg = select('#transformSvg')
      .attr('width', this.width)
      .attr('height', this.height)
    this.drawCircle(svg);
    this.drawAxis(svg);
  }
  public render() {
    return <div>
      <button onClick={this.update}>更新</button>
      <button onClick={this.add}>增加</button>
      <button onClick={this.sub}>减少</button>
      <svg id="transformSvg" />
    </div>
  }
  /**
   * 绘制坐标轴
   * @param svg svg元素
   */
  private drawAxis(svg: Selection<BaseType, {}, HTMLElement, any>) {
    const xAxis = axisBottom(this.xScale).ticks(5)
    this.yScale.range([this.yAxisWidth, 0]);
    const yAxis = axisLeft(this.yScale).ticks(5)

    svg.append('g')
      .attr('class', 'axis')
      .attr('transform', `translate(${this.padding.left},${this.height - this.padding.bottom})`)
      .call(xAxis)
    svg.append('g')
      .attr('class', 'axis')
      .attr('transform', `translate(${this.padding.left},${this.height - this.padding.bottom - this.yAxisWidth})`)
      .call(yAxis)
    this.yScale.range([0, this.yAxisWidth])
  }
  /**
   * 散点绘制
   * @param svg svg 元素
   */
  private drawCircle(svg: Selection<BaseType, {}, HTMLElement, any>) {
    const circleUpdate = svg.selectAll('circle').data(this.state.center);
    const circleEnter = circleUpdate.enter();
    const circleExit = circleUpdate.exit();
    /* 当数据更新时，对circle的处理 */
    circleUpdate.transition()
      .duration(500)
      .attr('cx', (d: any) => this.padding.left + this.xScale(d[0]))
      .attr('cy', (d: any) => this.height - this.padding.bottom - this.yScale(d[1]))
    /* 当元素项数多于初始项数时，对circle的处理 */
    circleEnter.append('circle')
      .attr('fill', 'black')
      .attr('cx', this.padding.left)
      .attr('cy', this.height - this.padding.bottom)
      .attr('r', 7)
      .transition()
      .duration(500)
      .attr('cx', (d: any) => this.padding.left + this.xScale(d[0]))
      .attr('cy', (d: any) => this.height - this.padding.bottom - this.yScale(d[1]))
    /* 当元素项数少于初始项数时，对circle的处理 */
    circleExit.transition()
      .duration(500)
      .attr('fill', 'white')
      .remove()
  }
  /**
   * 更新数据
   */
  private update() {
    for (const item of this.state.center) {
      item[0] = Math.random();
      item[1] = Math.random();
    }
    this.drawCircle(select('#transformSvg'))
  }
  /**
   * 添加点
   */
  private add() {
    this.state.center.push([Math.random(), Math.random()])
    this.drawCircle(select('#transformSvg'))
  }
  /**
   * 删除点
   */
  private sub() {
    this.state.center.pop() // 删除数组最后一项
    this.drawCircle(select('#transformSvg'))
  }
}