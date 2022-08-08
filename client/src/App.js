import React, { useReducer, useEffect, useLayoutEffect } from 'react';

import { fetchKeys, fetchTraces } from '../api/index.js'
import './App.scss';
import Gallery from './Gallery'
import Viewer from './Viewer'

const OFFSET_STEP = 20 // chunk size loaded on scroll

const initialState = {
  keys: [], 
  traces: [], 
  offset: 0, 
  isOffsetting: false, 
  isDataCompletelyLoaded: false,
  activeTrace: null
}

function reducer(state, action) {
  switch (action.type) {
    case "SET_KEYS": return { ...state, keys: action.payload }
    case "PAGINATE_OFFSET": {
      if(state.isDataCompletelyLoaded || state.isOffsetting) return state
      else return {
        ...state,
        offset: state.offset + OFFSET_STEP,
        isOffsetting: true,
        isDataCompletelyLoaded: state.offset > state.keys.length
      }
    }
    case "UPDATE_TRACES": {
      return {
        ...state,
        traces: [
          ...state.traces,
          ...action.payload
        ],
        isOffsetting: false
      }
    }
    case "SET_ACTIVE_TRACE": return {
      ...state,
      activeTrace: action.payload
    }

    default: return state;
  }
}

function App() {

  const [store, dispatch] = useReducer(reducer, initialState);

  // Fetching keys (UUIDs) full array 
  useEffect(() => {
    fetchKeys().then(keys => dispatch({ type: "SET_KEYS", payload: keys }));
  }, []);

  // Fetching fixed chunk of JSONs with traces data
  useEffect(() => {
    const { keys, offset } = store
    const keysRange = keys.slice(offset, offset + OFFSET_STEP)
    fetchTraces(keysRange).then(traces => {
      dispatch({ type: "UPDATE_TRACES", payload: traces })
    });
  }, [store.keys, store.offset]);

  // Onscroll pagination effect handler
  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  },[]);

  const onScroll = () => {
    if(window.innerHeight + window.scrollY > document.body.offsetHeight - 250 
      && !store.isDataCompletelyLoaded && !store.isOffsetting){
        dispatch({ type: "PAGINATE_OFFSET" })
    }
  }

  const traceByKeySelector = () => store.traces.filter(el => `${el.history.plate}_${el.uuid}` === store.activeTrace)[0]

  const handleSetActiveTrace = key => dispatch({ type: "SET_ACTIVE_TRACE", payload: key })

  return (
    <div className="App">
      <Gallery traces={store.traces} handleSetActiveTrace={handleSetActiveTrace} />
      <Viewer trace={traceByKeySelector(store.activeTrace)} handleResetActiveTrace={() => dispatch({ type: "RESET_ACTIVE_TRACE"})} />
    </div>
  );
}

export default App;
