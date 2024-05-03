import React, { useState, useEffect } from 'react';
import "./Timer.css"

const DateTimeComponent = () => {
  const [date, setDate] = useState('');
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [countdownActive, setCountdownActive] = useState(false);
  const [message,setMessage] = useState("")
  
  const handleCountdown = () => {
    setCountdownActive(!countdownActive);
  };
  
  const handleInputChange = (e) => {
    setDate(e.currentTarget.value);
  };

  useEffect(() => {
    let countdownInterval;
  
    if (countdownActive && date) {
      countdownInterval = setInterval(() => {
        const currentTime = Date.now();
        const selectedTime = Date.parse(date);
        const difference = selectedTime - currentTime;
        
        if (difference <= 0) {
          clearInterval(countdownInterval);
          setCountdownActive(false);
          setMessage("The countdown is over! What's next on your adventure?");
        }
         else {
          const daysDifference = Math.floor(difference / (1000 * 60 * 60 * 24));
          if(daysDifference>100){
            clearInterval(countdownInterval)
            setCountdownActive(false);
            setMessage("Selected time is more than 100 days");

          }
          const hoursDifference = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutesDifference = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
          const secondsDifference = Math.floor((difference % (1000 * 60)) / 1000);
  
          setDays(daysDifference);
          setHours(hoursDifference);
          setMinutes(minutesDifference);
          setSeconds(secondsDifference);
        }
      }, 1000);
    } else {
      // Clear interval if countdown is not active or date is not set
      clearInterval(countdownInterval);
    }
  
    // Cleanup function to clear interval on unmount or when dependencies change
    return () => clearInterval(countdownInterval);
  }, [countdownActive, date]);
  

  return (
    <div>
      <h1>Countdown <span className="second">Timer</span></h1>
      <input type="datetime-local" onChange={handleInputChange} className='date-time'/>
      <br />
      <button className="time-button" onClick={handleCountdown}>{countdownActive ? 'Stop Time' : 'Start Time'}</button> 
      {countdownActive && (
      <div className='time'>
        <div className='time-children'>{days}<p>Days</p></div>
        <div className='time-children'>{hours}<p>Hours</p></div>
        <div className='time-children'>{minutes}<p>Mintues</p></div>
        <div className='time-children'>{seconds}<p>Seconds</p></div>
      </div> )}
      <p>{message}</p>
    </div>
  );
};

export default DateTimeComponent;
