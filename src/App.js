import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import Card from './Components/Card';
import BetForm from './Components/BetForm'

class App extends Component {
state = {
    // deck: deck,
    position: 0,
    playerTotal: 0,
    dealerTotal: 0,
    playerCards: [],
    dealerCards: [],
    moneyTotal: 100,
    currentBet: 0,
    roundStart: true,
    specialRoundStartDraw: false, //So async updates don't mess up dealer draw at the start of rounds
  }
  componentDidMount(){
    this.shuffle(deck)
    console.log(deck)
    this.setState({
      deck: deck,
    })
  }
  componentDidUpdate(){
    console.log(this.state);
    if(this.state.specialRoundStartDraw === true){
      this.setState({
        position: this.state.position+1,
        dealerCards: [...this.state.dealerCards, this.state.deck[this.state.position]],
        dealerTotal: this.state.dealerTotal + this.state.deck[this.state.position].power,
        specialRoundStartDraw: false,
      })
    }
  }

  hit(num, whom){
    const {deck, position, playerTotal, dealerTotal, playerCards, dealerCards} = this.state
    let cards = []
    let power = 0
    for(var i=0; i<num; i++) {
      cards.push(deck[position+i])
      power += deck[position+i].power
    }
    if(whom === "player"){
    this.setState({
      position: (position+num),
      playerTotal: playerTotal+power,
      playerCards: [...playerCards, ...cards],
    })
  } else {
    this.setState({
      position: (position+num),
      dealerTotal: dealerTotal+power,
      dealerCards: [...dealerCards, ...cards],
    })
  }

  }
  stay(){

  }

  double(){

  }

  surrender(){

  }

  shuffle(d){
     for(var i = 0; i<1000; i++){
        var a = Math.floor(Math.random() * 52)
        var b = Math.floor(Math.random() * 52)
        var tmp = d[a]
        d[a] = d[b]
        d[b] = tmp
      }
      console.log(d)
  }

  setBet(bet){
    this.setState({
      currentBet: bet,
      roundStart: false,
      moneyTotal: (this.state.moneyTotal-bet),
      specialRoundStartDraw: true,
    })
     this.hit(2, "player")
  }

  render() {
    const {playerCards, moneyTotal, roundStart, currentBet, dealerCards} = this.state
    const moneyFormatted = moneyTotal.toLocaleString()
    return (
      <div className="App">
          <div className="board">
            <div className="dealerCards">
            {
             dealerCards.map((e) => (
               <Card card={e.card} suit={e.suit}/>
             )
            )
            }
            </div>
            <div className="myCards" id="pcards">
             <div className="options">
              <button className="btn btn-primary" onClick={() => this.hit(1, "player")} disabled={roundStart} >Hit</button>
              <button className="btn btn-primary" onClick={() => this.stay()} disabled={roundStart}>Stay</button>
              <button className="btn btn-primary" onClick={() => this.double()} disabled={roundStart}>Double</button>
              <button className="btn btn-primary" onClick={() => this.surrender()} disabled={roundStart}>Surrender</button>
              <h3>${moneyFormatted}</h3>
              <h4>Bet: {currentBet}</h4>
             </div>
             {roundStart ? (<BetForm betAmt={this.setBet.bind(this)} monTotal={moneyTotal}/>): null }
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

var deck = [
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
  {card:"2", suit:"♠", power:2 },
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
