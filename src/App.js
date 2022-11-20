import React, { Component } from 'react'
import './App.css';
import Circle from './components/Circle';
import Overlay from './components/Overlay';
import click from './assets/click.wav';
import gameOver from './assets/gameOver.wav';
import mosquitoe from './assets/mosquitoe.mp3';

let killSound = new Audio(click);
let gameOverSound = new Audio(gameOver);
let activeMosquitoe = new Audio(mosquitoe);

const randomNum = (min, max) =>{
  return Math.floor(Math.random()* (max-min +1)) + min;
}


class App extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       circles:4,
       score:0,
       current:undefined,
       pace:1000,
       startGame:true,
       endGame:false,
       lives:3,
       showOverlay:false,
       rounds:3
    }
  }
  timer;

  clickPlay = () => {
    if (killSound.paused){
      killSound.play()
    } else {
      killSound.currentTime=0
    }
  }
  
  clickHandler = (index) =>{
    this.clickPlay();
    if(this.state.current !== index){
      return this.endHandler();
    }
    this.setState({
      score:this.state.score + 1,
      lives:3,
      rounds:3
    })
  
  }

  nextCircle= ()=>{
    if(this.state.lives <=0 || this.state.rounds <=0){
      this.endHandler();
      return;
    }
    let nextActive;

    do{
      nextActive = randomNum(0, this.state.circles);
    } while(nextActive ===this.state.current);
    
    this.setState({
      current: nextActive,
      pace: this.state.pace * 0.99,
      lives: this.state.lives - 0.19,
      rounds: this.state.rounds - 0.25
    });
    
    this.timer = setTimeout(this.nextCircle, this.state.pace)
    
  };

  startHandler =() =>{
    activeMosquitoe.play()
    this.toggleButtons();
    this.nextCircle ();
  }

  endHandler = () =>{
    killSound.pause()
    activeMosquitoe.pause()
    gameOverSound.play()
    clearTimeout(this.timer);
    this.setState({showOverlay:true})
    this.toggleButtons();
  }

  resetHandler = () =>{
    window.location.reload();
  }

  toggleButtons = () =>{
    this.setState({
      startGame:!this.state.startGame,
      endGame:!this.state.endGame
    })
  }

  closeModal =() =>{
    this.setState ({showOverlay:false})
    this.resetHandler();
  }
  imgUrl= 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn-jr.brainpop.com%2Fhealth%2Fberesponsible%2Freducereuserecycle%2Fplain_icon.png&f=1&nofb=1&ipt=8ea519291c60b2e6714923184c29a6e4e766f81fdd66eefdf0e6877329045ad3&ipo=images' 


  render() {
    return (
      <div className='App'>
      <header>
      <h1 className='title'>Smack the Mosquito </h1>
      <p className="lives">🙂{Math.floor(this.state.lives)}</p>
      <p className='score'>You've Kill:<span> {this.state.score}</span> Mosquitoes</p>
      <p className="rounds"><img src={this.imgUrl} alt='recycle' width='30px' height='30px'/> {Math.floor(this.state.rounds)}</p>
     
      </header>
      <main>
      {Array.from(new Array(this.state.circles)).map((_,index) =>(
        <Circle 
          key={index}
          // id={index + 1}
          clicks={() => this.clickHandler(index)}
          active={this.state.current===index}
          // style={{backgroundColor: this.state.current===index? 'blue': ''}}
        />
      ))}
      </main>
      <footer>
      {this.state.startGame && (<button className='start' onClick={this.startHandler}>Start Game</button>)}
      {this.state.endGame && (<button className='end' onClick={this.endHandler}>End Game</button>)}
      {this.state.showOverlay && (<Overlay score={this.state.score} click={this.closeModal} />)}
      </footer>

      </div>
    )
  }
}

export default App
