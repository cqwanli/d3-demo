import Pie from './modules/Pie'
import Force from './modules/Force'
import * as React from 'react'
export default class Animations extends React.Component {
  public render() {
    return <div>
      <Force />
      <Pie />
    </div>
  }
}