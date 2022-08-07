import React, { useReducer, useEffect } from 'react';

import { getTraces } from '../api/index.js'
import './App.css';

function reducer(state, action) {
  switch (action.type) {
    case "SET_TRACES": {
      const traces = action.payload.map(key => ({ key }))
      return {
        ...state,
        traces
      }
    }
  
    default:
      return state;
  }
}

function App() {
  const [store, dispatch] = useReducer(reducer, {traces: []});

  useEffect(() => {
    getTraces().then(traces => dispatch({ type: "SET_TRACES", payload: traces }));
  }, []);

  const getKeys = () => store.traces.length > 0 && store.traces.map(trace => (
    <p className='link' key={trace.key}>
      {trace.key}&nbsp;
      (<a href={`http://localhost:3001/traces/${trace.key}/json`} target="_blank">json</a>
      &nbsp;|&nbsp;
      <a href={`http://localhost:3001/traces/${trace.key}/image`} target="_blank">jpg</a>)
    </p>
  ))

  return (
    <div className="App">
      {getKeys()}
    </div>
  );
}

export default App;
