import React, { Component } from 'react';

class Card extends Component{
  render(){
    if(this.props.suit === "♦" || this.props.suit === "♥"){
      return (
        <div className="card red"><span>{this.props.card}{this.props.suit}</span></div>
      )
 }
   else {
     return(
       <div className="card"><span>{this.props.card}{this.props.suit}</span></div>
     )
   }
 }
}

export default Card;
