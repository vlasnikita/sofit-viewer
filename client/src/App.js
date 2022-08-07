import React, { useState, useEffect } from 'react';

import { getTraces } from '../api/index.js'
import './App.css';

function App() {
  const [data, setData] = useState({ hits: [] });

  useEffect(() => {
    const result = getTraces()

    console.log(result.data);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>Edit <code>src/App.js</code> and save to reload.</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
