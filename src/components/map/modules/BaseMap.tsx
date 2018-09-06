import * as React from "react";
import { select, BaseType, Selection } from "d3-selection";
import { geoMercator } from "d3-geo";

export default class BaseMap extends React.Component {
  private width: number = 960;  // svg宽度
  private height: number = 500; // svg高度
  private svg: Selection<BaseType, {}, HTMLElement, any>  // svg select对象
  public render() {
    return <svg id="baseMapSvg" />
  }
  public componentDidMount() {
    this.svg = select('#baseMapSvg')
      .attr('width', this.width)
      .attr('height', this.height)

    const projection = geoMercator()
      .scale(this.width / 2 / Math.PI)
      .translate([this.width / 2, this.height / 2])
  }
}