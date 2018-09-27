import './assets/root.css'
import * as React from 'react';
import { Route, Link } from 'react-router-dom'
import routes from '../../routes';
class App extends React.Component {
  public render() {
    return (
      <div className="page">
        <div className="menu">
          <ul>
            {
              routes.map((route, i) => <li key={i}><Link to={route.path}>{route.path}</Link></li>)
            }
          </ul>
        </div>
        <div className="content">
          {
            routes.map((route, i) => (
              <Route path={route.path} key={i} component={route.component} />))
          }
        </div>
      </div>
    );
  }
}
export default App;