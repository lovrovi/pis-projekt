import { Switch, Route, Redirect } from 'react-router';
import './App.css';
import Header from './components/Header/Header';
import Router from './Router/Router'
import { Login } from './components/Login/Login'
import { generateLink, routesConfiguration as routes } from './Router/routes'
import { isLoggedIn } from './customHooks/isLoggedIn'

function App() {
  return (
    <div className="App">
      <Header />
      <div className="layout">
        <Switch>
          <Route exact path="/" render={() => {
            return isLoggedIn() ?
              (<Redirect to={generateLink(routes.PUBLISHERS)} />) :
              (<Login />)
          }} />
        </Switch>
        <Router />
      </div>
    </div>
  );
}

export default App;
