import React from 'react';
import './App.css';

import { TextEditor, Clear } from './components'


function App() {
  return (
    <div className="App">
      <Clear />
      <TextEditor />
    </div>
  );
}

export default App;
