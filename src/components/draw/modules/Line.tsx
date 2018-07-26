import * as React from 'react';
import { select, Selection, BaseType } from 'd3-selection'
import { line } from 'd3-shape'
export default class extends React.Component {
  private width: number = 400;
  private height: number = 400;
  public componentDidMount() {
    const lineSvg = select('#line')
      .attr('width', this.width)
      .attr('height', this.height);
    this.drawSimpleLine(lineSvg);
    this.drawLineByPathData(lineSvg);
    this.drawLines(lineSvg);
  }
  public render() {
    return <svg id='line' />
  }
  /**
   *  基本画线方式
   * @param svg svg元素
   */
  private drawSimpleLine(svg: Selection<BaseType, {}, HTMLElement, any>) {
    svg.append('line')
      .attr('x1', 20)
      .attr('y1', 20)
      .attr('x2', 300)
      .attr('y2', 100)
      .attr('stroke', 'black')
  }
  /**
   * 使用路径画线
   * @param svg svg元素
   */
  private drawLineByPathData(svg: Selection<BaseType, {}, HTMLElement, any>) {
    svg.append('path')
      .attr('d', 'M30,30L200,200')
      .attr('stroke', 'red')
  }
  /**
   * 画线段
   * @param svg svg元素
   */
  private drawLines(svg: Selection<BaseType, {}, HTMLElement, any>) {
    const lines: Array<[number, number]> = [[80, 80], [200, 100], [200, 200], [100, 200]];
    const linePath = line()
    const data = linePath(lines);
    svg.append('path')
      .attr('d', data || "")
      .attr('fill', 'rgba(255,255,255,0)')
      .attr('stroke', 'blue')
  }
}