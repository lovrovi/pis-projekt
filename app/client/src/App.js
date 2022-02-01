import React from 'react';
import { Switch, Route, Redirect } from 'react-router';
import './App.css';
import Header from './components/Header/Header';
import AdminHeader from './components/Header/AdminHeader'
import Router from './Router/Router'
import { Login } from './components/Login/Login'
import { generateLink, routesConfiguration as routes } from './Router/routes'
import { isLoggedIn } from './customHooks/isLoggedIn'
import { isAdmin } from './customHooks/isAdmin'
import { Register } from './components/Register/Register';

function App() {
  const update = () => {
    setTimeout(() => {
      forceUpdate()
    }, 1000)
  }
  const forceUpdate = React.useReducer(() => ({}))[1]

  return (
    <div className="App">
      {
        isAdmin() ?
          <AdminHeader forceUpdate={forceUpdate} /> :
          <Header forceUpdate={forceUpdate}/>
      }
      <div className="layout" onClick={update}>
        <Switch>
          <Route exact path="/" render={() => {
            return isLoggedIn() ?
              (<Redirect to={generateLink(routes.BOOKS)} />) :
              (<Login forceUpdate={update} />)
          }} />
          <Route exact path="/register" render={() => {
            return isLoggedIn() ?
              (<Redirect to={generateLink(routes.BOOKS)} />) :
              (<Register />)
          }} />
        </Switch>
        <Router />
      </div>
    </div>
  );
}

export default App;
