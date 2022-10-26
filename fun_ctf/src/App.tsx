import React, { useEffect, useRef, useState } from 'react';
import { JsxElement } from 'typescript';
import './App.css';

function Problem(props: { title: string, problemSentences: any, ans: string, editorial: any }) {
    const [clicked, setClicked] = useState<number>(0);
    const [checkEditorial, setCheckEditorial] = useState<number>(0);
    const [flag, setFlag] = useState<string>("");
    const inputId = "id" + Math.random().toString().replace(".", "d");
    return (
        <div className='list-element' onClick={() => setClicked(clicked === 0 ? 1 : -clicked)}>
            {props.title}
            {
                clicked === 1 ?
                    checkEditorial === 1 ?
                        <div className='problem-sentences-inflate'>
                            {props.editorial}
                            <button style={{ textAlign: "right" }} onClick={(e) => { e.stopPropagation(); setCheckEditorial(-1) }}>
                                <br></br>
                                問題に戻る
                            </button>
                        </div>
                        :
                        <div className='problem-sentences-inflate'>
                            <br></br>{props.problemSentences}
                            <input id={inputId} className="deny" type="text" value={flag} onClick={(e) => { e.stopPropagation(); }} onChange={e => setFlag(e.target.value)} placeholder="flag"></input>
                            <br></br>
                            <button onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                if (flag === props.ans) {
                                    const input = document.querySelector("#" + inputId) as HTMLElement | null;
                                    if (input != null) {
                                        input.classList.toggle("correct");
                                        setTimeout(() => { input.classList.toggle("correct"); setCheckEditorial(1); }, 3000);
                                    }
                                } else {
                                    const input = document.querySelector("#" + inputId) as HTMLElement | null;
                                    if (input != null) {
                                        input.classList.toggle("deny");
                                        setTimeout(() => input.classList.toggle("deny"), 30);
                                    }
                                }
                            }}>submit</button>
                            <br></br>
                            <button style={{ textAlign: "right" }} onClick={(e) => { e.stopPropagation(); setCheckEditorial(1) }}>
                                <br></br>
                                解説をみる
                            </button>
                        </div>
                    : clicked === -1 ?
                        checkEditorial === 1 ?
                            <div className='problem-sentences-deflate'>
                                {props.editorial}
                                <button style={{ textAlign: "right" }} onClick={(e) => { e.stopPropagation(); setCheckEditorial(-1) }}>
                                    問題に戻る
                                </button>
                            </div>
                            :
                            <div className='problem-sentences-deflate'>
                                <br></br>{props.problemSentences}
                                <input id={inputId} type="text" value={flag} onClick={(e) => { e.stopPropagation(); }} onChange={e => setFlag(e.target.value)} placeholder="flag"></input>
                                <br></br>
                                <button onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    if (flag === props.ans) {
                                        setCheckEditorial(1);
                                    } else {
                                        const input = document.querySelector("#" + inputId) as HTMLElement | null;
                                        if (input != null) {
                                            input.style.animationDuration = "0.7";
                                            input.style.animationName = "";
                                            input.style.animationName = "Shiver";
                                        }
                                    }
                                }}>submit</button>
                                <br></br>
                                <button style={{ textAlign: "right" }} onClick={(e) => { e.stopPropagation(); setCheckEditorial(1) }}>
                                <br></br>
                                    解説をみる
                                </button>
                            </div>
                        : undefined
            }
            {/*        <hr></hr>
          */}
        </div>
    )
}

function App() {

    var q: any = useRef(null)

    useEffect(() => {
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
        var height = q.current.height = window.innerHeight * 3;
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
            q.current.getContext('2d').fillRect(width / 2 - 430, 0, 860, 4000);

            //色を指定する
        };
        setInterval(draw, 33);
    });

    const problemList = [
        {
            title: "Naked Network", problemSentences:
                <p onClick={(e) => e.stopPropagation()}>
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
                    <a onClick={(e) => e.stopPropagation()} href="https://gist.github.com/takehr/532a652a685342c0216791467eb17a71/raw/cf81c773d159fc2efa6f26565a2f59667f4343c2/capture.cap" download>
                        capture&#46;cap
                    </a>
                </p>,
            ans: "hacking{sensei}",
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
        { 
            title: "Rivest… Shamir… Adleman!!",
            problemSentences:
                <p onClick={(e) => e.stopPropagation()}>
                    あなたは受託開発を主とする企業に勤めています。
                    <br></br>
                    開発のため、取引先からOpenSSH形式の公開鍵が送られてきました。
                    <br></br>
                    しかし、その公開鍵に問題があるようです。
                    <br></br>
                    ところが、取引先の人は納得していません。
                    <br></br>
                    そこで、取引先の人の用意した暗号文を解読して、
                    <br></br>
                    hacking&#123;復号化した文&#125;の形式で提出してください。
                    <br></br>
                    <br></br>
                    暗号文
                    <br></br>
                    <br></br>
                    <div onClick={(e) => e.stopPropagation()}>
                        59171618157625834911998993598558781850291
                    </div>
                    <br></br>
                    <br></br>
                    問題のある公開鍵
                    <br></br>
                    <a onClick={(e) => e.stopPropagation()} href="data:text/plain;base64,c3NoLXJzYSBBQUFBQjNOemFDMXljMkVBQUFBQkN3QUFBQklCQTdnUElxWmdWRTBIME1pckhTa0NxOVU9IHJlbW90ZUBERVNLVE9QLUZVTl9DVEYyMDIy" download="id_rsa.pub">
                        id_rsa&#46;pub
                    </a>
                </p>,
            ans: "hacking{Hello_decryption!}",
            editorial: 
                <div>
                    <br></br>
                    <br></br>
                    <h1>解説</h1>
                    <h3>RSA暗号とは</h3>
                    <p>
                        現代では様々ある暗号の中でも、
                        <br></br>
                        暗号化・復号化に鍵と呼ばれる合言葉のようなものを必要とする暗号である
                        <br></br>
                        共通鍵暗号、公開鍵暗号の2種類が良く使われています。
                        <br></br>
                        共通鍵暗号方式では暗号化・復号化で用いる鍵が同じである一方、
                        <br></br>
                        公開鍵暗号方式では暗号化では公開鍵、復号化では秘密鍵とそれぞれ違う鍵を使います。
                        <br></br>

                        <br></br>
                        本問題では、公開鍵暗号方式の中で最もよく使われているRSA暗号を扱っています。
                        <br></br>
                        RSA暗号とは、非常に大きい数の素因数分解は現実的な時間で計算ができない
                        <br></br>
                        という仮設から考えられた公開鍵暗号方式の暗号です。
                        <br></br>
                        具体的には、元文をM, 暗号文をC, 公開鍵をe, n, 秘密鍵をd, 暗号に用いる素数をp,qとしたとき
                        <br></br>
                        n=p*q
                        <br></br>
                        phi = (p-1) * (q-1)
                        <br></br>
                        d=e^(phi-2) mod phi
                        <br></br>
                        C=M^e mod n
                        <br></br>
                        M=C^d mod n
                        <br></br>
                        という関係になっています。
                        <br></br>
                        また、本問題ではOpenSSH形式で公開鍵が取得できるため、OpenSSH形式に従って公開鍵を確認すると、
                        <br></br>
                        e=11, n=88377789570983978556045513843723192150997 であることがわかります。
                        <br></br>
                        本問題ではnが小さいため素因数分解が可能であり、
                        <br></br>
                        p=676421558270641, q=130654897808007778425046117となります。
                        <br></br>
                        よって、
                        <br></br>
                        phi = (p-1) * (q-1) ＝88377789570983847901147705159523208834240
                        <br></br>
                        d=e^(phi-2) mod phi =40171722532265385409612593254328731288291
                        <br></br>
                        M=C^d mod n =24635145413266653314682365226381229387297
                        <br></br>
                        MをASCIIコードでアルファベットに変換すると
                        <br></br>
                        Hello_decryption!
                        <br></br>
                        となり、これが解答です。

                        <br></br>
                        <br></br>
                        <h3>用語説明</h3>
                        <br></br>
                        <br></br>
                        暗号とは、第三者には情報がわからないようにすることを目的とした情報の変換方法を意味します。
                        <br></br>
                        復号化とは、暗号化された情報から元の情報への変換を意味します。
                        <br></br>
                    </p>
                </div>
        },
        { title: "でかいクッキー", problemSentences: <p>トマトはおいしい、されど空はどこまでも高く広がるようだ。まるで、でかいクッキーを取り残していくように。</p>, ans: "0023", editorial: "" },
        { title: "扇風機", problemSentences: <p>トマトはおいしい、<br></br>されど空はどこまでも高く広がるようだ。<br></br>まるで、でかいクッキーを取り残していくように。</p>, ans: "0023", editorial: "" }
    ]

    return (
        <div className="App">
            <canvas ref={q}></canvas>
            <div className='Head'>fun_ctf</div>
            {
                problemList.map((li) =>
                    <Problem title={li.title} problemSentences={li.problemSentences} ans={li.ans} editorial={li.editorial}></Problem>)
            }
        </div>
    );
}

export default App;
