import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';

class Card extends Component{
  render(){
    if(this.props.suit === "♦" || this.props.suit === "♥"){
      return (
        <div className="card red"><span>{this.props.card} {this.props.suit}</span></div>
      )
 }
   else {
     return(
       <div className="card"><span>{this.props.card} {this.props.suit}</span></div>
     )
   }
 }
}

class App extends Component {
state = {
    deck: deck,
    position: 0,
    playerTotal: 0,
    dealerTotal: 0,
    playerCards: [],
  }
  componentDidUpdate(){
    console.log(this.state);
  }

  hit(){
    const {deck, position, playerTotal} = this.state
    const card = deck[position]
    this.setState({
      position: (position+1),
      playerTotal: playerTotal+card.power,
      playerCards: [...this.state.playerCards, card],
    })
  }

  stay(){

  }

  double(){

  }

  surrender(){

  }


  render() {
    const {playerCards} = this.state
    return (
      <div className="App">
          <div className="board">
            <div className="dealerCards">
              <div className="card"><span>2♣</span></div>
              <div className="card"><span>2♣</span></div>
            </div>
            <div className="myCards" id="pcards">
             <div className="options">
              <button className="btn btn-primary" onClick={() => this.hit()}>Hit</button>
              <button className="btn btn-primary" onClick={() => this.stay()}>Stay</button>
              <button className="btn btn-primary" onClick={() => this.double()}>Double</button>
              <button className="btn btn-primary" onClick={() => this.surrender()}>Surrender</button>
             </div>
             {
              playerCards.map((e) => (
                <Card card={e.card} suit={e.suit}/>
              )
             )
             }
            </div>
          </div>
      </div>
    );
  }
}

export default App;

const deck = [
  {card:"2", suit:"♦", power:2 },
  {card:"3", suit:"♦", power:3 },
  {card:"4", suit:"♦", power:4 },
  {card:"5", suit:"♦", power:5 },
  {card:"6", suit:"♦", power:6 },
  {card:"7", suit:"♦", power:7 },
  {card:"8", suit:"♦", power:8 },
  {card:"9", suit:"♦", power:9 },
  {card:"10", suit:"♦", power:10 },
  {card:"J", suit:"♦", power:10 },
  {card:"Q", suit:"♦", power:10 },
  {card:"K", suit:"♦", power:10 },
  {card:"A", suit:"♦", power:11 },
  {card:"2", suit:"♣", power:2 },
  {card:"3", suit:"♣", power:3 },
  {card:"4", suit:"♣", power:4 },
  {card:"5", suit:"♣", power:5 },
  {card:"6", suit:"♣", power:6 },
  {card:"7", suit:"♣", power:7 },
  {card:"8", suit:"♣", power:8 },
  {card:"9", suit:"♣", power:9 },
  {card:"10", suit:"♣", power:10 },
  {card:"J", suit:"♣", power:10 },
  {card:"Q", suit:"♣", power:10 },
  {card:"K", suit:"♣", power:10 },
  {card:"A", suit:"♣", power:11 },
  {card:"2", suit:"♥", power:2 },
  {card:"3", suit:"♥", power:3 },
  {card:"4", suit:"♥", power:4 },
  {card:"5", suit:"♥", power:5 },
  {card:"6", suit:"♥", power:6 },
  {card:"7", suit:"♥", power:7 },
  {card:"8", suit:"♥", power:8 },
  {card:"9", suit:"♥", power:9 },
  {card:"10", suit:"♥", power:10 },
  {card:"J", suit:"♥", power:10 },
  {card:"Q", suit:"♥", power:10 },
  {card:"K", suit:"♥", power:10 },
  {card:"A", suit:"♥", power:11 },
  {card:"2", suit:"S", power:2 },
  {card:"3", suit:"♠", power:3 },
  {card:"4", suit:"♠", power:4 },
  {card:"5", suit:"♠", power:5 },
  {card:"6", suit:"♠", power:6 },
  {card:"7", suit:"♠", power:7 },
  {card:"8", suit:"♠", power:8 },
  {card:"9", suit:"♠", power:9 },
  {card:"10", suit:"♠", power:10 },
  {card:"J", suit:"♠", power:10 },
  {card:"Q", suit:"♠", power:10 },
  {card:"K", suit:"♠", power:10 },
  {card:"A", suit:"♠", power:11 },
]
