import React, { useEffect } from 'react';

import './style.scss';

function Gallery({ traces, handleSetActiveTrace }) {

  const decorateTime = timestamp => {
    const [date, timeRaw] = timestamp.split(" ")
    const time = timeRaw.split('.')[0]
    return (
      <div className="Gallery__timestamp">
        <p className="Gallery__timestampDate">{date}</p>
        <p className="Gallery__timestampTime">{time}</p>
      </div>
    )
  }

  const decoratePlate = plate => {
    if(/(^[a-zA-Z]{1})[\d]{3}[a-zA-Z]{2}([\d]{2,3}$)/.test(plate)){
      const symbolGroups = Array.from(plate.matchAll(/[a-zA-Z]{1,2}|[\d]{2,3}/g))
      return (
        <div className="Gallery__plate">
          <div class="Gallery__platePart Gallery__platePart_left">
            <span className="Gallery__plateLetter">{symbolGroups[0]}</span>
            <span className="Gallery__plateNumber">{symbolGroups[1]}</span>
            <span className="Gallery__plateLetter">{symbolGroups[2]}</span>
          </div>
          <div class="Gallery__platePart Gallery__platePart_right">
            <span className="Gallery__plateRegion">{symbolGroups[3]}</span>
          </div>
        </div>
      )

    }
    else return <div className='Gallery__plate'>
      <div class="Gallery__platePart Gallery__platePart_solo">
        {plate}
      </div>
      </div>}

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
              {decorateTime(timestamp)}
              {decoratePlate(history.plate)}
            </div>
        </button>
      ))}
    </div>
  );
}

export default Gallery;
