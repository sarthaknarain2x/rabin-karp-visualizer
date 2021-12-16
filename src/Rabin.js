import React, { useState } from "react";
import "./rabin.css";

let d = 256;

function search(pat, txt, q) {
  let arr = [];

  let M = pat.length;
  let N = txt.length;
  let i, j;

  // Hash value for pattern
  let p = 0;

  // Hash value for txt
  let t = 0;
  let h = 1;

  // The value of h would be "pow(d, M-1)%q"
  for (i = 0; i < M - 1; i++) h = (h * d) % q;

  // Calculate the hash value of pattern and
  // first window of text
  for (i = 0; i < M; i++) {
    p = (d * p + pat[i].charCodeAt()) % q;
    t = (d * t + txt[i].charCodeAt()) % q;
  }

  // Slide the pattern over text one by one
  for (i = 0; i <= N - M; i++) {
    // Check the hash values of current
    // window of text and pattern. If the
    // hash values match then only
    // check for characters on by one
    if (p === t) {
      /* Check for characters one by one */
      for (j = 0; j < M; j++) {
        if (txt[i + j] !== pat[j]) break;
      }

      // if p == t and pat[0...M-1] =
      // txt[i, i+1, ...i+M-1]
      if (j === M) arr.push(i);
    }

    // Calculate hash value for next window
    // of text: Remove leading digit, add
    // trailing digit
    if (i < N - M) {
      t = (d * (t - txt[i].charCodeAt() * h) + txt[i + M].charCodeAt()) % q;

      // We might get negative value of t,
      // converting it to positive
      if (t < 0) t = t + q;
    }
  }
  return arr;
}

export default function Rabin() {
  const [text, setText] = useState("");
  const [pat, setPat] = useState("");
  const [indexFound, setIndexFound] = useState([]);
  const [curr, setCurr] = useState(1);
  const [iii, setI] = useState(0);
  const [ans, setAns] = useState([]);

  const moveRight = () => {
    document.querySelector(
      ".table td:nth-child(" + curr + ")"
    ).style.backgroundColor = "red";
    setCurr(curr + 1);
    console.log(curr);
    console.log(iii);

    if (indexFound[iii] + pat.length === curr - 1) {
      for (var o = curr - pat.length; o <= curr - 1; o++) {
        document.querySelector(
          ".table td:nth-child(" + o + ")"
        ).style.backgroundColor = "green";
      }
      setAns([...ans, "Pattern found at " + indexFound[iii]]);
      setI(iii + 1);
    }
    if (curr >= text.length) {
      document.getElementById("next").disabled = true;
    }
  };

  return (
    <div className="main">
      <div className="compl">
        <div>
          <label for="fname">Text </label>
          <input
            type="text"
            id="fname"
            onChange={(e) => setText(e.target.value)}
            name="fname"
            value={text}
          />
          <br />
          <label for="fbame">Pattern</label>
          <input
            type="text"
            id="fbame"
            onChange={(e) => setPat(e.target.value)}
            name="fbame"
            value={pat}
          />
          <button
            onClick={() => {
              setText(text + " ");
              setIndexFound(search(pat, text, 101));
            }}
          >
            Initialize
          </button>
        </div>
      </div>
      <div className="compr">
        <div className="compra">
          <h1>Text</h1>
          <table id="table" className="table">
            <tbody>
              <tr>
                {text.split("").map((a, b) => {
                  return <td color="red">{a}</td>;
                })}
              </tr>
            </tbody>
          </table>
          <h2>Pattern to search</h2>
          <h3>{pat}</h3>

          <div>
            <button
              id="next"
              onClick={() => {
                moveRight();
              }}
            >
              Next
            </button>
          </div>
        </div>
        <div className="comprb">
          {ans.map((a, b) => {
            return (
              <div>
                <span>{a}</span>
                <br />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
