import * as React from "react";
import { select, BaseType, Selection, event } from "d3-selection";
// import { scaleLinear } from "d3-scale";
import { brush } from "d3-brush";

export default class AreaSelect extends React.Component {
  private width: number = 500
  private height: number = 500
  private svg: Selection<BaseType, {}, HTMLElement, any>
  // private xScale = scaleLinear().domain([0, this.width]).range([0, this.width])
  // private yScale = scaleLinear().domain([0, this.height]).range([0, this.height])
  private tBrush = brush().extent([[0, 0], [this.width, this.height]]).on('brush', this.brushed)
  constructor(props: any) {
    super(props)
    this.brushed = this.brushed.bind(this)
  }
  public componentDidMount() {
    this.svg = select('#areaSelectSvg').attr('width', this.width).attr('height', this.height);
    this.svg.append('circle')
      .attr('cx', 100)
      .attr('cy', 100)
      .attr('r', 30)
      .style('fill', 'black')

    this.svg.append('rect')
      .attr('x', 150)
      .attr('y', 70)
      .attr('width', 70)
      .attr('height', 60)
      .style('fill', 'black')

    this.svg.append('g')
      .call(this.tBrush)
      .selectAll('rect')
      .style('opacity', 0.3)
  }
  public render() {
    return <svg id="areaSelectSvg" />
  }
  private brushed() {
    console.log(event)
    // const extent = this.tBrush.extent();
    // console.log(`x方向的下限：${extent[0][0]}`)
    // console.log(`x方向的上限：${extent[1][0]}`)
    // console.log(`y方向的下限：${extent[0][1]}`)
    // console.log(`y方向的上限：${extent[1][1]}`)
  }
}