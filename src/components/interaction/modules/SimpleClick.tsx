import * as React from 'react'
import { select } from 'd3-selection'
export default class Interaction extends React.Component {
  public render() {
    return <div>
      <p id="mypara">Click Here</p>
      <p id="mult">Click multiply times</p>
    </div>
  }
  public componentDidMount() {
    select('#mypara')
      .on('click', (d) => {
        select("#mypara").text("Thank you")
      })

    select('#mult')
      .on('click.first', () => {
        console.log("First Click!")
      })
      .on("click.second", () => {
        console.log("Second Click!")
      })
  }
}