import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.scss';

import { Editor } from './components'


class App extends Component {
  render() {
    
    return (
        <div className="App">
             <Editor />
        </div>


    )
  }
}
export default App;
