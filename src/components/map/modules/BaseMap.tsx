import * as React from "react";
import { select, BaseType, Selection } from "d3-selection";
import { geoMercator, GeoProjection, geoPath, GeoPermissibleObjects } from "d3-geo";
import { json } from "d3-fetch";


export default class BaseMap extends React.Component {
  private width: number = 960;  // svg宽度
  private height: number = 500; // svg高度
  private svg: Selection<BaseType, {}, HTMLElement, any>  // svg select对象
  private projection: GeoProjection = geoMercator()
    .scale(this.width / 2 / Math.PI)
    // .scale(100)
    .translate([this.width / 2, this.height / 2])
  private path = geoPath().projection(this.projection)
  public render() {
    return <svg id="baseMapSvg" />
  }
  public async componentDidMount(): Promise<void> {
    this.svg = select('#baseMapSvg')
      .attr('width', this.width)
      .attr('height', this.height)
    const geojson: GeoPermissibleObjects = await json<GeoPermissibleObjects>('/mapAssets/map_simple_geo.json')
    // const geojson: GeoPermissibleObjects = await json<GeoPermissibleObjects>('http://enjalot.github.io/wwsd/data/world/world-110m.geojson')
    this.svg.append('path')
      .attr('d', this.path(geojson) || "")
  }
}