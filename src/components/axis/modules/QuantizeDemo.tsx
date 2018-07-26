import * as React from 'react'
import { select } from 'd3-selection'
import { scaleQuantize } from 'd3-scale';
/**
 * 量子分为比例尺
 */
export default class QuantizeDemo extends React.Component {
  private width: number = 400;
  private height: number = 400;
  public componentDidMount() {
    const svg = select('#quantizeSvg')
      .attr("width", this.width)
      .attr('height', this.height)
    const quantize = scaleQuantize<string>()
      .domain([0, 50])
      .range(['#888', '#666', "#444", '#222', '#000'])
    const r: number[] = [45, 35, 25, 15, 5];
    svg.selectAll('circle')
      .data(r)
      .enter()
      .append("circle")
      .attr('cx', (d: number, i: number) => {
        return 50 + i * 30;
      })
      .attr('cy', 50)
      .attr('r', (d: number) => d)
      .attr('fill', (d: number) => quantize(d));
  }
  public render() {
    return <svg id="quantizeSvg" />
  }
}