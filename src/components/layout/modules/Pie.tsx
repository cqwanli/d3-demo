import { pie, arc } from 'd3-shape'
import { schemeCategory10 } from 'd3-scale-chromatic'
import { select } from 'd3-selection'
import { scaleOrdinal } from 'd3-scale'
import { sum } from 'd3-array'
import * as React from 'react'
interface IDataArray {
  [index: number]: string | number;
}
export default class Pie extends React.Component {
  private dataSet: IDataArray[] = [['小米', 60.8], ['三星', 58.4], ['联想', 47.3], ['苹果', 46.6], ['华为', 41.3], ['酷派', 40.1], ['其他', 111.5]]
  private width: number = 400;
  private height: number = 400;
  private outerRadius = this.width / 3;
  private innerRadius = 0;
  private color = scaleOrdinal(schemeCategory10)
  public render() {
    return <svg id="pieSvg" />
  }
  public componentDidMount() {
    const tPie = pie<IDataArray>().value((d, i, data) => d[1] as number)
    const pieData = tPie(this.dataSet);
    const svg = select('#pieSvg')
      .attr('width', 400)
      .attr('height', 400)
    /* 弧形生成器 */
    /* arc的泛型暂时我还没有弄清楚，需要后续研究 */
    const tArc = arc<any, any>().innerRadius(this.innerRadius).outerRadius(this.outerRadius)
    /* 根据数据，画饼图的每个扇区 */
    const arcs = svg.selectAll('g')
      .data(pieData)
      .enter()
      .append('g')
      .attr('transform', `translate(${this.width / 2},${this.height / 2})`)
    arcs.append('path')
      .attr('fill', (d, i) => this.color(i.toString()))
      .attr('d', tArc)
    /* 在饼图中添加百分比文字 */
    arcs.append('text')
      .attr('transform', (d) => {
        const x = tArc.centroid(d)[0] * 1.4;
        const y = tArc.centroid(d)[1] * 1.4;
        return `translate(${x},${y})`
      })
      .attr('text-anchor', 'middle')
      .text((d) => {
        const percent = Number(d.value) / sum(this.dataSet, (dd) => dd[1] as number) * 100
        return percent.toFixed(1) + "%";
      })
    /* 添加连接到弧外文字的连线 */
    arcs.append('line')
      .attr('stroke', 'black')
      .attr('x1', (d) => tArc.centroid(d)[0] * 2)
      .attr('y1', (d) => tArc.centroid(d)[1] * 2)
      .attr('x2', (d) => tArc.centroid(d)[0] * 2.2)
      .attr('y2', (d) => tArc.centroid(d)[1] * 2.2)
    /* 添加弧形外的文字 */
    arcs.append('text')
      .attr('transform', (d) => {
        const x = tArc.centroid(d)[0] * 2.5;
        const y = tArc.centroid(d)[1] * 2.5;
        return `translate(${x},${y})`
      })
      .attr('text-anchor', 'middle')
      .text((d) => d.data[0])
  }
}