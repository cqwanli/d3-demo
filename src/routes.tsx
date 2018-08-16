import Hello from './containers/Hello'
import BasePieContainer from './containers/BasePieContainer'
import SelectContainer from './containers/SelectContainer'
import CoordinateAxisContainer from './containers/CoordinateAxisContainer'
import DrawContainer from './containers/DrawContainer'
import AnimationsContainer from './containers/AnimationsContainer'
import InteractionContainer from './containers/InteractionContainer'
import LayoutContainer from './containers/LayoutContainer'
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
  },
  {
    path: '/axis',
    component: CoordinateAxisContainer
  },
  {
    path: '/draw',
    component: DrawContainer
  },
  {
    path: '/animations',
    component: AnimationsContainer
  },
  {
    path: '/interaction',
    component: InteractionContainer
  },
  {
    path: '/layout',
    component: LayoutContainer
  },
];
export default routes;