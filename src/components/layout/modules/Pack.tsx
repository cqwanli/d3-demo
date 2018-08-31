import '../assets/pack.css'
import { select } from 'd3-selection'
import { scaleSequential } from 'd3-scale'
import { pack, stratify } from 'd3-hierarchy'
import { data } from '../assets/pack'
import { csvParse } from 'd3-dsv'
import { format } from 'd3-format'
import { interpolateMagma } from 'd3-scale-chromatic'
import * as React from 'react'
export default class Pack extends React.Component {
  private width: number = 1000;  // svg的宽度
  private height: number = 1000; // svg的高度
  private color = scaleSequential(interpolateMagma).domain([-4, 4])
  private tData = csvParse(data);
  constructor(props: any) {
    super(props)
    this.hovered = this.hovered.bind(this);
  }
  public componentDidMount() {
    const svg = select('#packSvg')
      .attr('width', this.width)
      .attr('height', this.height)

    const tStratify = stratify()
      .parentId((d: any) => d.id.substring(0, d.id.lastIndexOf(".")));

    const tPack = pack()
      .size([this.width - 2, this.height - 2])
      .padding(3)

    const root = tStratify(this.tData)
      .sum((d: any) => d.value)
      .sort((a: any, b: any) => b.value - a.value)

    tPack(root);
    const node = svg.select('g')
      .selectAll('g')
      .data(root.descendants())
      .enter()
      .append("g")
      .attr('transform', (d: any) => `translate(${d.x},${d.y})`)
      .attr("class", (d: any) => "node" + (!d.children ? " node--leaf" : d.depth ? "" : " node--root"))
      .attr('id', (d: any) => `g_${d.id}`)
      .on("mouseover", this.hovered(true))
      .on("mouseout", this.hovered(false));

    node.append('circle')
      .attr('id', (d: any) => `node-${d.id}`)
      .attr("r", (d: any) => d.r)
      .style('fill', (d: any) => this.color(d.depth))
    const leaf = node.filter((d: any) => !d.children);
    leaf.append("clipPath")
      .attr("id", (d: any) => "clip-" + d.id)
      .append("use")
      .attr("xlink:href", (d: any) => "#node-" + d.id + "");
    leaf.append("text")
      .attr("clip-path", (d: any) => "url(#clip-" + d.id + ")")
      .selectAll("tspan")
      .data((d: any) => d.id.substring(d.id.lastIndexOf(".") + 1).split(/(?=[A-Z][^A-Z])/g))
      .enter().append("tspan")
      .attr("x", 0)
      .attr("y", (d: any, i: number, nodes: any) => 13 + (i - nodes.length / 2 - 0.5) * 10)
      .text((d: any) => d);

    node.append("title")
      .text((d: any) => d.id + "\n" + format(d.value));
  }
  public render() {
    return <svg id="packSvg" >
      <g transform="translate(1,1)" />
    </svg>
  }
  private hovered(hover: boolean) {
    return (d: any) => {
      // console.log(d.ancestors())
      // return selectAll(d.ancestors().map((d1: any) => d1.node)).classed("node--hover", hover)
      d.ancestors().map((d1: any) => {
        // console.log(select(`#g_${d1.id}`))
        select(`#g_${d1.id}`).classed("node--hover", hover)
        // return select(`${d1.id}`).pa
      })
    }
  }
}