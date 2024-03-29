import React, { useEffect, useRef, useState } from 'react';
import { JsxElement } from 'typescript';
import './App.css';

function Problem(props:{title:string, problemSentences:any, ans:string}){
  const [clicked,setClicked] = useState<number>(0);
  const [flag, setFlag] = useState<string>("")
  return (
      <div className='list-element' onClick={()=>setClicked(clicked===0?1:-clicked)}>
        {props.title}
        {
          clicked === 1 ?
            <div className='problem-sentences-inflate'>
              <br></br>{props.problemSentences}
              <input type="text" value={flag} onClick={(e)=>{e.stopPropagation();}} onChange= {e => setFlag(e.target.value)} placeholder="flag"></input>
              <br></br>
              <button onClick={(e)=>{e.preventDefault();e.stopPropagation();if(flag===props.ans)alert("Correct!!");else alert("flase");}}>submit</button>
            </div>
          :clicked===-1?
            <div className='problem-sentences-deflate'>
              <br></br>{props.problemSentences}
              <input type="text" value={flag} onClick={(e)=>{e.stopPropagation();}} onChange= {e => setFlag(e.target.value)}></input>
              <br></br>
              <button onClick={(e)=>{e.preventDefault();e.stopPropagation();if(flag===props.ans)alert("Correct!!");else alert("flase");}}>submit</button>
            </div>
          :undefined
          }
{/*        <hr></hr>
*/}
      </div>
  )
}

function App() {

  var q:any = useRef(null)

  useEffect( ()=>{
//    const head = document.getElementsByTagName('head')[0] as HTMLElement;
//    const scriptUrl = document.createElement('script');
//    scriptUrl.type = 'text/javascript';
//    scriptUrl.src = 'http://bodytag.org/bt_melter/bt_melter.js';
//    head.appendChild(scriptUrl);

    var width = q.current.width = window.innerWidth;
    var height = q.current.height = window.innerHeight*3;
    var letters: any = Array(256).join(String(1)).split('');
    //['1',,,,'1']

    var draw = function () {
      q.current.getContext('2d').fillStyle = 'rgba(0,0,0,.05)';
      q.current.getContext('2d').fillRect(0, 0, width, height);//overlay
      q.current.getContext('2d').fillStyle = '#0F0';
      letters.map(function (y_pos: string, index: number) {
        const text = String.fromCharCode(3e4 + Math.random() * 33);
        const x_pos = index * 10;
        q.current.getContext('2d').fillText(text, x_pos, y_pos);
        letters[index] = (parseFloat(y_pos) > 758 + Math.random() * 1e4) ? 0 : y_pos + 40;
      });
    };
    setInterval(draw, 33);
  });

  const problemList=[
    {title:"増殖するトマト",problemSentences:<p>トマトはおいしい、されど空はどこまでも高く広がるようだ。まるで、でかいクッキーを取り残していくように。</p>,ans:"0023"},
    {title:"美しい空",problemSentences:<p>トマトはおいしい、されど空はどこまでも高く広がるようだ。まるで、でかいクッキーを取り残していくように。</p>,ans:"0023"},
    {title:"でかいクッキー",problemSentences:<p>トマトはおいしい、されど空はどこまでも高く広がるようだ。まるで、でかいクッキーを取り残していくように。</p>,ans:"0023"},
    {title:"扇風機",problemSentences:<p>トマトはおいしい、<br></br>されど空はどこまでも高く広がるようだ。<br></br>まるで、でかいクッキーを取り残していくように。</p>,ans:"0023"}
  ]

  return (
    <div className="App">
      <canvas ref={q}></canvas>
      <div className='Head'>fun_ctf</div>
      {
      problemList.map( (li) =>
        <Problem title= {li.title} problemSentences={li.problemSentences} ans={li.ans}></Problem>)
      }
    </div>
  );
}

export default App;
