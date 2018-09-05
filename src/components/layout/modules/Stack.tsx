import * as React from 'react'
import '../assets/stack.css'
import { select, Selection, BaseType } from 'd3-selection';
import { scaleBand, scaleLinear, scaleOrdinal } from 'd3-scale';
import { schemeCategory10 } from 'd3-scale-chromatic';
import { stack } from 'd3-shape';
import { data } from 'src/components/layout/assets/stack';
import { csvParse, DSVParsedArray, DSVRowString } from 'd3-dsv';
import { max } from 'd3-array';
import { axisBottom, axisLeft } from 'd3-axis';
export default class Stack extends React.Component {
  private width: number = 600;
  private height: number = 500;
  private margin = { top: 20, right: 180, bottom: 30, left: 40 }
  private tData: DSVParsedArray<DSVRowString> = csvParse(data, this.type).sort((a: any, b: any) => Number(b.total) - Number(a.total));
  private svg: Selection<BaseType, {}, HTMLElement, any>
  private g: Selection<BaseType, {}, HTMLElement, any>
  private x = scaleBand()
    .rangeRound([0, this.width - this.margin.left - this.margin.right])
    .padding(0.3)
    .align(0.3)
  private y = scaleLinear()
    .rangeRound([this.height - this.margin.top - this.margin.bottom, 0])
  private z = scaleOrdinal(schemeCategory10)
  private tStack = stack<DSVRowString>()
  public render() {
    return <svg id="stackSvg" />
  }
  public componentDidMount() {
    this.svg = select('#stackSvg')
      .attr('width', this.width)
      .attr('height', this.height)
    this.g = this.svg.append('g').attr("transform", `translate(${this.margin.left},${this.margin.top})`);
    this.x.domain(this.tData.map((d: any) => d.ethnicity))
    this.y.domain([0, max(this.tData, (d: any) => d.total)]).nice()
    this.z.domain(this.tData.columns.slice(1))

    this.g.selectAll('.serie')
      .data(this.tStack.keys(this.tData.columns.slice(1))(this.tData))
      .enter()
      .append('g')
      .attr("class", "serie")
      .attr("fill", (d) => this.z(d.key))
      .selectAll("rect")
      .data((d) => d)
      .enter().append("rect")
      .attr("x", (d) => this.x(d.data.ethnicity || "") as any)
      .attr("y", (d) => {
        // console.log(d[1], this.y(d[1]))

        return this.y(d[1])
      })
      .attr("height", (d) => this.y(d[0]) - this.y(d[1]))
      .attr("width", this.x.bandwidth());

    this.g.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", `translate(0,${this.height - this.margin.top - this.margin.bottom})`)
      .call(axisBottom(this.x));

    this.g.append("g")
      .attr("class", "axis axis--y")
      .call(axisLeft(this.y).ticks(10, "s"))
      .append("text")
      .attr("x", 2)
      .attr("y", this.y(this.y.ticks(10).pop() || 0))
      .attr("dy", "0.35em")
      .attr("text-anchor", "start")
      .attr("fill", "#000")
      .text("Population");

    const legend = this.g.selectAll(".legend")
      .data(this.tData.columns.slice(1).reverse())
      .enter().append("g")
      .attr("class", "legend")
      .attr("transform", (d, i) => "translate(0," + i * 20 + ")")
      .style("font", "10px sans-serif");

    legend.append("rect")
      .attr("x", this.width - this.margin.left - this.margin.right + 18)
      .attr("width", 18)
      .attr("height", 18)
      .attr("fill", this.z);

    legend.append("text")
      .attr("x", this.width - this.margin.left - this.margin.right + 44)
      .attr("y", 9)
      .attr("dy", ".35em")
      .attr("text-anchor", "start")
      .text((d) => d);
  }
  /**
   * csv数据格式化，添加所有字段数字相加的总和
   * @param d 当前行数据
   * @param i 行数
   * @param columns 每行的标题（key值）
   * @returns 处理后的数据 
   */
  private type(d: DSVRowString, i: number, columns: string[]) {
    let t = 0;
    for (const column of columns) {
      t += Number(d[column]) || 0
    }
    d.total = t.toString();
    return d;
  }
}