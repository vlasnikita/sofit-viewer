import React, { useEffect } from 'react';

import './style.scss';

function Gallery({ traces, handleSetActiveTrace }) {

  const decoratePlate = plate => {
    if(/(^[a-zA-Z]{1})[\d]{3}[a-zA-Z]{2}([\d]{2,3}$)/.test(plate)){
      const symbolGroups = Array.from(plate.matchAll(/[a-zA-Z]{1,2}|[\d]{2,3}/g))
      return (
        <p className="Gallery__plate Gallery__plate_ru">
          <span className="Gallery__plateLetter">{symbolGroups[0]}</span>
          <span className="Gallery__plateNumber">{symbolGroups[1]}</span>
          <span className="Gallery__plateLetter">{symbolGroups[2]}</span>
          <span className="Gallery__plateRegion">{symbolGroups[3]}</span>
        </p>
      )

    }
    else return <p className='Gallery__plate'>{plate}</p>}

  return (
    <div className="Gallery">
      {traces.map(({uuid, timestamp, history}) => (
        <button 
          className='Gallery__item' 
          key={`${history.plate}_${uuid}`}
          onClick={() => handleSetActiveTrace(`${history.plate}_${uuid}`)}  
        >
            <img className="Gallery__itemThumbnail" src={`http://localhost:3001/traces/${history.plate}_${uuid}/image`} />
            <div className="Gallery__itemInfo">
              <p className="Gallery__timestamp">{timestamp}</p>
              {decoratePlate(history.plate)}
            </div>
        </button>
      ))}
    </div>
  );
}

export default Gallery;
