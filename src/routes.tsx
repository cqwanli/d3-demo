import Hello from './containers/Hello'
import BasePieContainer from './containers/BasePieContainer'
import SelectContainer from './containers/SelectContainer'
const routes = [
  {
    path: '/hello',
    component: Hello
  },
  {
    path: '/base-pie',
    component: BasePieContainer
  },
  {
    path: '/select',
    component: SelectContainer
  }
];
export default routes;