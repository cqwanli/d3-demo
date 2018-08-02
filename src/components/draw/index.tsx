import * as React from 'react';
import SimpleColor from './modules/SimpleColor'
import Line from './modules/Line'
import Arc from './modules/Arc'
import Symbol from './modules/Symbol'
// import { select } from 'd3-selection'
export default class Hello extends React.Component<any, object>{
  public componentWillMount() {
    SimpleColor.init();
  }
  public render() {
    return <div>
      <Line />
      <Arc />
      <Symbol />
    </div>
  }
}