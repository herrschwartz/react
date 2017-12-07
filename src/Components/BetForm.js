import React, { Component } from 'react';

class BetForm extends Component{
state = {
  error: false,
  errToMuch: false,
  betAmt: 0,
}
placeBet(e){
  if(this.refs.bet.value < 5) {
    this.setState({
      error: true
    })
  } else if (this.refs.bet.value > this.props.monTotal) {
    this.setState({
      errToMuch: true
    })
  } else {
    this.setState({
      error: false,
      errToMuch: false,
      betAmt: this.refs.bet.value
    },
    function(){
      this.props.betAmt(this.state.betAmt)
    }
  )
  }
  e.preventDefault();
}
  render(){
    let errMsg = ""
    if(this.state.error === true){
      errMsg = "Bet must be $5 or more"
    }
    if(this.state.errToMuch === true){
      errMsg = "Bet excedes funds"
    }
    return(
    <div className="betForm">
      <h3>place your bet please</h3>
      <form onSubmit={this.placeBet.bind(this)}>
        <input type="number" ref="bet" className="form-control"/>
        <input type="submit" value="Place Bet" className="form-conrol btn btn-success"/>
        <div className="red"><strong>{errMsg}</strong></div>
      </form>
    </div>
  );
  }
}

export default BetForm;
