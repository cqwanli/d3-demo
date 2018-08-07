import * as React from 'react'
import { select, event, Selection, BaseType } from 'd3-selection'

export default class Interaction extends React.Component {
  // svg绘制区域的宽度
  private width: number = 400;
  // svg绘制区域的高度
  private height: number = 400;
  private characters: string[] = ['A', 'S', 'D', 'F'];
  private rects: Selection<BaseType, string, BaseType, {}>
  constructor(props: any) {
    super(props)
    this.bindEvent = this.bindEvent.bind(this);
  }
  /**
   * render
   */
  public render() {
    return <svg id="kbSvg" />
  }
  public componentDidMount() {
    this.drawCharacters();
    this.bindEvent()
  }
  private bindEvent() {
    select('body')
      .on('keydown', () => {
        this.rects.attr('fill', (d) => {
          if (d === String.fromCharCode(event.keyCode).toUpperCase()) {
            return "yellow"
          }
          else {
            return "black"
          }
        })
      })
      .on('keyup', () => {
        this.rects.attr('fill', 'black')
      })
  }
  /**
   * 画矩形边框和单词
   */
  private drawCharacters() {
    const svg = select("#kbSvg")
      .attr('width', this.width)
      .attr('height', this.height);
    this.rects = svg.selectAll('rect')
      .data(this.characters)
      .enter()
      .append('rect')
      .attr('id', (d, i) => `character_rect_${i}`)
      .attr('x', (d, i) => 10 + i * 60)
      .attr('y', 150)
      .attr('width', 55)
      .attr('height', 55)
      .attr('rx', 5)
      .attr('ry', 5)
      .attr('fill', 'black')
    svg.selectAll('text')
      .data(this.characters)
      .enter()
      .append('text')
      .attr('id', (d, i) => `character_${i}`)
      .attr('x', (d, i) => 10 + i * 60)
      .attr('y', 150)
      .attr('dx', 10)
      .attr('dy', 25)
      .attr('fill', 'white')
      .attr('font-size', 24)
      .text((d) => d)
  }
}