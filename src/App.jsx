import React from 'react';
import Die from './components/Die';
import {nanoid} from 'nanoid';
import Confetti from 'react-confetti';
import { useEffect } from 'react';


function App() {

  const [diceData, setDiceData] = React.useState(() => {

    return new Array(10)
      .fill(0)
      .map(() =>({id: nanoid(), locked:false, value: Math.floor(Math.random()*6) + 1}))
  })

  const [windowSize, setWindowSize] = React.useState([window.innerWidth, window.innerHeight])

  useEffect(() => {
    function updateWindowSize(){
      console.log("window resized")
      setWindowSize([window.innerWidth, window.innerHeight])
    }

    window.addEventListener('resize', updateWindowSize)

    return (() => {window.removeEventListener('resize', updateWindowSize)})
  }, [])

  const rollButton = React.useRef(null)

  const gameWon = diceData.every(die => die.locked) && diceData.every(die => die.value === diceData[0].value)

  React.useEffect(()=>{
    console.log('gameWon var updated')
    if (gameWon){
      rollButton.current.focus()
    }
  }, [gameWon])

  function rollDice(){
    if (gameWon){
      console.error("Error: Should not be able to roll when game is won!")
      return
    }

    setDiceData(prev => 
      prev.map((data) => {
        if (data.locked){
          return data
          
        } else{
          return {
            ...data, 
            value: Math.floor(Math.random()*6) + 1
          }
        }
      })
    )
  }

  function resetGame(){
    if (!gameWon){
      console.error("Error: Should not be able to reset game before it is won")
      return
    }

    setDiceData(prev => 
      prev.map((data) => ({
            ...data, 
            locked:false, 
            value: Math.floor(Math.random()*6) + 1
          })
        )
      )
  }

  function toggleDieLock(targetId){
    setDiceData(prev => 
      prev.map((data, index) => {
        if (data.id===targetId){
          return {
            ...data, 
            locked: !data.locked
          }
        } else{
           return data
        }
       })
    )
  }

  return (
    <main className="app">
      <Confetti width={windowSize[0]} height={windowSize[1]} numberOfPieces={gameWon? 200: 0}/>
      <div aria-live="polite" className="sr-only">
        {gameWon && <p>Congratulations! You won! Press the "New Game" button to start again.</p>}
      </div>
      <div className="game">
        <div>
          <h1 className='title'>Tenzies</h1>
          <p className='description'>
            Roll until all dice are the same. Click each die to freeze it at its current value between rolls.
          </p>
        </div>
        
        <div className='dice-container'>
          {diceData.map(
            (dieData) => <Die
            key={dieData.id} 
            {...dieData}
            onClick={toggleDieLock}
            />
          )}
        </div>

        <div className='roll-button-container'>
          <button
            ref={rollButton}
            onClick={gameWon? resetGame: rollDice}
          >
            {gameWon? 'New Game' : 'Roll'}
          </button>
        </div>
      </div>
    </main>
  )
}

export default App
