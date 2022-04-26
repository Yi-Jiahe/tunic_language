import React from 'react';
import './App.css';

import TextArea from './TextArea';

function App() {
  return (
    <div className="App">
      <div className="App-body">
        <div className="width-100 max-width-700px">
          <TextArea />
        </div>
      </div>
      <footer>
        <span><a href="https://github.com/Yi-Jiahe/tunic_language">Source</a></span>
      </footer>
    </div>
  );
}

export default App;
