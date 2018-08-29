import * as React from 'react'
import { schemeCategory10 } from 'd3-scale-chromatic'
import { select } from 'd3-selection'
import { scaleOrdinal } from 'd3-scale'
import { chord, ribbon } from 'd3-chord'
import { ascending } from 'd3-array'
import { arc } from 'd3-shape'
/**
 * 弦图
 */
export default class Chord extends React.Component {
  private continent: string[] = ["亚洲", "欧洲", "非洲", "美洲", "大洋洲"];
  private width: number = 400;  // svg的宽度
  private height: number = 400; // svg的高度
  private color = scaleOrdinal(schemeCategory10); // 颜色比例尺
  private innerRadius = this.width / 2 * 0.7  // 设置chord layout 圆弧的内部半径
  private outerRadius = this.innerRadius * 1.1 // 设置chord layout 圆弧的外部半径
  /* 设置chord 矩阵数据 */
  private population = [
    [9000, 870, 3000, 1000, 5200],
    [3400, 8000, 2300, 4922, 374],
    [2000, 2000, 7700, 4881, 1050],
    [3000, 8012, 5531, 500, 400],
    [3540, 4310, 1500, 1900, 300]
  ]
  public componentDidMount() {
    const tChordData = chord()
      .padAngle(0.03)
      .sortSubgroups(ascending)(this.population)
    const svg = select('#chordSvg')
      .attr('width', 400)
      .attr('height', 400)
    /* 创建分组，并把左上角位置移动到svg中心 */
    const gChord = svg.append('g').attr('class', 'groups')
      .attr('transform', `translate(${this.width / 2},${this.height / 2})`)
    const gOuter = gChord.append('g')
    const gInner = gChord.append('g')

    /* 创建圆弧生成器 */
    const arcOuter = arc<any, any>()
      .innerRadius(this.innerRadius)
      .outerRadius(this.outerRadius)

    const tRibbon = ribbon().radius(this.innerRadius) // 创建丝带线生成器

    /* 设置圆弧 */
    gOuter.selectAll('.outerPath')
      .data(tChordData.groups)
      .enter()
      .append('path')
      .attr('class', 'outerPath')
      .style('fill', (d: any) => this.color(d.index))
      .attr('d', arcOuter)
    // 设置丝带ribbon
    gInner
      .attr("class", "ribbons")
      .datum(tChordData)
      .selectAll('.innerPath')
      .data((chords: any) => chords)
      .enter()
      .append('path')
      .attr('d', tRibbon)
      .style('fill', (d: any) => {
        return this.color(d.source.index)
      })


    /* 设置节点文字 */
    gOuter.selectAll('.outerText')
      .data(tChordData.groups)
      .enter()
      .append('text')
      .each((d: any, i: number) => { // 为被绑定的数据添加变量
        d.angle = (d.startAngle + d.endAngle) / 2  // 弧形的中心角度
        d.name = this.continent[i]  // 设置节点名称
      })
      .attr('transform', (d: any) => {
        let result = `rotate(${d.angle * 180 / Math.PI})` // 先旋转文字的角度
        result += `translate(0,${-1 * (this.outerRadius + 10)})`  // 平移到半径外
        /* 对位于弦图下方的文字，翻转180°，为了防止其是倒着的 */
        /* 注意：默认圆弧角度是从y轴正半轴开始，顺时针旋转的 */
        if (d.angle > Math.PI * 3 / 4 && d.angle < Math.PI * 5 / 4) {
          result += 'rotate(180)';
        }
        return result
      })
      .text((d: any) => d.name)
  }
  public render() {
    return <svg id="chordSvg" />
  }
}