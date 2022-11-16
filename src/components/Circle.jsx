import React from 'react'

import '../styles/Circle.css'
const Circle = (props) => {
  return (
  <div 
  className={props.active? " circle active" : "circle" }
  style={props.style}
  onClick={props.clicks}>
  {props.id}
  </div>
   
  )
}
export default Circle
