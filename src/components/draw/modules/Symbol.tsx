/**
 * 符号生成器demo
 * @author wanli
 */
import * as React from 'react'
import { select, Selection, BaseType } from 'd3-selection'
import { symbols, symbol } from 'd3-shape'
import { schemeCategory10 } from 'd3-scale-chromatic'
import { scaleOrdinal } from 'd3-scale'
export default class Symbol extends React.Component {
  private width: number = 400;
  private height: number = 400;
  public componentDidMount() {
    const symbolDemo = select('#symbolDemo')
      .attr('width', this.width)
      .attr('height', this.height);

    this.draw30Symbols(symbolDemo);
  }
  public render() {
    return <svg id="symbolDemo" />
  }
  /**
   * 画图标
   * @param svg svg Selection对象
   * @description color的生成方法和D3 v3的方式有所不同，需要特别注意
   */
  private draw30Symbols(svg: Selection<BaseType, {}, HTMLElement, any>) {
    const n: number = 30;
    const dataSet = []
    for (let i = 0; i < n; i++) {
      dataSet.push({
        size: Math.random() * 30 + 200,
        type: symbols[Math.floor(Math.random() * symbols.length)]
      })
    }
    const dSymbol = symbol().size((d: any) => d.size).type((d: any) => d.type)
    const color = scaleOrdinal(schemeCategory10);
    svg.selectAll()
      .data(dataSet)
      .enter()
      .append('path')
      .attr('d', (d: any) => dSymbol(d))
      .attr('transform', (d: any, i: number) => {
        const x = 100 + i % 5 * 20;
        const y = 100 + Math.floor(i / 5) * 20
        return `translate(${x},${y})`;
      })
      .attr('fill', (d: any, i: number) => color(i.toString()))
  }
}