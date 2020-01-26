import React, { useEffect, useRef } from 'react';
import Heart from './assets/heart.png';

// function draw() {
//   ctx.drawImage(bird, bX, bY);
//   bX += 1;
//   requestAnimationFrame(draw);
// }

// draw();
const bY = 150;

function Game(props) {
  const canvasRef = useRef(null);
  if (canvasRef && canvasRef.current) {
    const ctx = canvasRef.current.getContext('2d');
    ctx.fillStyle = 'black';
  }
  //     function draw(ctx, location) {
  //     ctx.fillStyle = 'deepskyblue'
  //     ctx.shadowColor = 'dodgerblue'
  //     ctx.shadowBlur = 20  ctx.save()
  //     ctx.scale(SCALE, SCALE)  ctx.translate(location.x / SCALE - OFFSET, location.y / SCALE - OFFSET)
  //     ctx.fill(HOOK_PATH)
  //     ctx.restore()
  //   }

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <canvas ref={canvasRef} width="288" height="512" />
    </div>
  );
}

export default Game;
