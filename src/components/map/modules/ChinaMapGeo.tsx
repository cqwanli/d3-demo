import * as React from "react";
import { select, BaseType, Selection } from "d3-selection";
import { geoMercator, GeoProjection, geoPath, GeoPermissibleObjects } from "d3-geo";
import { json } from "d3-fetch";
import { schemeCategory10 } from 'd3-scale-chromatic';
import { scaleOrdinal } from 'd3-scale';


export default class ChinaMapGeo extends React.Component {
  private width: number = 1200;  // svg宽度
  private height: number = 800; // svg高度
  private svg: Selection<BaseType, {}, HTMLElement, any>  // svg select对象
  private color = scaleOrdinal(schemeCategory10)
  private projection: GeoProjection = geoMercator()
    .center([107, 31])
    .scale(950)
    .translate([this.width / 2, this.height / 2 + this.height / 6])
  private path = geoPath().projection(this.projection)
  public async componentDidMount(): Promise<void> {
    this.svg = select('#chinaMapGeoSvg')
      .attr('width', this.width)
      .attr('height', this.height)
    const geojson: any = await json<GeoPermissibleObjects>('/mapAssets/china_geo.json')
    this.svg.append('g')
      .attr('class', 'states')
      .selectAll('path')
      .data(geojson.features)
      .enter()
      .append('path')
      .attr('stroke', 'white')
      .attr('fill', (d: any, i: number) => this.color(i.toString()))
      .attr('d', this.path)
      .append('title')
      .text((d: any) => d.properties.name);

  }
  public render() {
    return <svg id="chinaMapGeoSvg" />
  }
}