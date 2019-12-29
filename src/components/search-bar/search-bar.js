import React, { Component } from 'react';
import './search-bar.css';

export default class SearchBar extends Component {

  handleKeyUp = async(e) => {
    if(e.key === "Enter"){
      this.props.onSubmit({ name: e.target.value });
    }
  }

  render() {
    return (
      <div className="SearchBar">
        <label htmlFor="hero-name">Nome do Personagem</label>
        <input type="text" name="hero-name"onKeyUp={this.handleKeyUp} />
      </div>
    );
  }
}
