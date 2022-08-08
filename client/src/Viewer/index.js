import React, { useEffect } from 'react';

import './style.scss';

function Viewer({ trace, handleResetActiveTrace }) {

  const getBody = () => (
    <>
    <div class="Viewer__photoContainer">
      <img className="Viewer__photo" src={`http://localhost:3001/traces/${trace.history.plate}_${trace.uuid}/image`} />
    </div>
    <div class="Viewer__settings">

    </div>
    </>
  )

  return (
    <div className="Viewer">
      {trace ? getBody() : "Pick a trace"}
    </div>
  );
}

export default Viewer;
