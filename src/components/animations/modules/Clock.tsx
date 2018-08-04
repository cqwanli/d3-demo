import '../assets/clock.css'
import * as React from 'react'
import { select } from 'd3-selection'
export default class Clock extends React.Component<any, any> {
  private width: number = 400;
  private height: number = 150;
  private interval: any = undefined;
  constructor(props: any) {
    super(props);
    this.updateTime = this.updateTime.bind(this);
  }
  /**
   * dom 渲染方法
   */
  public render() {
    return <svg id="clock" />
  }
  /**
   * 页面渲染完成时触发事件
   */
  public componentDidMount() {
    const svg = select('#clock')
      .attr('width', this.width)
      .attr('height', this.height);
    svg.append('text')
      .attr('x', 100)
      .attr('y', 100)
      .attr('class', 'time')
      .text(this.getTimeString());
    this.interval = setInterval(this.updateTime, 1000);
  }
  public componentWillUnmount() {
    clearInterval(this.interval);
  }
  /**
   * 更新时钟时间
   * @param text {Selection<BaseType, {}, HTMLElement, any>} text对象
   */
  private updateTime(): void {
    select('text').text(this.getTimeString());
  }
  /**
   * 获取当前时间
   * @returns {string} 当前时间字符串
   */
  private getTimeString(): string {
    const time = new Date();
    let hours: number | string = time.getHours();
    let minutes: number | string = time.getMinutes();
    let seconds: number | string = time.getSeconds();

    /* 当时间为一位数的时候，将时间设置成两位数 */
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    return `${hours}:${minutes}:${seconds}`;
  }
}