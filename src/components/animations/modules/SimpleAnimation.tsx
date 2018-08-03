import * as React from 'react'
import { select, Selection, BaseType } from 'd3-selection'
import { easeBounce } from 'd3-ease'
import { scaleLinear } from 'd3-scale'
import { axisBottom } from 'd3-axis'
export default class Animations extends React.Component {
  private width: number = 800;
  private height: number = 800;
  public componentDidMount() {
    const transSvg = select('#transation')
      .attr('width', this.width)
      .attr('height', this.height);
    this.simpleAnimations(transSvg);
    this.childAnimations(transSvg);
    this.axisAnimations(transSvg);
  }
  public render() {
    return <svg id="transation" />
  }
  /**
   * 坐标轴动画方法
   * @param svg svg对象
   * @description 在d3 v5中 transition().call(xAxis)会出现类型不对，需要使用transition().call(xAxis.bind(this))
   */
  private axisAnimations(svg: Selection<BaseType, {}, HTMLElement, any>) {
    const xScale = scaleLinear()
      .domain([0, 10])
      .range([0, 300])
    const xAxis = axisBottom(xScale)
    const g3 = svg.append('g')
      .attr('transform', 'translate(0,400)')
      .attr('class', 'axis')
      .call(xAxis)
    xScale.domain([0, 50])
    g3.transition()
      .duration(2000)
      .call(xAxis.bind(this))
  }
  /**
   * 子元素动画
   * @param svg 
   */
  private childAnimations(svg: Selection<BaseType, {}, HTMLElement, any>) {
    const dataset = [100, 100, 100];
    const g2 = svg.append('g')
      .attr('transform', 'translate(400,0)')
    g2.selectAll('rect')
      .data(dataset)
      .enter()
      .append('rect')
      .attr('fill', 'steelblue')
      .attr('id', (d, i) => `rect${i}`)
      .attr('x', 10)
      .attr('y', (d, i) => 10 + 35 * i)
      .attr('width', (d, i) => d)
      .attr('height', 30)

    g2.transition()
      .delay(200)
      .ease(easeBounce)
      .duration(2000)
      .select('#rect1')
      .attr('width', 300)
  }
  /**
   * 简单动画
   * @param svg svg select对象
   */
  private simpleAnimations(svg: Selection<BaseType, {}, HTMLElement, any>) {
    const rect = svg.append('rect')
      .attr('fill', 'steelblue')
      .attr('x', 10)
      .attr('y', 10)
      .attr('width', 100)
      .attr('height', 30)
    const rectTran = rect.transition()
      .delay(500)   // 延迟500毫秒
      .duration(1000) // 动画持续时间1000毫秒
      .ease(easeBounce) // 设置过渡样式
      .attr('width', 300)
    rectTran.transition()
      .attr('height', 300)
      .transition()
      .attr('fill', 'lightgreen')
      .transition()
      .attr('width', 100)
      .transition()
      .attr('height', 100)
      .transition()
      .duration(2000)
      .attrTween("width", (d, i, a) => (t) => {
        return (t * 300).toString()
      })
      .transition()
      .attr('width', 0)
      .attr('fill', 'white')
      .transition()
      .remove()
  }
}