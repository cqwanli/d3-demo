import Pie from './modules/Pie'
import Force from './modules/Force'
import Chord from './modules/Chord'
import Tree from './modules/Tree'
import * as React from 'react'
export default class Animations extends React.Component {
  public render() {
    return <div>
      <Tree />
      <Chord />
      <Force />
      <Pie />
    </div>
  }
}