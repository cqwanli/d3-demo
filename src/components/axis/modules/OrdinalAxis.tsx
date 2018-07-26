import { scaleOrdinal } from 'd3-scale'
/**
 * 序数比例尺
 */
export default class OrdinalAxis {
  public static init() {
    this.ordinalDemo();
  }
  private static ordinalDemo() {
    const ordinal = scaleOrdinal<number, number>()
      .domain([1, 2, 3, 4, 5])
      .range([0, 100])
    console.log("**********scaleOrdinal***********")
    console.log(ordinal.range());
    console.log(ordinal(1));
    console.log(ordinal(3));
    console.log(ordinal(5));
  }
}