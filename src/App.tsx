import {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import './App.css';

function Calendar() {
  const [dateState, setDateState] = useState(new Date());
  useEffect(() => {
    setInterval(() => setDateState(new Date()), 10000);
  }, []);
  return (
      <div className='calendar' tabIndex={0} aria-label="date du jour" aria-labelledby='calendar'>
        <p id="calendar">
          {' '}
          {dateState.toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}
        </p>
      </div>
  )
}

function Time() {
  const [dateState, setDateState] = useState(new Date());
  useEffect(() => {
    setInterval(() => setDateState(new Date()), 500);
  }, []);
  return (
    <div className="time" tabIndex={0} aria-label="Heure actuelle" aria-labelledby='time'>
        <p id="time">
          {dateState.toLocaleString('fr-FR', {
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: false,
          })}
        </p>
      </div>
  );
}

function Chrono() {
  const [time, setTime] = useState(0);
  const [start, setStart] = useState(false);
  (useEffect(() => {
    let interval: string | number | NodeJS.Timer | undefined;

    if (start) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 10)}, 10)
        const button = document.querySelector('button')
        button?.blur();
    } else {
      clearInterval(interval)
    }

    return () => clearInterval(interval)
  }, [start])
  )

  function handleCLick () {
    if (start) {
      return (
        <>
          <button className='btn btn-pause' onClick={() => setStart(false)}>Pause</button>
          <button className='btn btn-stop' onClick={() => {setTime(0); setStart(false)}}>Réinitialiser</button>
        </>
      )
    } else {
      return (
        <>
          <button className='btn btn-start' onClick={() => setStart(true)}>Démarrer</button>
        </>
      )
    }
  }

  const hour = ("0" + Math.floor((time / 3600000) % 60)).slice(-2)
  const minute = ("0" + Math.floor((time / 60000) % 60)).slice(-2)
  const second = ("0" + Math.floor((time / 1000) % 60)).slice(-2)
  const milliseconds = ("0" + Math.floor((time / 10) % 1000)).slice(-2)

  return (
    <>
      <div className='timer' tabIndex={0} aria-label="chronomètre" aria-labelledby="chrono">
          <p id='chrono'>{hour}:{minute}:{second}:{milliseconds}</p>
      </div>
      <div className='timer-actions'>
          {handleCLick()}
      </div>
    </>
  )
}


function Watch() {
  return (
    <>
      <Calendar />
      <Time />
      <Chrono />
    </>
  )
}

export default Watch;
