import * as React from 'react';
import RationAxis from './modules/RationAxis'
import QuantizeDemo from './modules/QuantizeDemo'
import OrdinalAxis from './modules/OrdinalAxis'
import DrawAxis from './modules/DrawAxis'
import ScatterDiagram from './modules/ScatterDiagram'
import './assets/style.css';
export default class Axis extends React.Component {
  public componentDidMount() {
    RationAxis.init();
    OrdinalAxis.init();
  }
  public render() {
    return <div>
      <h1>Axis</h1>
      <QuantizeDemo />
      <DrawAxis />
      <ScatterDiagram />
    </div>
  }
}