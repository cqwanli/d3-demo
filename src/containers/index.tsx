import * as React from 'react';
import { Route } from 'react-router-dom'
import routes from '../routes';
class App extends React.Component {
    public render() {
        return (
            <div>
                {
                    routes.map((route, i) => (
                        <Route path={route.path} key={i} component={route.component} />))
                }
            </div>
        );
    }
}
export default App;