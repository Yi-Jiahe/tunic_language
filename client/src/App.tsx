import React from 'react';
import './App.css';

import TextArea from './TextArea';

const endpoint = "https://tunic-language-zic4jhgpva-as.a.run.app";

function App() {
  // Send request on load to warm endpoint
  fetch(`${endpoint}/to-runes`, {
    method: 'POST',
    body: JSON.stringify({
        'input': ''
    })
  })

  return (
    <div className="App">
      <div className="App-body">
        <div className="width-100 max-width-700px">
          <TextArea endpoint={endpoint} />
        </div>
      </div>
      <footer>
        <span><a href="https://github.com/Yi-Jiahe/tunic_language">Source</a></span>
      </footer>
    </div>
  );
}

export default App;
