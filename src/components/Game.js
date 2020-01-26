// import React, { useEffect } from 'react';

// function draw() {
//   ctx.drawImage(bird, bX, bY);
//   bX += 1;
//   requestAnimationFrame(draw);
// }

// draw();

// function Game(props) {
//   const cvs = document.getElementById('canvas');
//   const ctx = cvs.getContext('2d');

//   let bX = 10;
//   const bY = 150;

//   const heart = new Image();
//   heart.src = './heart.png';

//   useEffect(() => {
//     const id = setInterval(() => {}, 17);

//     return () => {
//       clearInterval(id);
//     };
//   }, []);

//   return (
//     <div>
//       <canvas id="canvas" width="288" height="512" />
//     </div>
//   );
// }

// export default Game;
