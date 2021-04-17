import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import {store} from './Redux/Store/store';
import MainContent from './Components/MainContent/mainContent';
import Header from './Components/header';
import SearchContent from './Components/SearchContent/searchContent';
import ErrorPage from './Components/ErrorComponent/errorPage';
const routing = (
  <Router>
      <div>
          <Header />
          <Switch>
              <Route path="/" component={MainContent} exact/>
              <Route path="/search" component={SearchContent}/>
              <Route path="/details" render={() => {window.location.href="details.html"}}  />
              <Route path="*" component={ErrorPage}/>
          </Switch>
      </div>
  </Router>
);

ReactDOM.render(
  <Provider store={store}>
      {routing}
  </Provider>,
  document.getElementById('root')
);