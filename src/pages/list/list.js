import React, { Component } from 'react';
import './list.css';
import SearchBar from '../../components/search-bar/search-bar';
import Table from '../../components/table/table';

export default class List extends Component {

  state = {
    filter: {}
  };

  searchSubmit = param => {
    this.setState({ filter: param });
  }

  render() {
    return (
      <div className="PageList">
        <SearchBar onSubmit={this.searchSubmit} />
        <Table filter={this.state.filter} />
      </div>
    );
  }
}
