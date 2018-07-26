import * as React from 'react'
import { select } from 'd3-selection'
import { scaleLinear } from 'd3-scale'
import { axisBottom, axisLeft } from 'd3-axis'
import { format } from 'd3-format'
/**
 * 画一个基础的坐标轴
 */
export default class DrawAxis extends React.Component {
  private width: number = 600;
  private height: number = 600;
  public componentDidMount() {
    const drawAxis = select('#drawAxis')
      .attr('width', this.width)
      .attr('height', this.height)
    const xScale = scaleLinear()
      .domain([0, 10])
      .range([0, 300])
    const xAxis = axisBottom(xScale);
    drawAxis.append('g')
      .attr('transform', 'translate(80,280)')
      .attr('class', 'x-axis')
      .call(xAxis);

    const yScale = scaleLinear()
      .domain([0, 10])
      .range([0, 200])
    const yAxis = axisLeft(yScale)
      .ticks(5)
      .tickFormat(format("$0.1f"))
    drawAxis.append('g')
      .attr('transform', 'translate(80,80)')
      .attr('class', 'y-axis')
      .call(yAxis);
  }
  public render() {
    return <svg id="drawAxis" />
  }
}