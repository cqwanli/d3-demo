import { scaleLinear, scalePow, scaleQuantize } from 'd3-scale'
/**
 * 定量比例尺
 */
export default class RationAxis {
  public static init() {
    this.linerDemo();
    this.niceDemo();
    this.exponentDemo();
    this.quantizeDemo();
  }
  /**
   * 线性比例尺
   */
  private static linerDemo() {
    const liner = scaleLinear()
      .domain([0, 500])
      .range([0, 100]);
    console.log("****************线性比例尺******************")
    console.log(liner(50))
    console.log(liner(200))
    console.log(liner(450))
  }
  /**
   * nice 区间数值美化
   */
  private static niceDemo() {
    console.log("****************nice()******************")
    const domain1 = [0.1230000001, 0.488888888];
    const liner1 = scaleLinear().domain(domain1).nice();
    console.log(domain1);
    console.log(liner1.domain());
    const domain2 = [33.611111, 45.971129];
    const liner2 = scaleLinear().domain(domain2).nice();
    console.log(domain2);
    console.log(liner2.domain());
  }
  /**
   * 指数比例尺
   */
  private static exponentDemo() {
    console.log("****************指数比例尺******************")
    console.log("设置指数比例尺的指数为3")
    const pow = scalePow().exponent(3);
    console.log(pow(2));
    console.log(pow(3));
    console.log("设置指数比例尺的指数为0.5,即平方根")
    pow.exponent(0.5);
    console.log(pow(2));
    console.log(pow(3));
  }
  /**
   * 量子和分位比例尺
   */
  private static quantizeDemo() {
    console.log("****************量子和分位比例尺******************")
    const quantize = scaleQuantize<string>()
      .domain([0, 10])
      .range(['red', 'green', 'blue', 'yellow', 'black'])
    console.log(quantize(1));
    console.log(quantize(3));
    console.log(quantize(5.9999));
    console.log(quantize(6));
  }
}