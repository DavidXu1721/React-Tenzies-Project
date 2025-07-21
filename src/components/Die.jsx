import React from 'react'

function Die(props) {
  // console.log(props)

  // TODO: Add animations when die is held/unheld
  
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
