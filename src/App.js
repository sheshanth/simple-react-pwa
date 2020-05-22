import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import './App.scss';
import GithubHandlerSearch from './components/github/user-search/GithubHandlerSearch';
import Navbar from './components/navbar/Navbar';
import Posts from './components/bg-sync/Posts';

window.addEventListener('online', () => {
  window.location.reload()
})

function App() {
  return (
    <div className="App">
      <div className="main">
        <Router>
          <Navbar />
          <div className="routes container">
            <Route path="/github" component={GithubHandlerSearch} />
            <Route path="/sync" component={Posts} />
            <Route exact path="/" render={() => <Redirect to='/github' />} />
          </div>
        </Router>
      </div>
    </div>
  );
}

export default App;
