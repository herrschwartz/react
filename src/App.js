import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';

class App extends Component {
state = {
    deck: deck,
    position: 0,
  }

  hit(){
    const {deck, position} = this.state
    const card = deck[position]
    this.setState({
      position: (position+1)
    })
    console.log(card)
    return card
  }

  stay(){

  }

  double(){

  }


  render() {
    return (
      <div className="App">
          <div className="board">
            <div className="dealerCards">
            </div>
            <div className="myCards">
             <div className="options">
              <button className="btn btn-primary" onClick={() => this.hit()}>Hit</button>
              <button className="btn btn-primary" onClick={() => this.stay()}>Stay</button>
              <button className="btn btn-primary" onClick={() => this.double()}>Double</button>
              <button className="btn btn-primary" onClick={() => this.surrender()}>Surrender</button>
             </div>
             <div className="card"><span>2♣</span></div>
             <div className="card"></div>
            </div>
          </div>
      </div>
    );
  }
}

export default App;

const deck = [
  {card:"2", suit:"D", power:2 },
  {card:"3", suit:"D", power:3 },
  {card:"4", suit:"D", power:4 },
  {card:"5", suit:"D", power:5 },
  {card:"6", suit:"D", power:6 },
  {card:"7", suit:"D", power:7 },
  {card:"8", suit:"D", power:8 },
  {card:"9", suit:"D", power:9 },
  {card:"10", suit:"D", power:10 },
  {card:"J", suit:"D", power:10 },
  {card:"Q", suit:"D", power:10 },
  {card:"K", suit:"D", power:10 },
  {card:"A", suit:"D", power:11 },
  {card:"2", suit:"C", power:2 },
  {card:"3", suit:"C", power:3 },
  {card:"4", suit:"C", power:4 },
  {card:"5", suit:"C", power:5 },
  {card:"6", suit:"C", power:6 },
  {card:"7", suit:"C", power:7 },
  {card:"8", suit:"C", power:8 },
  {card:"9", suit:"C", power:9 },
  {card:"10", suit:"C", power:10 },
  {card:"J", suit:"C", power:10 },
  {card:"Q", suit:"C", power:10 },
  {card:"K", suit:"C", power:10 },
  {card:"A", suit:"C", power:11 },
  {card:"2", suit:"H", power:2 },
  {card:"3", suit:"H", power:3 },
  {card:"4", suit:"H", power:4 },
  {card:"5", suit:"H", power:5 },
  {card:"6", suit:"H", power:6 },
  {card:"7", suit:"H", power:7 },
  {card:"8", suit:"H", power:8 },
  {card:"9", suit:"H", power:9 },
  {card:"10", suit:"H", power:10 },
  {card:"J", suit:"H", power:10 },
  {card:"Q", suit:"H", power:10 },
  {card:"K", suit:"H", power:10 },
  {card:"A", suit:"H", power:11 },
  {card:"2", suit:"S", power:2 },
  {card:"3", suit:"S", power:3 },
  {card:"4", suit:"S", power:4 },
  {card:"5", suit:"S", power:5 },
  {card:"6", suit:"S", power:6 },
  {card:"7", suit:"S", power:7 },
  {card:"8", suit:"S", power:8 },
  {card:"9", suit:"S", power:9 },
  {card:"10", suit:"S", power:10 },
  {card:"J", suit:"S", power:10 },
  {card:"Q", suit:"S", power:10 },
  {card:"K", suit:"S", power:10 },
  {card:"A", suit:"S", power:11 },
]
