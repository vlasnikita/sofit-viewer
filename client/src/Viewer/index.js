import React, { useState, useEffect, useRef } from 'react';

import './style.scss';

function Viewer({ trace, handleResetActiveTrace }) {

  const [plateCenterVisible, setPlateCenterVisible] = useState(true)
  const [plateRegionVisible, setPlateRegionVisible] = useState(true)
  const [vehicleVisible, setVehicleVisible] = useState(true)

  const [coordinates, setCoordinates] = useState(0)
  const refCanvas = useRef(null);

  useEffect(() => {                             
    const context = refCanvas.current.getContext('2d'); 
    if(trace) drawCanvas(context)
  });

  // useEffect(() => {
  //   imageRendered && drawTraces()
  // }, [imageRendered])

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
      
      setImageRendered(true)
      drawTraces()
    }
    traceImage.src = `http://localhost:3001/traces/${trace.history.plate}_${trace.uuid}/image`;
  }

  const getBody = () => {
    console.log(trace?.history?.tracks[0]?.points.map(el => el.plate))

    return (
      <>
      <div className="Viewer__photoContainer">
        {/* <img 
          className="Viewer__photo" src={`http://localhost:3001/traces/${trace.history.plate}_${trace.uuid}/image`} 
          onClick={event => {
            var x = event.pageX - event.target.offsetLeft;
            var y = event.pageY - event.target.offsetTop;
            setCoordinates("X Coordinate: " + x + " Y Coordinate: " + y);
          }}
        /> */}
        {/* <canvas 
          className="Viewer__photo"
          ref={refCanvas}
        ></canvas> */}
      </div>
      <div className="Viewer__settings">
          {coordinates}
      </div>
      </>
    )
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
        {coordinates}
      </div>
    </div>
  );
}

export default Viewer;
