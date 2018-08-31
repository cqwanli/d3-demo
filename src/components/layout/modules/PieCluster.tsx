import '../assets/tree.css'
import * as React from 'react'
import { select } from 'd3-selection'
import { data } from '../assets/flare'
import { csvParse } from 'd3-dsv'
import { cluster, stratify, HierarchyPointNode } from 'd3-hierarchy'
import { linkRadial } from 'd3-shape'
// import { treeData, ITreeNode } from '../assets/treeAsset'
/**
 * cluster layout
 * 注意：
 * 1、默认情况下cluster是树直排列的。如果需要水平排列，需要在node和link中兑换x y坐标
 * 2、cluster的link支持自定义样式，官方提供了link样式模板“linkHorizontal”其他几种在d3-shape中可以查看到
 * 3、cluster和tree的区别是cluster的所有页子节点都在同一层级
 * 4、tPieCluster(root) 会直接为root对象添加位置信息，所以必须先生成link再生成node，顺序不能颠倒。
 */
export default class PieCluster extends React.Component {
  private width: number = 1000;  // svg的宽度
  private height: number = 1000; // svg的高度
  private treeData = csvParse(data) // 格式化cvs数据
  public componentDidMount() {
    const svg = select('#pieClusterSvg')
      .attr('width', this.width)
      .attr('height', this.height)
    const g = svg.append('g')
      .attr('class', 'tree-group')
      .attr('transform', `translate(${this.width / 2},${this.height / 2})`)
    const tPieCluster = cluster()
      .size([360, this.height / 2 - 160])
      .separation((a: HierarchyPointNode<{}>, b: HierarchyPointNode<{}>) => (a.parent === b.parent ? 1 : 2) / a.depth)

    const tStratify = stratify()
      .parentId((d: any) => d.id.substring(0, d.id.lastIndexOf(".")))

    const root = tStratify(this.treeData)
      .sort((a: any, b: any) => (a.height - b.height) || a.id.localeCompare(b.id))
    g.selectAll('.link')
      .data(tPieCluster(root).links())
      .enter()
      .append("path")
      .attr("class", "link")
      .attr('d', linkRadial()
        .radius((d: any) => d.y)
        .angle((d: any) => d.x / 180 * Math.PI) as any)
    const node = g.selectAll('.node')
      .data(root.descendants())
      .enter()
      .append('g')
      .attr('class', (d: any) => "node" + (d.children ? " node--internal" : " node--leaf"))
      .attr('transform', (d: any) => `rotate(${d.x - 90}) translate(${d.y})`)
    node.append('circle')
      .attr('r', 2.5)
    node.append('text')
      .attr('dy', 3)
      .attr('transform', (d: any) => d.x < 180 ? "translate(8)" : "rotate(180)translate(-8)")
      .style("text-anchor", (d: any) => d.x < 180 ? "start" : "end")
      .text((d: any) => d.id.substring(d.id.lastIndexOf(".") + 1));
  }
  public render() {
    return <svg id="pieClusterSvg" />
  }
}