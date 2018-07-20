/**
 * @author wanli
 * @description 数据的处理还有排序（sort）、预处理（each）、过滤器（filter）、把自身作为参数传给函数（call）
 */
import * as React from 'react';
import { select } from 'd3-selection'
import handleArray from './modules/handleArray';
import nestedStructure from './modules/nestedStructure';
import { min, max, extent, sum, median } from 'd3-array'
export default class Hello extends React.Component<any, object>{
  public render() {
    return <div>
      <p className="hello-p">1</p>
      <p className="paragaph">This is <span>a</span> Paragraph</p>
      <div className="datum-test">
        <p>Water</p>
        <p>Fire</p>
        <p>Wind</p>
      </div>
      <div className="data-test">
        <p>Java</p>
        <p>C++</p>
        <p>Python</p>
      </div>
    </div>;
  }
  public componentDidMount() {
    this.selectFunc('.hello-p');
    this.drawVector();
    console.log(select('.paragaph').text())
    console.log(select('.paragaph').html())
    this.datumTest();
    this.dataTest();
    this.evaluation();
    handleArray()
    nestedStructure()
  }
  /**
   * d3 求值
   */
  private evaluation(): void {
    const num: number[] = [30, 20, 50, 10, 40];
    console.log(`最小值是：${min(num)}`)
    console.log(`最大值是：${max(num)}`)
    console.log(`最大最小值：${extent(num)}`)
    console.log(`数值的和：${sum(num)}`)
    console.log(`中间值：${median(num)}`)
  }
  /**
   * datum 方法测试
   * @description datum 方法会为选中元素添加__data__属性，并把该属性设置为设定值。
   * @description datum后接text()会循环选中对象中的__data__属性。
   */
  private datumTest(): void {
    const p = select('body').selectAll('.datum-test p');
    p.datum(7);
    p.append('span')
      .text((d: any, i: number) => {
        return ` ${d}`;
      })
  }
  /**
   * data 方法测试
   * @description data与datum方法不同的是，如果[1,2,3]绑定到三个对象上去，data会把3个值分别绑定到3个对象上去，而datum会把数组本身绑定到每一个对象上。
   * @description 根据选择元素数量和数组对象不相同，分为update、enter、exit三种状态。
   * @description update    数组长度=元素数量
   * @description enter     数组长度>元素数量
   * @description exit      数组长度<元素数量
   */
  private dataTest(): void {
    const dataSet = [
      { id: 1, name: "张三" },
      { id: 2, name: "李四" },
      { id: 3, name: "王五" },
      { id: 4, name: "赵六" },
      { id: 5, name: "孙七" },
    ];
    const p = select('.data-test')
      .selectAll('p');
    const update = p.data(dataSet)
    update.text((d: any) => {
      return `${d.id} ${d.name}`;
    })
      .enter()
      .append('p')
      .text(d => {
        return `${d.id} ${d.name}`;
      })
    console.log(update);
  }
  /**
   * select选择方法测试
   * @param selector 选择元素的选择标识字符串
   */
  private selectFunc(selector: string): void {
    select('body')
      .selectAll(selector)
      .text("hello,world");
  }
  /**
   * 通过svg画一个矢量的圆形
   */
  private drawVector(): void {
    const width: number = 400;
    const height: number = 400;
    const svg = select('body').append('svg').attr("width", width).attr('height', height);
    svg.append('circle')
      .attr('cx', '50px')
      .attr('cy', '50px')
      .attr('r', '50px')
      .attr('fill', 'red')
  }
}