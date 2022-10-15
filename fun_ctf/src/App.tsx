import React, { useEffect, useRef, useState } from 'react';
import { JsxElement } from 'typescript';
import './App.css';

function Problem(props:{title:string, problemSentences:any, ans:string, editorial:any}){
    const [clicked,setClicked] = useState<number>(0);
    const [checkEditorial,setCheckEditorial] = useState<number>(0);
    const [flag, setFlag] = useState<string>("")
    return (
        <div className='list-element' onClick={()=>setClicked(clicked===0?1:-clicked)}>
        {props.title}
        {
            clicked === 1 ?
                checkEditorial===1?
                <div className='problem-sentences-inflate'>
                {props.editorial}
                <button style={{textAlign:"right"}} onClick={(e)=>{e.stopPropagation(); setCheckEditorial(-1)}}>
                <br></br>
                問題に戻る
                </button>
                </div>
                :
                <div className='problem-sentences-inflate'>
                <br></br>{props.problemSentences}
                <input className="deny" type="text" value={flag} onClick={(e)=>{e.stopPropagation();}} onChange= {e => setFlag(e.target.value)} placeholder="flag"></input>
                <br></br>
                <button onClick={(e)=>{
                    e.preventDefault();
                    e.stopPropagation();
                    if(flag===props.ans){
                        const input = document.querySelector("input") as HTMLElement | null;
                        if(input!=null){
                            input.classList.toggle("correct");
                            setTimeout(() => {input.classList.toggle("correct");setCheckEditorial(1);}, 3000);
                        }
                    }else{
                        const input = document.querySelector("input") as HTMLElement | null;
                        if(input!=null){
                            input.classList.toggle("deny");
                            setTimeout(() => input.classList.toggle("deny"), 30);
                        }
                    }
                }}>submit</button>
                <br></br>
                <button style={{textAlign:"right"}} onClick={(e)=>{e.stopPropagation(); setCheckEditorial(1)}}>
                <br></br>
                解説をみる
                </button>
                </div>
                :clicked===-1?
                checkEditorial===1?
                <div className='problem-sentences-deflate'>
                {props.editorial}
                <button style={{textAlign:"right"}} onClick={(e)=>{e.stopPropagation(); setCheckEditorial(-1)}}>
                問題に戻る
                </button>
                </div>
                :
                <div className='problem-sentences-deflate'>
                <br></br>{props.problemSentences}
                <input type="text" value={flag} onClick={(e)=>{e.stopPropagation();}} onChange= {e => setFlag(e.target.value)} placeholder="flag"></input>
                <br></br>
                <button onClick={(e)=>{
                    e.preventDefault();
                    e.stopPropagation();
                    if(flag===props.ans){
                        setCheckEditorial(1);
                    }else{
                        const input = document.querySelector("input")
                        if(input!=null){
                            input.style.animationDuration="0.7";
                            input.style.animationName="";
                            input.style.animationName="Shiver";
                        }
                    }
                }}>submit</button>
                <br></br>
                <button style={{textAlign:"right"}} onClick={(e)=>{e.stopPropagation(); setCheckEditorial(1)}}>
                解説をみる
                </button>
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
        //    const scriptUrl = document.createElement('script');
        //    scriptUrl.innerHTML =
        //    `
        //    var bt_root = document.getElementsByTagName('body').item(0);
        //    bt_root.style.visibility = 'hidden';
        //    var bt_nodes = new Array();
        //    var bt_text = new Array();
        //    var bt_tumble = new Array();
        //    var bt_maxsize = 0;
        //    var bt_count = 0;
        //    
        //    function Is(){ 
        //      this.ver=navigator.appVersion;
        //      this.agent=navigator.userAgent;
        //      this.dom=document.getElementById?1:0;
        //      this.opera5=this.agent.indexOf("Opera 5")>-1;
        //      this.ie5=(this.ver.indexOf("MSIE 5")>-1 && this.dom && !this.opera5)?1:0; 
        //      this.ie6=(this.ver.indexOf("MSIE 6")>-1 && this.dom && !this.opera5)?1:0;
        //      this.ie4=(document.all && !this.dom && !this.opera5)?1:0;
        //      this.ie=this.ie4||this.ie5||this.ie6;
        //      this.mac=this.agent.indexOf("Mac")>-1;
        //      this.ns6=(this.dom && parseInt(this.ver) >= 5) ?1:0; 
        //      this.ns4=(document.layers && !this.dom)?1:0;
        //      this.bw=(this.ie6||this.ie5||this.ie4||this.ns4||this.ns6||this.opera5);
        //      return this;
        //      }
        //    
        //    var is = new Is();
        //    
        //    function bt_spin() {
        //      if(is.dom && !(is.mac && is.ie)) bt_godeep(bt_root);
        //      bt_root.style.visibility = 'visible';
        //      if(is.dom && !(is.mac && is.ie)) bt_sponge();
        //      }
        //    
        //    function bt_finished() {
        //      bt_nodes = null;
        //      bt_text = null;
        //      bt_tumble = null;
        //      }
        //    
        //    var bt_chartype = Math.floor(Math.random()*2);
        //    
        //    function digit() {
        //      if(bt_chartype == 0)
        //        return Math.floor(Math.random()*2);
        //      else if(bt_chartype == 1)
        //        return '_';
        //      else
        //        return '_';
        //      }
        //    
        //    var reg = new RegExp ("\\r|\\n", "g");
        //    function bt_haschars(s) {
        //      s = s.replace(reg,'');
        //      return s.length;
        //      }
        //      
        //    function bt_godeep(o) {
        //      for (var i = 0; i < o.childNodes.length; i++) {
        //        if(o.childNodes[i].childNodes) {
        //          bt_godeep(o.childNodes[i]);
        //          }
        //        if(o.childNodes[i].nodeName == '#text' && bt_haschars(o.childNodes[i].nodeValue)) {
        //          var p = bt_nodes.length;
        //          bt_nodes[p] = o.childNodes[i];
        //          bt_text[p] = o.childNodes[i].nodeValue;
        //          bt_tumble[p] = new Array();
        //          for(var u = 0; u < o.childNodes[i].nodeValue.length; u++) {
        //            bt_tumble[p][u] = u;
        //            }
        //          if(o.childNodes[i].nodeValue.length > bt_maxsize) {
        //            bt_maxsize = o.childNodes[i].nodeValue.length;
        //            }
        //          bt_tumble[p].sort(randomSort);
        //          o.childNodes[i].nodeValue = '';
        //          }
        //        }
        //      }
        //    
        //    function randomSort(w1,w2) {
        //      return Math.floor(Math.random()*3)-1;
        //      }
        //    
        //    function bt_sponge() {
        //      for (var i = 0; i < bt_nodes.length; i++) {
        //        if(bt_count < bt_tumble[i].length) {
        //          bt_nodes[i].nodeValue += (bt_text[i].charAt(bt_count) == ' ') ? ' ':digit(1);
        //          }
        //        }
        //       bt_count++;
        //       if(bt_count < bt_maxsize) {
        //        setTimeout('bt_sponge()',20);
        //        }
        //       else {
        //         bt_count = 0;
        //        setTimeout('bt_unsponge()',350);
        //        }
        //      }
        //    
        //    function bt_repchar(str, ch, pos) {
        //      var out = '';
        //      for(var i = 0; i < str.length; i++) {
        //        if(i == pos) out += ch;
        //        else out += str.charAt(i);
        //        }
        //      return out;
        //      }
        //    
        //    function bt_unsponge() {
        //      for (var i = 0; i < bt_nodes.length; i++) {
        //        if(bt_count <= bt_tumble[i].length) {
        //          bt_nodes[i].nodeValue = bt_repchar(bt_nodes[i].nodeValue, bt_text[i].charAt(bt_tumble[i][bt_count]), bt_tumble[i][bt_count]);
        //          }
        //        }
        //      bt_count++;
        //      if(bt_count < 10) setTimeout('bt_unsponge()',30);
        //      else if(bt_count < bt_maxsize) setTimeout('bt_unsponge()',5);
        //      else bt_finished();
        //      }
        //      
        //    window.onload = bt_spin;
        //    `;
        //
        //    document.head.appendChild(scriptUrl);

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

            q.current.getContext('2d').strokeStyle = 'rgb(00,00,255)';
            q.current.getContext('2d').fillStyle = 'rgba(0,00,00,0.6)';
            q.current.getContext('2d').fillRect(width/2-430,0,860,4000);

            //色を指定する
        };
        setInterval(draw, 33);
    });

    const problemList=[
        {title:"裸のネットワーク",problemSentences:
            <p onClick = {(e) => e.stopPropagation()}>
            あなたの大学の講義では、先生の個人的に作成したサイトが使われます。
            <br></br>
            どうやら、そのサイトを利用している生徒の個人情報が漏洩しているようです。
            <br></br>
            しかし、先生はそれを認めません。そこであなたは先生に漏洩を証明するため、パケットをキャプチャしました。
            <br></br>
            ユーザー名がTeacherのパスワードを取得し、hacking&#123;パスワード&#125;の形式で提出してください。
            <br></br>
            <br></br>
            あなたの大学のwifiの情報
            <br></br>
            ssid: free-wifi-desu
            <br></br>
            pass: free-wifi-desu
            <br></br>
            <br></br>
            <a onClick = {(e) => e.stopPropagation()} href="https://gist.github.com/takehr/532a652a685342c0216791467eb17a71/raw/cf81c773d159fc2efa6f26565a2f59667f4343c2/capture.cap" download>
            capture&#46;cap
            </a>
            </p>,
            ans:"hacking{sensei}",
            editorial:
            <div>
            <br></br>
            <br></br>
            <h1>解説</h1>
            <h3>HTTPを利用しているサイトは危険だとなぜ言われているのでしょうか？</h3>
            <p>
            実はHTTPのサイトを利用することが必ずしも危険というわけではありません。
            <br></br>
            例えば、この問題の状況では、free-wifiを利用していなければ情報の漏洩は起こらない可能性が高いでしょう。
            <br></br>
            また、信頼のできないサイトの場合、HTTPSを利用していても情報は漏洩する可能性があります。
            <br></br>
            つまり、信頼のできるサイト・通信経路を利用している場合は、HTTPの利用に危険はありません。
            <br></br>
            ではなぜ危険と言われるのでしょう？
            <br></br>
            問題は、通信経路に悪意のある第三者が介入できる状況に発生します。
            <br></br>
            この状況は、多くの人にとって身近な通信経路であるfree-wifiを通した通信も当てはまります。
            <br></br>
            free-wifiではサーバーに送信するデータをfree-wifiのパスワードを用いて暗号化されます。
            <br></br>
            そのため、free-wifiのパスワードを知っている人なら誰でも情報を復号化できます。
            <br></br>
            そのため、free-wifiを利用する多くの人にとってHTTPの利用は危険だと考えられるのです。
            </p>
            <br></br>
            <br></br>
            <h2>Coffee break</h2>
            <h3>Wire Shark</h3>
            <p>Wire Sharkとはネットワークのパケット解析用ソフトウェアです。
            <br></br>
            インストール方法、基本的な使い方、見方、読み込み法、
            </p>
            </div>
        },
        {title:"美しい空",problemSentences:<p>トマトはおいしい、されど空はどこまでも高く広がるようだ。まるで、でかいクッキーを取り残していくように。</p>,ans:"0023",editorial:""},
        {title:"でかいクッキー",problemSentences:<p>トマトはおいしい、されど空はどこまでも高く広がるようだ。まるで、でかいクッキーを取り残していくように。</p>,ans:"0023",editorial:""},
        {title:"扇風機",problemSentences:<p>トマトはおいしい、<br></br>されど空はどこまでも高く広がるようだ。<br></br>まるで、でかいクッキーを取り残していくように。</p>,ans:"0023",editorial:""}
    ]

    return (
        <div className="App">
        <canvas ref={q}></canvas>
        <div className='Head'>fun_ctf</div>
        {
            problemList.map( (li) =>
                <Problem title= {li.title} problemSentences={li.problemSentences} ans={li.ans} editorial={li.editorial}></Problem>)
        }
        </div>
    );
}

export default App;
