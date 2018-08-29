import '../assets/tree.css'
import * as React from 'react'
import { select } from 'd3-selection'
import { data } from '../assets/flare'
import { csvParse } from 'd3-dsv'
import { tree, stratify } from 'd3-hierarchy'
import { linkHorizontal } from 'd3-shape'
// import { treeData, ITreeNode } from '../assets/treeAsset'
/**
 * tree layout
 * 注意：
 * 1、默认情况下tree是树直排列的。如果需要水平排列，需要在node和link中兑换x y坐标
 * 2、tree的link支持自定义样式，官方提供了link样式模板“linkHorizontal”其他几种在d3-shape中可以查看到
 */
export default class Tree extends React.Component {
  private width: number = 960;  // svg的宽度
  private height: number = 2000; // svg的高度
  private treeData = csvParse(data) // 格式化cvs数据
  public componentDidMount() {
    const svg = select('#treeSvg')
      .attr('width', this.width)
      .attr('height', this.height)
    const g = svg.append('g')
      .attr('class', 'tree-group')
      .attr('transform', `translate(50,50)`)
    const tTree = tree()
      .size([this.height, this.width - 160])
    const tStratify = stratify()
      .parentId((d: any) => d.id.substring(0, d.id.lastIndexOf(".")))

    const root = tStratify(this.treeData)
      .sort((a: any, b: any) => (a.height - b.height) || a.id.localeCompare(b.id))
    g.selectAll('.link')
      .data(tTree(root).links())
      .enter()
      .append("path")
      .attr("class", "link")
      .attr('d', linkHorizontal()
        .x((d: any) => d.y)
        .y((d: any) => d.x) as any)
    const node = g.selectAll('.node')
      .data(root.descendants())
      .enter()
      .append('g')
      .attr('class', (d: any) => "node" + (d.children ? " node--internal" : " node--leaf"))
      .attr('transform', (d: any) => `translate(${d.y},${d.x})`)
    node.append('circle')
      .attr('r', 2.5)
    node.append('text')
      .attr('dy', 3)
      .attr('x', (d: any) => d.children ? -8 : 8)
      .style("text-anchor", (d: any) => d.children ? "end" : "start")
      .text((d: any) => d.id.substring(d.id.lastIndexOf(".") + 1));
  }
  public render() {
    return <svg id="treeSvg" />
  }
}