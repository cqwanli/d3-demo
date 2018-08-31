import * as React from 'react'
import { randomNormal } from 'd3-random'
import { histogram, min, max, Bin } from 'd3-array'
import { select } from 'd3-selection'
import { scaleLinear, scaleBand } from 'd3-scale'
import { axisBottom } from 'd3-axis'
import { line, curveBasis } from 'd3-shape'
export default class Histogram extends React.Component {
  private binNum: number = 20;  // 刻度数量
  private rangeMin: number = 130; // range最小值
  private rangeMax: number = 210; // range最大值
  private width: number = 960 // svg的宽度
  private height: number = 600 // svg的高度
  private xAxisWidth: number = 450 // x轴宽度
  private yAxisWidth: number = 450 // y轴宽度
  private padding: number = 50 // 边距
  public render() {
    return <svg id="histogramSvg" />
  }
  public componentDidMount() {
    const svg = select('#histogramSvg')
      .attr('width', this.width)
      .attr('height', this.height)
    const data = this.mockData();
    const tHistogram = histogram()
      .domain([this.rangeMin, this.rangeMax]) // 数据分布范围
      .thresholds(this.binNum)  // bins数量
    const hisData = tHistogram(data)
    const xTicks = hisData.map((d: any) => d.x0)
    const xScale = scaleBand<number>()
      .domain(xTicks) // 值的区间范围
      .range([0, this.xAxisWidth])  // 设置渲染宽度的区间范围
      .padding(0.1) // 设置柱形图之间的间距
    const xAxis = axisBottom<number>(xScale)  // 设置x坐标轴
      .ticks(this.binNum) // 设置刻度数量
    svg.append('g')
      .attr('class', 'x_axis')
      .attr('transform', `translate(${this.padding},${this.height - this.padding})`)
      .call(xAxis)
    /* 设置y坐标缩放 */
    const yScale = scaleLinear()
      .domain([
        min(hisData, (d: any) => d.length),
        max(hisData, (d: any) => d.length)
      ])
      .range([5, this.yAxisWidth])
    /* 画直方图 */
    const gRect = svg.append('g')
      .attr('transform', `translate(${this.padding},${-this.padding})`)
    gRect.selectAll('rect')
      .data(hisData)
      .enter()
      .append('rect')
      .attr('class', 'rect')
      .attr('x', (d: any) => xScale(d.x0) || 0)
      .attr('y', (d: any) => this.height - yScale(d.length))
      .attr('width', (d: any) => xScale.bandwidth())
      .attr('height', (d: any) => yScale(d.length))

    const lineGenerator = line<Bin<number, number>>()
      .x((d: any) => xScale(d.x0) as number)
      .y((d: any) => this.height - yScale(d.length))
      .curve(curveBasis)

    const gLine = svg.append('g')
      .attr('class', 'g-line')
      .attr('transform', `translate(${this.padding},${-this.padding})`)
      .style('opacity', 0.1)
    gLine.append('path')
      .attr('class', "linePath")
      .attr('d', lineGenerator(hisData) as string)
  }

  private mockData() {
    /* 随机生成平均身高170，前后10厘米误差 */
    const rand = randomNormal(170, 10)
    const dataSet = []
    for (let i = 0; i < 100; i++) {
      dataSet.push(rand())
    }
    return dataSet;
  }
}