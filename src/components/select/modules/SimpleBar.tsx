import * as React from 'react';
import { select, Selection } from 'd3-selection'
interface IPadding {
  top: number,
  bottom: number,
  left: number,
  right: number
}
export default class extends React.Component {
  private dataset: number[] = [50, 43, 120, 87, 99, 167, 142]
  // svg绘制区域的宽度
  private width: number = 400;
  // svg绘制区域的高度
  private height: number = 400;
  // 定义上下左右的边框
  private padding: IPadding = {
    left: 20,
    right: 20,
    top: 20,
    bottom: 20
  }
  private rectStep: number = 35;
  private rectWidth: number = 30;
  public componentDidMount() {
    const rectSvg = select('#rectSvg');
    rectSvg.attr('width', this.width)
      .attr('height', this.height);
    this.createBar(rectSvg);
    this.createText(rectSvg);
  }
  public render() {
    return <svg id="rectSvg" />
  }
  private createText(svg: Selection<any, any, any, any>) {
    svg.selectAll('text')
      .data(this.dataset)
      .enter()
      .append('text')
      .attr('fill', 'white')
      .attr('font-size', "14px")
      .attr('text-anchor', 'middle')
      .attr('x', (d: any, i: number) => {
        return this.padding.left + i * this.rectStep
      })
      .attr('y', (d: any) => {
        return this.height - this.padding.bottom - d;
      })
      .attr('dx', this.rectWidth / 2)
      .attr('dy', '1em')
      .text((d: any) => d);
  }
  /**
   * 创建条形图bar
   * @param svg svg选中元素
   */
  private createBar(svg: Selection<any, any, any, any>) {
    svg.selectAll('rect')
      .data(this.dataset)
      .enter()
      .append('rect')
      .attr('fill', 'steelblue')
      .attr('x', (d: any, i: number) => {
        return this.padding.left + i * this.rectStep
      })
      .attr('y', (d: any) => {
        return this.height - this.padding.bottom - d
      })
      .attr('width', this.rectWidth)
      .attr('height', (d: any) => d);
  }
}