import React from 'react';
import './App.css';

import Rune from './Rune';

function App() {
  return (
    <div className="App">
      <Rune segments={new Set([1, 2, 3, 4])}/>
      <Rune segments={new Set([3, 8, 11])}/>
      <Rune segments={new Set([1, 3, 5, 7, 9, 11])}/>
      <Rune segments={new Set([2, 4, 6, 8, 10, 12])}/>
    </div>
  );
}

export default App;
