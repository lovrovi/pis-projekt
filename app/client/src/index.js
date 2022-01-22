import React from 'react'
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router} from 'react-router-dom'
import { createStore, compose, combineReducers, applyMiddleware } from "redux";
import booksReducer from './redux/reducers/books/books'
import publishersReducer from './redux/reducers/publishers/publishers'
import authorsReducer from './redux/reducers/authors/authors'
import authReducer from './redux/reducers/auth/auth'
import userReducer from './redux/reducers/users/users'
import loanReducer from './redux/reducers/loans/loans'

import {Provider} from 'react-redux'  
import thunk from "redux-thunk";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    books: booksReducer,
    publishers: publishersReducer,
    authors: authorsReducer,
    auth: authReducer,
    users: userReducer,
    loans: loanReducer
});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

ReactDOM.render(
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
