import React, { Component } from 'react'
import './App.css';
import Circle from './components/Circle';
import Overlay from './components/Overlay';

const randomNum = (min, max) =>{
  return Math.floor(Math.random()* (max -min +1)) + min;
}


class App extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       circles:4,
       score:0,
       current:0,
       pace:1000,
       startGame:true,
       endGame:false,
       lives:3,
       showOverlay:false
    }
  }
  timer;
  
  clickHandler = (index) =>{
    console.log('its clicked')
    if(index !==this.state.endGame) return;
    console.log(index, 'circle')
    if(index !==this.state.current){
      this.setState({lives: this.state.lives -1})
    }
    this.setState({
      score:this.state.score + 1
    })
  
  }

  nextCircle= ()=>{
    if(!this.state.lives){
      this.endHandler();
      return;
    }
    let nextActive;

    do{
      nextActive = randomNum(0, this.state.circles.length -1);
    } while(nextActive ===this.state.current);
    
    this.setState({
      current:nextActive,
      pace: this.state.pace - 10,
      lives: this.state.lives -1,
    });

    console.log(nextActive)
    
    this.timer = setTimeout(this.nextCircle, this.state.pace)
  };

  startHandler =() =>{
    this.toggleButtons();
    this.nextCircle ();
  }

  endHandler = () =>{
    clearTimeout(this.timer);
    this.setState({showOverlay:true})
    this.toggleButtons();
  }

  resetHandler = () =>{
    // window.location.reload();
    this.setState({
      current:undefined,
      score:0,
      pace:1000
    })
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


  render() {
    return (
      <div className='App'>
      <header>
      <h1 className='title'>Smack the Mosquito </h1>
      <p className="lives">🙂{this.state.lives}</p>

      <p className='score'>You've Kill:<span> {this.state.score}</span> Mosquitoes</p>
      </header>
      <main>
      {Array.from(new Array(this.state.circles)).map((_,index) =>(
        <Circle 
          key={index}
          id={index + 1}
          clicks={() => this.clickHandler(index)}
          active={this.state.current===index}
          style={{backgroundColor: this.state.current===index? 'blue': ''}}
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
