import React, { Component } from 'react';
import './header.css';
import { Link } from 'react-router-dom';

export default class Header extends Component {
  render() {
    return (
      <div className="Header">
        <h1 className="main-title">
          <Link to="/"><b>Busca Kitsu</b> teste front-end</Link>
          <span className="line"></span>
        </h1>
        <h2 className="applicants-name">Rafael Gadotti</h2>
      </div>
    );
  }
}
