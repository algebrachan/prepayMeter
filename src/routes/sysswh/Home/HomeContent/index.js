import React from 'react'
import { Switch } from 'react-router-dom'
import swhRoutes from '../../../components/Route/swhRoutes.js';
import PrivateRoute from '../../../components/PrivateRoute';

class HomeContent extends React.Component {
  render() {
    return (
      // HomeContent的路由
      <div style={{ position: 'relative' }}>
        <Switch>
          {swhRoutes.map((route) =>
            (<PrivateRoute exact key={route.path} path={route.path} component={route.component} />)
          )}
        </Switch>
      </div>
    )
  }
}

export default HomeContent;