import * as React from 'react'
import MouseEvent from './modules/MouseEvent'
import SimpleClick from './modules/SimpleClick'
import KeyboardEvent from './modules/KeyboardEvent'
export default class Interaction extends React.Component {
  public render() {
    return <div>
      <KeyboardEvent />
      <MouseEvent />
      <SimpleClick />
    </div>
  }
}