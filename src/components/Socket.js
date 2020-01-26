import React, { useState, useEffect } from 'react';
const io = require('socket.io-client');
const ioClient = io.connect('http://localhost:8000');

export function Socket() {
  const [distance, setDistance] = useState();

  useEffect(() => {
    ioClient.on('pressDistance', pressDistance => {
      console.info('pressDistance', pressDistance);
      setDistance(pressDistance);
    });
  }, []);

  return <div>{`${distance ? distance / 10 : '?'} mm`}</div>;
}
