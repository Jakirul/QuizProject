import React, { useState, useEffect } from "react";
import { userAnswer } from "../../redux/actions/action.js";
import { useSelector, useDispatch } from "react-redux";

function Timer({ handleSubmit }) {
  //   const [seconds, setSeconds] = useState(0);
  //   const [isActive, setIsActive] = useState(false);
  //   function toggle() {
  //     setIsActive(!isActive);
  //   }
  //   function reset() {
  //     setSeconds(0);
  //     setIsActive(false);
  //   }
  //   useEffect(() => {
  //     let interval = null;
  //     if (isActive) {
  //       interval = setInterval(() => {
  //         setSeconds((seconds) => seconds - 1);
  //       }, 1000);
  //     } else {
  //       clearInterval(interval);
  //     }
  //     return () => clearInterval(interval);
  //   }, [isActive, seconds]);
  //   return <p>Timer: {timer}</p>;
}

export default Timer;
