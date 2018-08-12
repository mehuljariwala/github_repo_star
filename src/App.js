import React, { Component } from 'react';
import GithubResponse from './GitAPI/GithubResponse';

class App extends Component {
  render() {
    return (
      <div>
          <h4 className="text-center">Popular Github Javascript Respositories</h4>
          <GithubResponse />
      </div>
    );
  }
}

export default App;
