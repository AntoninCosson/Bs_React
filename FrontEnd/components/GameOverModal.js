import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { connect } from "../reducers/user";


import styles from "../styles/GameOverModal.module.css";



export default function GameOverModal({ score, onRestart }) {

const dispatch = useDispatch();

const { username, password } = useSelector(state => state.user);
const bestScore = useSelector(state => state.user.bestScore);

const [bestScoreUser, setBestScoreUser] = useState(0);
const [showFirework, setShowFirework] = useState(false);

const [top3Scores, setTop3Scores] = useState([]);

function playFireworkAnimation() {
  setShowFirework(true);
  setTimeout(() => setShowFirework(false), 2000);
};

  useEffect(() => {
    const onKey = (e) => {
      if (e.code === "Space") {
        onRestart();
      }
    };

    fetch("http://localhost:3000/top3")
    .then(res => res.json())
    .then(data => {
      setTop3Scores(data.top3)
      console.log("la get" + data)
    }
  );
  

    fetch(`http://localhost:3000/users/bestScoreUser?username=${username}`)
    .then(res => res.json())
    .then(data => {
      if (data.result) {
        setBestScoreUser(data.bestScoreUser);
        if (score > data.bestScoreUser) {
          playFireworkAnimation();
          setBestScoreUser(score);

          fetch("http://localhost:3000/users/bestScoreUser", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, score }),
          })
          .then(res => res.json())
          .then(data => {
            dispatch(connect({
              username,
              bestScore: score,
              token: data.token,
              connected: true,
            }));
            console.log( "la patchUser" + data)
    });

    fetch("http://localhost:3000/top3", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, score }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.result) setTop3Scores(data.top3);
        console.log( "la patch" +data.top3)
      });

        }
      }
    });

  

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    
  }, [onRestart]);

  {top3Scores.map((entry, idx) => (
    <li key={idx}>
      {entry.username} : {entry.score}
    </li>
  ))}

  return (
<div className={styles.overlay}>

  <div className={styles.modal}>

  {showFirework && (
  <div className={styles.fireworkDiv}>
      <img 
        src="/Anim/clicportfolio.gif"
        className={styles.firework}
        alt="Firework animation"
      />
  </div>
)}

    <img
    className={styles.gameOverSvg}
    src = "/ChairRunGame/gameover.svg"
    />

    <div className={styles.scoreDiv}>
      <img
      className={styles.scoreSvg}
      src = "/ChairRunGame/yourscore.svg"
      />
      <div className={styles.scoreTxt}>
      {score}
      </div>
    </div>

    <div className={styles.bestScoreDiv}>
      <img
      className={styles.bestScoreSvg}
      src = "/ChairRunGame/yourbestscore.svg"
      />
      <div className={styles.bestScoreTxt}>
      {bestScoreUser}
      </div>
    </div>

    <div>
      <div>
        <img
          className={styles.top3Svg}
          src = "/ChairRunGame/top3.svg"
          />
        <div className={styles.usersBestScore}>
            {top3Scores.map((entry, idx)=> (
              <p className={styles.usersBestScoreTxt} key={idx}>
              {entry.username} : {entry.score}
               </p>
            ))}
        </div>
      </div>
    </div>

        <h6 className={styles.pressStart}>Press Start to restart</h6>
      </div>
    </div>
  );
}