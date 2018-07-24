// import { nest } from 'd3-collection'
import { nest } from 'd3-collection'
import { ascending } from 'd3-array'
export default function (): void {
  console.log("***********嵌套结构*************");
  const persons = [
    { id: 100, name: "张某某", year: 1989, hometown: "北京" },
    { id: 101, name: "李某某", year: 1987, hometown: "北京" },
    { id: 102, name: "王某某", year: 1988, hometown: "北京" },
    { id: 103, name: "赵某某", year: 1987, hometown: "北京" },
    { id: 104, name: "孙某某", year: 1989, hometown: "北京" }
  ];
  const newNest = nest()
    .key((d: any) => d.year)
    .sortKeys(ascending)
    .key((d: any) => d.hometown)
    .sortKeys(ascending)
    .entries(persons);
  console.log(newNest);
}