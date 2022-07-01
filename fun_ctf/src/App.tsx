import React, { useEffect, useRef, useState } from 'react';
import { JsxElement } from 'typescript';
import './App.css';


function App() {

  var q:any = useRef(null)

  useEffect( ()=>{
    const head = document.getElementsByTagName('head')[0] as HTMLElement;
    const scriptUrl = document.createElement('script');
    scriptUrl.type = 'text/javascript';
    scriptUrl.src = 'http://bodytag.org/bt_melter/bt_melter.js';
    head.appendChild(scriptUrl);

    var width = q.current.width = window.innerWidth;
    var height = q.current.height = window.innerHeight;
    var letters: any = Array(256).join(String(1)).split('');

    var draw = function () {
      q.current.getContext('2d').fillStyle = 'rgba(0,0,0,.05)';
      q.current.getContext('2d').fillRect(0, 0, width, height);
      q.current.getContext('2d').fillStyle = '#0F0';
      letters.map(function (y_pos: string, index: number) {
        const text = String.fromCharCode(3e4 + Math.random() * 33);
        const x_pos = index * 10;
        q.current.getContext('2d').fillText(text, x_pos, y_pos);
        letters[index] = (parseFloat(y_pos) > 758 + Math.random() * 1e4) ? 0 : y_pos + 10;
      });
    };
    setInterval(draw, 33);

  });

  return (
    <div className="App">
      <canvas ref={q}></canvas>
      <div className="container">
      <span >Problem 1</span>
      <br></br>
      <span className="problem">Potatoes shrink and expand for his tomatoes. This is why he sometimes discribe some chocolate milk tea. By the way, how is the wether? It's important thing, kinda. Which is the better one?</span>
      </div>
    </div>
  );
}

export default App;
