import { rgb, hsl, } from 'd3-color'
import { interpolate } from 'd3-interpolate'
export default class SimpleColor {
  public static init() {
    this.baseColorMethod();
    this.interpolateDemo();
  }
  /**
   * 基本颜色操作
   */
  private static baseColorMethod() {
    console.log('**********基本颜色操作**********')
    const color1 = rgb(40, 80, 0);
    const color2 = rgb('red');
    const color3 = rgb('rgb(255,255,0)');
    console.log(color1.brighter(2))
    console.log(color1);
    console.log(color2);
    console.log(color2.darker(2));
    console.log(hsl(color3));
    console.log(color3.toString())
  }
  /**
   * 颜色插值
   */
  private static interpolateDemo() {
    console.log('**********颜色插值**********')
    const a = rgb(255, 0, 0)
    const b = rgb(0, 255, 0)
    const compute = interpolate(a, b);
    console.log(compute(0));
    console.log(compute(0.2));
    console.log(compute(0.5));
    console.log(compute(1));
    console.log(compute(2));
    console.log(compute(-1));
  }
}