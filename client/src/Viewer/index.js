import React, { useState, useEffect, useRef } from 'react';

import './style.scss';

function Viewer({ trace, handleResetActiveTrace }) {

  const [plateCenterVisible, setPlateCenterVisible] = useState(false)
  const [plateRegionVisible, setPlateRegionVisible] = useState(false)
  const [vehicleVisible, setVehicleVisible] = useState(false)

  const refCanvas = useRef(null);

  useEffect(() => {                             
    const context = refCanvas.current.getContext('2d'); 
    if(trace) drawCanvas(context)
  });

  const drawTraces = () => {
    const ctx = refCanvas.current.getContext('2d');
    const cW = refCanvas.current.width, cH = refCanvas.current.width
    
    if(plateCenterVisible){
      const platePointsCenter = trace?.history?.tracks[0]?.points.map(el => ({...el.plate.center}))
      ctx.fillStyle = 'red';
      platePointsCenter.forEach(point => {
        ctx.fillRect(cW * (point.x * 0.997), cH * (point.y * 0.834), 4, 4);
      });
    }

    if(plateRegionVisible){
      const platePointsRegion = trace?.history?.tracks[0]?.points.map(el => el.plate.region)
      platePointsRegion.forEach(point => {
        const { lt, rt, rb, lb } = point
        ctx.beginPath(); 
        ctx.strokeStyle = 'green';
        ctx.lineWidth = 2;
        ctx.moveTo(cW * (lt.x * 0.997), cH * (lt.y * 0.834));
        ctx.lineTo(cW * (rt.x * 0.997), cH * (rt.y * 0.834));
        ctx.lineTo(cW * (rb.x * 0.997), cH * (rb.y * 0.834));
        ctx.lineTo(cW * (lb.x * 0.997), cH * (lb.y * 0.834));
        ctx.lineTo(cW * (lt.x * 0.997), cH * (lt.y * 0.834));
        ctx.stroke();
      })
    }

    if(vehicleVisible){
      const vehiclePoints = trace?.history?.tracks[0]?.points.map(el => el.vehicle_region)
      vehiclePoints.forEach(point => {
        const { lt, rt, rb, lb } = point
        ctx.beginPath(); 
        ctx.strokeStyle = 'blue';
        ctx.lineWidth = 2;
        ctx.moveTo(cW * (lt.x * 0.997), cH * (lt.y * 0.834));
        ctx.lineTo(cW * (rt.x * 0.997), cH * (rt.y * 0.834));
        ctx.lineTo(cW * (rb.x * 0.997), cH * (rb.y * 0.834));
        ctx.lineTo(cW * (lb.x * 0.997), cH * (lb.y * 0.834));
        ctx.lineTo(cW * (lt.x * 0.997), cH * (lt.y * 0.834));
        ctx.stroke();
      })
    }
  }

  const drawCanvas = ctx => {
    const traceImage = new Image();
    
    traceImage.onload = function(){
      refCanvas.current.width = traceImage.naturalWidth
      refCanvas.current.height = traceImage.naturalHeight
      ctx.drawImage(traceImage, 0, 0);
      
      drawTraces()
    }
    traceImage.src = `http://localhost:3001/traces/${trace.history.plate}_${trace.uuid}/image`;
  }

  return (
    <div className="Viewer">
      <div className="Viewer__photoContainer">
        <canvas 
          className="Viewer__photo"
          ref={refCanvas}
        ></canvas>
      </div>

      <div className="Viewer__settings">
        <div className="Viewer__checkboxContainer">
          <input className="Viewer__checkbox Viewer__checkbox_red" checked={plateCenterVisible} onChange={() => setPlateCenterVisible(!plateCenterVisible)} type="checkbox" id="plateCenter" />
          <label htmlFor="plateCenter">ГРЗ — центр</label>
        </div>

        <div className="Viewer__checkboxContainer">
          <input className="Viewer__checkbox Viewer__checkbox_green" checked={plateRegionVisible} onChange={() => setPlateRegionVisible(!plateRegionVisible)} type="checkbox" id="plateRegion" />
          <label htmlFor="plateRegion">ГРЗ — рамка</label>
        </div>

        <div className="Viewer__checkboxContainer">
          <input className="Viewer__checkbox Viewer__checkbox_blue" checked={vehicleVisible} onChange={() => setVehicleVisible(!vehicleVisible)} type="checkbox" id="vehicle" />
          <label htmlFor="vehicle">Границы ТС</label>
        </div>

        <button className="Viewer__reset" onClick={handleResetActiveTrace}>Закрыть 🞪</button>
      </div>
    </div>
  );
}

export default Viewer;
