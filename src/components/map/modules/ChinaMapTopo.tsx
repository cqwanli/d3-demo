import * as React from "react";
import { select, BaseType, Selection } from "d3-selection";
import { geoMercator, GeoProjection, geoPath, GeoPermissibleObjects } from "d3-geo";
import { json } from "d3-fetch";
import { schemeCategory10 } from 'd3-scale-chromatic';
import { scaleOrdinal } from 'd3-scale';
import { feature } from 'topojson';


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
    this.svg = select('#chinaMapTopoSvg')
      .attr('width', this.width)
      .attr('height', this.height)
    const chinaTopoJson: any = await json<GeoPermissibleObjects>('/mapAssets/china_topo.json')
    const geojson: any = feature(chinaTopoJson, chinaTopoJson.objects.CHN_adm1)
    const paths = this.svg.append('g')
      .attr('class', 'states')
      .selectAll('path')
      .data(geojson.features)
      .enter()
      .append('path')
      .attr('stroke', 'white')
      .attr('fill', (d: any, i: number) => this.color(i.toString()))
      .attr('d', this.path)
    paths.append('title')
      .text((d: any) => d.properties.NL_NAME_1);
    paths.on('click', (d: any) => {
      console.log(d)
      const area = this.path.area(d)
      const centroid = this.path.centroid(d)
      const bounds = this.path.bounds(d)
      console.log(`省份：${d.properties.NL_NAME_1}`)
      console.log(`面积：${area}`)
      console.log(`中心：${centroid}`)
      console.log(`边界框：${bounds}`)

      this.svg.append('circle')
        .attr('class', 'centorid')
        .attr('cx', centroid[0])
        .attr('cy', centroid[1])
        .attr('r', 8)
      this.svg.append('rect')
        .attr('class', 'boundingbox')
        .attr('x', bounds[0][0])
        .attr('y', bounds[0][1])
        .attr('width', bounds[1][0] - bounds[0][0])
        .attr('height', bounds[1][1] - bounds[0][1])
    })

  }
  public render() {
    return <svg id="chinaMapTopoSvg" />
  }
}