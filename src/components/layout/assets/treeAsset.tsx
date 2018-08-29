export interface ITreeNode {
  name: string,
  children?: Array<ITreeNode>
}
export const treeData: ITreeNode = {
  name: "中国",
  children: [
    {
      name: "浙江",
      children: [
        { name: "杭州" },
        { name: "宁波" },
        { name: "温州" },
        { name: "绍兴" },
      ]
    },
    {
      name: "广西",
      children: [
        {
          name: "桂林", children: [
            { name: "秀峰区" },
            { name: "叠彩区" },
            { name: "象山区" },
            { name: "七星区" }
          ]
        },
        { name: "南宁" },
        { name: "柳州" },
        { name: "防城港" },
      ]
    }
  ]
};