import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import Card from './Components/Card';
import BetForm from './Components/BetForm'

class App extends Component {
state = {
    deck: deck,
    position: 0,
    playerTotal: 0,
    dealerTotal: 0,
    playerCards: [],
    dealerCards: [],
    moneyTotal: 100,
    currentBet: 0,
    roundStart: true,
    roundEnd: false,
    endMsg: "",
    dealerFlag: false, //if true, it is the dealer's turn to play
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
    const {playerTotal, dealerCards, dealerTotal, currentBet, moneyTotal, dealerFlag} = this.state
    let playerCards = this.state.playerCards
    let newTotal = 0
    console.log(this.state);


    if(playerTotal === 21){
      this.setState({
        roundEnd: true,
        playerTotal: 0,
        dealerTotal: 0,
        dealerFlag: false,
        endMsg: "Blackjack",
        moneyTotal: moneyTotal+(Math.floor(currentBet*2.5)),
      })
    }

    if(playerTotal > 21){ //works for aces, but really should be cleaned up
      newTotal = this.correctForAces(playerCards)
      if (newTotal > 21) {
        this.setState({
          roundEnd: true,
          playerTotal: 0,
          dealerTotal: 0,
          endMsg: "Bust: (" + playerTotal + ")"
        })
      } else {
        this.setState({
          playerTotal: newTotal,
          playerCards: playerCards,
        })
      }
    }

    if(dealerFlag === true){
      this.dealer()
    }

    if(this.state.specialRoundStartDraw === true){
      let position = this.state.position
      if (position>51){
        this.shuffle(this.state.deck)
        position = 0
      }
      this.setState({
        position: position+1,
        dealerCards: [...dealerCards, this.state.deck[position]],
        dealerTotal: dealerTotal + this.state.deck[position].power,
        specialRoundStartDraw: false,
      })
    }
  }

  resetBoard(){
    this.setState({
        playerCards: [],
        dealerCards: [],
        currentBet: 0,
        roundStart: true,
        roundEnd: false,
        playerTotal: 0,
        dealerTotal: 0,
        endMsg: ""
      })
  }


  hit(num, whom){
    const {deck, playerTotal, dealerTotal, playerCards, dealerCards} = this.state
    let position = this.state.position
    let cards = []
    let power = 0

    for(var i=0; i<num; i++) {
      if(position+i > 51){
        this.shuffle(deck)
        position=0
      }
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
  dealer(){
    const { dealerCards, moneyTotal, currentBet, playerTotal, dealerTotal} = this.state
    let realTotal = 0
    dealerTotal > 21 ? realTotal = this.correctForAces(dealerCards) : realTotal = dealerTotal
    if (realTotal < 17 ){
      this.hit(1, "dealer")
    } else if (realTotal < 21) {
      if(playerTotal < realTotal){
        this.setState({
          roundEnd: true,
          playerTotal: 0,
          dealerTotal: 0,
          dealerFlag: false,
          endMsg: "You Lose: Dealer ("+realTotal+"), You ("+playerTotal+")"
        })
      } else if (realTotal === playerTotal) {
        this.setState({
          roundEnd: true,
          playerTotal: 0,
          dealerTotal: 0,
          dealerFlag: false,
          moneyTotal: moneyTotal + parseInt(currentBet),
          endMsg: "Push: ("+realTotal+")"
        })
      } else {
        this.setState({
          roundEnd: true,
          playerTotal: 0,
          dealerTotal: 0,
          dealerFlag: false,
          moneyTotal: moneyTotal + 2*currentBet,
          endMsg: "You Win: Dealer ("+realTotal+"), You ("+playerTotal+")"
        })
      }

    } else if (realTotal === 21) {
      this.setState({
        roundEnd: true,
        playerTotal: 0,
        dealerTotal: 0,
        dealerFlag: false,
        endMsg: "You Lose: Dealer 21"
      })
    } else { //dealer bust
      this.setState({
        roundEnd: true,
        playerTotal: 0,
        dealerTotal: 0,
        dealerFlag: false,
        moneyTotal: moneyTotal + 2*currentBet,
        endMsg: "Dealer Bust: ("+ realTotal+ ")"
      })
    }
  }
  stay(){
    this.setState({
      dealerFlag: true
    })
  }

  double(){
    const {currentBet, moneyTotal} = this.state
    this.setState({
      dealerFlag: true,
      currentBet: 2*currentBet,
      moneyTotal: moneyTotal-currentBet
    })
    this.hit(1, "player")
  }

  surrender(){
    const {currentBet, moneyTotal} = this.state
    this.setState({
        playerCards: [],
        dealerCards: [],
        currentBet: 0,
        roundStart: true,
        playerTotal: 0,
        dealerTotal: 0,
        moneyTotal: moneyTotal+(Math.floor(currentBet/2))
      })
  }
  correctForAces(cards){
    let newTotal = 0
    for (var i=0; i<cards.length; i++){
      if(cards[i].card === "A" && cards[i].power===11){
        cards[i].power = 1
        break
      }
    }
    for(var j=0; j<cards.length; j++){
      newTotal += cards[j].power
  }
  return newTotal
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
    const {playerCards, moneyTotal, roundStart, currentBet, dealerCards, roundEnd, endMsg} = this.state
    const moneyFormatted = moneyTotal.toLocaleString()
    let cantDouble = false
    if(2*currentBet> moneyTotal){
      cantDouble = true
    }
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
              <button className="btn btn-primary" onClick={() => this.hit(1, "player")} disabled={roundStart || roundEnd} >Hit</button>
              <button className="btn btn-primary" onClick={() => this.stay()} disabled={roundStart || roundEnd}>Stay</button>
              <button className="btn btn-primary" onClick={() => this.double()} disabled={roundStart || cantDouble|| roundEnd}>Double</button>
              <button className="btn btn-primary" onClick={() => this.surrender()} disabled={roundStart || roundEnd}>Surrender</button>
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
             {roundEnd ? (<div className="rndEnd">
                           <h3>{endMsg}</h3>
                           <button className="btn btn-primary rnd-btn" onClick={() => this.resetBoard()}>Next Round</button>
                         </div>) : null }
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
