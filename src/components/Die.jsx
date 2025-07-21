import React from 'react'

function Die(props) {
  // console.log(props)

  return (
    <button 
      className= {`die ${props.locked? 'held': ''}`} 
      onClick={() => {props.onClick(props.id)}}
      aria-pressed={props.locked}
      aria-label={`Die with value ${props.value}, ${props.locked? 'held' : 'not held'}`}
    >{props.value}
    </button>
  )
}

export default Die
