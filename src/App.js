import React from 'react';
import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import SyspreHome from './routes/syspre/Home';
import SysirrHome from './routes/sysirr/Home';
import SysswhHome from './routes/sysswh/Home';
// import Login from './routes/Login';
import NewLogin from './routes/NewLogin';
import DataView from './routes/DataView';

function App() {
  return (
    <Switch>
      <Route path='/' exact component={NewLogin} />
      {/* <Route path='/login' exact component={Login} /> */}
      <Route path='/login' exact component={NewLogin} />
      <Route path='/syspre/home' component={SyspreHome} />
      <Route path='/sysirr/home' component={SysirrHome} />
      <Route path='/sysswh/home' component={SysswhHome} />
      <Route path='/dataview' component={DataView} />
      <Redirect from="/*" to="/login" />
    </Switch>
  );
}

export default App;
