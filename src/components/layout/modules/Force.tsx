import { select, event } from 'd3-selection'
import * as React from 'react'
import { forceSimulation, forceLink, forceManyBody, forceCenter } from 'd3-force'
import data from '../assets/forcegraph'
import { scaleOrdinal } from 'd3-scale'
import { schemeCategory10 } from 'd3-scale-chromatic'
import { drag } from 'd3-drag'
export default class Force extends React.Component {
  private width: number = 800;
  private height: number = 600;
  private color = scaleOrdinal(schemeCategory10);
  public render() {
    return <svg id="forceSvg" />
  }
  public componentDidMount() {
    const tForce = forceSimulation()
      .nodes(data.nodes)  // 设置节点数组
      .force('charge', forceManyBody().strength(-120))  // 设置节点电荷数
      .force('link', forceLink(data.links).distance(50))  // 设置连接线数组
      .force('center', forceCenter(this.width / 2, this.height / 2)); // 设置画布中心点

    const svg = select('#forceSvg')
      .attr('width', this.width)
      .attr('height', this.height)




    const link = svg
      .selectAll('line')
      .data(data.links)
      .enter()
      .append('line')
      .style('stroke', '#999999')
      .style('stroke-opacity', 0.6)
      .style('stroke-width', d => Math.sqrt(d.value));

    const node = svg
      .selectAll('circle')
      .data(data.nodes)
      .enter()
      .append<SVGCircleElement>('circle')
      .attr('r', 5)
      .style('stroke', '#FFFFFF')
      .style('stroke-width', 1.5)
      .style('fill', (d: any) => this.color(d.group))
      .call(
        drag()
          .on('start', dragStarted)
          .on('drag', dragged)
          .on('end', dragEnded),
    );
    /**
     * force.on()监听start、tick、end三种事件
     * start 是刚开始运动
     * tick 表示运动的每一步
     * end 表示运动停止
     */
    tForce.on('tick', () => {
      link
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y);

      node.attr('cx', (d: any) => d.x).attr('cy', (d: any) => d.y);
    });

    function dragStarted(d: any) {
      if (!event.active) {
        tForce.alphaTarget(0.3).restart();
      }
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(d: any) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragEnded(d: any) {
      if (!event.active) {
        tForce.alphaTarget(0);
      }
      d.fx = null;
      d.fy = null;
    }
  }
}