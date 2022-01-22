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

function App() {
  const update = () => {
    setTimeout(() => {
      forceUpdate()
    }, 500)
  }
  const forceUpdate = React.useReducer(() => ({}))[1]

  return (
    <div className="App">
      {
        isAdmin() ?
          <AdminHeader forceUpdate={forceUpdate} /> :
          <Header forceUpdate={forceUpdate}/>
      }
      <div className="layout">
        <Switch>
          <Route exact path="/" render={() => {
            return isLoggedIn() ?
              (<Redirect to={generateLink(routes.PUBLISHERS)} />) :
              (<Login forceUpdate={update} />)
          }} />
        </Switch>
        <Router />
      </div>
    </div>
  );
}

export default App;
