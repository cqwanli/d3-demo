import "./assets/chinaMap.css"
import * as React from 'react'
import BaseMap from './modules/BaseMap'
import ChinaMapGeo from './modules/ChinaMapGeo'
import ChinaMapTopo from './modules/ChinaMapTopo'
export default class Map extends React.Component {
  public render() {
    return <div>
      <ChinaMapTopo />
      <ChinaMapGeo />
      <BaseMap />
    </div>
  }
}