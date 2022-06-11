import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { BasketContext } from "../contexts/basket";

export default function Timer({ reservationData }) {
  const { setBasket } = useContext(BasketContext);

  //let timer is the timeout found in reservationData - this is the time we use to make a countdown
  //this gets us time (5min) in miliseconds
  let timer = reservationData["timeout"];

  //since we want a "00:00" format, we have to convert miliseconds to minutes and seconds
  let minutes = Math.floor(timer / 60000);
  let seconds = ((timer % 60000) / 1000).toFixed(0);

  //make it
  let newSec = parseInt(seconds);

  //-----REAL DATA TIMER (from reservationData)--------

  //useState since the timer will change as it counts down
  const [timerMinutes, setTimerMinutes] = useState(minutes);
  const [timerSeconds, setTimerSeconds] = useState(newSec);

  //reveal is a popup appearing if the time has passed before an order was confirmed
  //we start of by making it false since we want to keep it hidden in the beginning
  const [reveal, setReveal] = useState(false);

  //use effect to only call it once (we only want the counter to countdown once)
  useEffect(() => {
    let myInterval = setInterval(() => {
      //if timerseconds is greater than 0
      if (timerSeconds > 0) {
        //then remove 1 second from timer
        setTimerSeconds(timerSeconds - 1);
      } //if timerSeconds is 0
      if (timerSeconds === 0) {
        //then, if timerminutes is 0,
        if (timerMinutes === 0) {
          //clear the timer and show the popUp telling the user that their reservation ended
          clearInterval(myInterval);
          showPopup();
        } //else, timerminutes is not 0,
        else {
          //then remove 1 from timerminutes and set timerSeconds to 59 (to get input like 1:59)
          setTimerMinutes(timerMinutes - 1);
          setTimerSeconds(59);
        }
      }
    }, 1000); //every second (1000) we want myInterval to loop (because we need it to count down every second)
    return () => {
      //clear timer
      clearInterval(myInterval);
    };
  });

  function showPopup() {
    //show popup telling the user that their reservation has ended
    setReveal(true);
    //empty basket since the reservation didn't go through
    setBasket((oldState) => ({
      oldState,
      tickets: [],
      campingSpot: [],
      tentsBA: [],
      gogreenBA: {},
    }));
  }
  return (
    <div className="timer-wrapper">
      <div className="timer">
        <p>
          {" "}
          {/* if timerSeconds is lesser than 10, add a zero to get format like "1:05" if it's falsy just show timerSeconds as it is */}
          Time left: {timerMinutes}:
          {timerSeconds < 10 ? `0${timerSeconds}` : timerSeconds}
        </p>
      </div>

      {/*this is our popup" */}
      {/* if reveal is true the class is null, if its false then add class "hidden" */}
      <div className={reveal ? null : "hidden"} id="popup">
        <div className="dialog">
          <p className="black-text">
            Sorry, your time is up! <br /> Your tickets have been released.
          </p>
          <Link to="/">
            <button>Go to homepage</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
