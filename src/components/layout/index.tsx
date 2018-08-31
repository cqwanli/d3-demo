import Pie from './modules/Pie'
import Force from './modules/Force'
import Chord from './modules/Chord'
import Tree from './modules/Tree'
import Cluster from './modules/Cluster'
import PieCluster from './modules/PieCluster'
import Pack from './modules/Pack'
import Histogram from './modules/Histogram'
import * as React from 'react'
export default class Animations extends React.Component {
  public render() {
    return <div>
      <Histogram />
      <Pack />
      <PieCluster />
      <Cluster />
      <Tree />
      <Chord />
      <Force />
      <Pie />
    </div>
  }
}