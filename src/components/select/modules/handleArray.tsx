
/**
 * @param shuffle 随机排列数组
 * @param merge 把多个数组合并为一个数组
 * @param pairs 会返回两两相邻的数组元素
 * @param range 返回等差数列返数组
 * @param permute 根据索引号返回排序号的数组
 * @param zip 把多个数组压缩成一个数组
 * @param transpose 转置矩阵
 */
import { shuffle, merge, pairs, range, permute, zip, transpose } from 'd3-array'
/**
 * @description pairs 会返回两两相邻的数组元素
 */
export default function (): void {
  const num: number[] = [10, 13, 16, 19, 22, 25, 28];
  console.log(`***********数组操作*************`)
  console.log(`随机排列后的数组：${shuffle(num)}`)
  console.log(`合并两个数组:${merge([[1], [2, 3]])}`)
  console.log(`返回相邻的数组对:${JSON.stringify(pairs(num))}`)
  console.log(`返回等差数列返数组:${JSON.stringify(range(10))}`)
  console.log(`返回从2开始的等差数列返数组:${JSON.stringify(range(2, 10))}`)
  console.log(`返回从2开始,间隔为2的等差数列返数组:${JSON.stringify(range(2, 10, 2))}`)
  console.log(`返回按索引号排序后的数组：${permute(['cat', 'dog', 'bird'], [2, 1, 0])}`)
  console.log(`压缩后的数组：${JSON.stringify(zip(['2', 1, 0], ['cat', 'dog', 'bird'], ['true', 'false', 'true']))}`)
  console.log(`专置矩阵：${JSON.stringify(transpose([[1, 2, 3], [4, 5, 6]]))}`)
}