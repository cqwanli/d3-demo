import Hello from './containers/Hello'
import BasePieContainer from './containers/BasePieContainer'
const routes = [
  {
    path: '/hello',
    component: Hello
  },
  {
    path: '/base-pie',
    component: BasePieContainer
  }
];
export default routes;