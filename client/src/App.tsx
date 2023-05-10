import React from 'react';
import './App.css';
import Translate from './Translate';

const endpoint = "https://tunic-language-zic4jhgpva-as.a.run.app";

function App() {
  // Send request on load to warm endpoint
  fetch(`${endpoint}/ping`, {
    method: 'POST',
    body: JSON.stringify({
        'input': ''
    })
  })

  return (
    <div className="App">
      <div className="App-body">
        <div className="width-100 max-width-700px">
          <Translate endpoint={endpoint} />
        </div>
      </div>
      <footer>
        <span><a href="https://github.com/Yi-Jiahe/tunic_language">Source</a></span>
      </footer>
    </div>
  );
}

export default App;
