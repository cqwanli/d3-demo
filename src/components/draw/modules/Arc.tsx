import * as React from 'react'
import { select, Selection, BaseType } from 'd3-selection'
import { arc, DefaultArcObject } from 'd3-shape'
import { schemeCategory10 } from 'd3-scale-chromatic'
import { scaleOrdinal } from 'd3-scale'
export default class Arc extends React.Component {
  private width: number = 400;
  private height: number = 400;
  private dataSet: DefaultArcObject = { startAngle: 0, endAngle: Math.PI * 0.75, innerRadius: 50, outerRadius: 100 }
  private dataSet2: DefaultArcObject[] = [
    { startAngle: 0, endAngle: Math.PI * 0.6, innerRadius: 0, outerRadius: 100 },
    { startAngle: Math.PI * 0.6, endAngle: Math.PI, innerRadius: 0, outerRadius: 100 },
    { startAngle: Math.PI, endAngle: Math.PI * 1.7, innerRadius: 0, outerRadius: 100 },
    { startAngle: Math.PI * 1.7, endAngle: Math.PI * 2, innerRadius: 0, outerRadius: 100 }
  ]
  public componentDidMount() {
    const arcSvg = select('#arc')
      .attr('width', this.width)
      .attr('height', this.height);
    arcSvg.append('path')
      .attr('d', arc()(this.dataSet) || "")
    this.drawPie(arcSvg);
  }
  public render() {
    return <svg id='arc' />
  }
  /**
   * 画饼图
   * @param svg svg元素
   */
  private drawPie(svg: Selection<BaseType, {}, HTMLElement, any>) {
    const color = scaleOrdinal(schemeCategory10);
    const svgGroup = svg.append('g');
    /* 添加扇区 */
    svgGroup
      .selectAll('path')
      .data(this.dataSet2)
      .enter()
      .append('path')
      .attr('d', (d: DefaultArcObject) => arc()(d))
      .attr('transform', 'translate(250,250)')
      .attr('stroke', 'black')
      .attr('stroke-width', '2px')
      .attr('fill', (d: any, i: number) => {
        return color(i.toString())
      })
    /* 添加文字 */
    svgGroup
      .selectAll('text')
      .data(this.dataSet2)
      .enter()
      .append('text')
      .attr('transform', (d: DefaultArcObject) => {
        return "translate(250,250)" + `translate(${arc().centroid(d)})`
      })
      .attr('text-anchor', 'middle')
      .attr('fill', 'white')
      .attr('font-size', '18px')
      .text((d: DefaultArcObject) => {
        return Math.floor((d.endAngle - d.startAngle) * 180 / Math.PI)
      })

  }
}