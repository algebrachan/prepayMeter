import React, { Component } from 'react'
import { Switch } from 'react-router-dom'

import preRoutes from '../../../components/Route/preRoutes.js';
import PrivateRoute from '../../../components/PrivateRoute';
class HomeContent extends Component {
  render() {
    return (
      // HomeContent的路由
      <div style={{ position: 'relative' }}>
        <Switch>
          {preRoutes.map((route) =>
            (<PrivateRoute exact key={route.path} path={route.path} component={route.component} />)
          )}
        </Switch>
      </div>
    )
  }
}

export default HomeContent;