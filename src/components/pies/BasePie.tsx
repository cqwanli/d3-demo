import * as React from 'react';
import './assets/style.css';
import { select, Selection, scaleOrdinal, ScaleOrdinal, BaseType, pie, Pie, arc, Arc } from 'd3';
import data from './assets/basePieData'
interface IPerson {
  age: string,
  population: number
}
export default class Hello extends React.Component<any, object>{
  private svg: Selection<SVGSVGElement, any, any, any>
  private width: number;
  private height: number;
  private radius: number;
  private g: Selection<BaseType, any, any, any>;
  private color: ScaleOrdinal<string, string> = scaleOrdinal(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);
  private $pie: Pie<this, IPerson> = pie<this, IPerson>().sort(null).value((d: IPerson) => d.population);
  private path: Arc<any, any> = arc<any, any>().outerRadius(this.radius - 10).innerRadius(0);
  // private label: Arc<any, any> = arc<any, any>().outerRadius(this.radius - 40).innerRadius(this.radius - 40);
  /**
   * 页面加载完成后触发事件
   */
  public componentDidMount(): void {
    this.width = +this.svg.attr('width');
    this.height = +this.svg.attr('height');
    this.radius = Math.min(this.width, this.height) / 2;
    this.g = this.svg.append("g").attr("transform", "translate(" + this.width / 2 + "," + this.height / 2 + ")");
    const $arc = this.g.selectAll('.arc')
      .data(this.$pie(data))
      .enter()
      .append("g")
      .attr("class", "arc");
    $arc.append("path")
      .attr("d", this.path)
      .attr('fill', d => this.color(d.data.age));

  }
  public render() {
    return <svg ref={(c: SVGSVGElement) => this.svg = select(c)} width="960" height="500" />
  }
}