import '../assets/partition.css'
import { select } from 'd3-selection'
import { data } from '../assets/partition'
import { csvParse, DSVRowString, DSVParsedArray } from 'd3-dsv'
import { format } from 'd3-format'
import { stratify, partition, HierarchyNode } from 'd3-hierarchy'
import * as React from 'react'
import { scaleOrdinal } from 'd3-scale';
import { schemeCategory10 } from 'd3-scale-chromatic';
// interface IPartItem extends DSVRowString {
//   id: string,
//   value: string
// }
export default class Partition extends React.Component {
  private width: number = 960;
  private height: number = 4980;
  private tData: DSVParsedArray<DSVRowString> = csvParse(data)
  private color = scaleOrdinal(schemeCategory10)
  private tFormat = format(',d')
  private tStratify = stratify<DSVRowString>()
    .parentId((d: any) => d.id.substring(0, d.id.lastIndexOf(".")));
  private tPartition = partition<DSVRowString>()
    .size([this.height, this.width])
    .padding(1)
    .round(true);
  public render() {
    return <svg id="partitionSvg" />
  }
  public componentDidMount() {
    const svg = select('#partitionSvg')
      .attr('width', this.width)
      .attr('height', this.height)
    const root = this.tStratify(this.tData)
      .sum((d: DSVRowString) => Number(d.value))
      .sort((a, b) => (b.height - a.height) || (Number(b.value) - Number(a.value)))
    this.tPartition(root)
    const cell = svg.selectAll('.partition-node')
      .data(root.descendants())
      .enter()
      .append('g')
      .attr('class', (d: HierarchyNode<DSVRowString>) => "partition-node" + (d.children ? " partition-node--internal" : " partition-node--leaf"))
      .attr('transform', (d: any) => "translate(" + d.y0 + "," + d.x0 + ")")


    cell.append("rect")
      .attr("id", (d) => "rect-" + d.id)
      .attr("width", (d: any) => d.y1 - d.y0)
      .attr("height", (d: any) => d.x1 - d.x0)
      .filter((d) => !d.children)
      .style("fill", (d: any) => {
        while (d.depth > 1) {
          d = d.parent
        }
        return this.color(d.id);
      });
    cell.append("clipPath")
      .attr("id", (d) => "clip-" + d.id)
      .append("use")
      .attr("xlink:href", (d) => "#rect-" + d.id + "");
    cell.append("text")
      .attr("clip-path", (d) => "url(#clip-" + d.id + ")")
      .attr("x", 4)
      .selectAll("tspan")
      .data((d: any) => [d.id.substring(d.id.lastIndexOf(".") + 1), " " + this.tFormat(d.value)])
      .enter().append("tspan")
      .attr("y", 13)
      .text((d) => d);
    cell.append("title")
      .text((d: any) => d.id + "\n" + format(d.value));
  }
}