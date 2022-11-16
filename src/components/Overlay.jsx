import React from 'react';
import '../styles/Overlay.css'

const Overlay = (props) => {
  return (
    <div className='overlay'>
        <div className='modal'>
        <h2> Game Over</h2>
        <p> You smacked <span>{props.score} Mosquitoes</span></p>
        <button className='closeModal' onClick={props.click}>x</button>

        </div>
    </div>
  )
}

export default Overlay