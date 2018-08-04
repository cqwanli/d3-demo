/**
 * @author wanli
 * @description 动画ease方式有如下几种：线性渐变(liner)、默认逐渐加快(cubic)、弹簧(elastic)、回缩(back)、弹跳(bounce)、正向运动(in)、反向运动(out)、先正后反(in-out)、先反后正(out-in)
 */
import * as React from 'react'
import SimpleAnimation from './modules/SimpleAnimation'
import Transform from './modules/Transform'
import Clock from './modules/Clock'
export default class Animations extends React.Component {
  public render() {
    return <div>
      <Clock />
      <Transform />
      <SimpleAnimation />
    </div>
  }
}