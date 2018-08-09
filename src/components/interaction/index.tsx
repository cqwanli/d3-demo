
import MouseEvent from './modules/MouseEvent'
import SimpleClick from './modules/SimpleClick'
import KeyboardEvent from './modules/KeyboardEvent'
import TouchEvent from './modules/TouchEvent'
import DragBehavior from './modules/DragBehavior'
import ZoomBehavior from './modules/ZoomBehavior'
import * as React from 'react'
export default class Interaction extends React.Component {
  public render() {
    return <div>
      <ZoomBehavior />
      <DragBehavior />
      <TouchEvent />
      <KeyboardEvent />
      <MouseEvent />
      <SimpleClick />
    </div>
  }
}