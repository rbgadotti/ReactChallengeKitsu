import React, { Component } from 'react';
import './table.css';
import qs from 'qs';
import api from '../../services/api';
import { withRouter } from 'react-router-dom';

class Table extends Component {

  state = {
    data: {
      data: [],
      meta: {
        count: 0
      }
    },
    pagination: []
  }

  page = {
    limit: 10,
    offset: 0
  }

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps){
    if(JSON.stringify(prevProps.filter) !== JSON.stringify(this.props.filter)){
      this.goToPage(0);
    }
  }

  async loadData(){
    const response = await api.get('/characters', {
      params: { 
        page: this.page,
        filter: this.props.filter
      },
      paramsSerializer: qs.stringify
    });
    this.setState({ data: response.data });
    this._calculatePagination();
  }

  goFirst(){
    if(this.page.offset === 0){
      return false;
    }
    this.goToPage(0);
  }

  goLast(){
    if(this.page.offset === parseInt(this.state.data.meta.count / this.page.limit ) * this.page.limit){
      return false;
    }
    this.goToPage(parseInt(this.state.data.meta.count / this.page.limit ));
  }

  goToPage(num){
    this.page.offset = num * this.page.limit;
    this.loadData();
  }

  _calculatePagination(){
    const currentPage = this.page.offset === 0 ? 0 : this.page.offset / this.page.limit;
    const lastPage = parseInt(this.state.data.meta.count / this.page.limit );
    let arrNumbers;
    let numPages = 5;

    if (!window.matchMedia("(min-width: 768px)").matches) {
      numPages = 3;
    }

    if(currentPage < parseInt(numPages/2)){
      arrNumbers = [...Array(numPages).keys()];
    }else if((currentPage + parseInt(numPages/2)) > lastPage){
      arrNumbers = [...Array(numPages).keys()].map(num => num + (lastPage-(numPages-1)));
    }else if(currentPage >= parseInt(numPages/2)){
      arrNumbers = [...Array(numPages).keys()].map(num => num + (currentPage-parseInt(numPages/2)));
    }

    this.setState({ pagination: arrNumbers });
  }

  render() {
    return (
      <div className="Table">
        <table>
          <thead>
            <tr>
              <th>Personagem</th>
              <th>Descrição</th>
            </tr>
          </thead>
          <tbody>
            { this.state.data.data.map(row => (
              <tr key={row.id} onClick={() => this.props.history.push(`/detail/${row.id}`)}>
                <td>
                  { row.attributes.image ? (<img className="character-image" src={row.attributes.image.original} alt={row.attributes.canonicalName} />) : null}
                  <span className="character-name">{row.attributes.canonicalName}</span>
                </td>
                <td dangerouslySetInnerHTML={{__html: row.attributes.description}}></td>
              </tr>
            ))}
          </tbody>
        </table>
        <nav className="pagination">
          <a href="#" onClick={e => { e.preventDefault(); this.goFirst() }} className={"first" + (this.page.offset === 0 ? " disabled" : "")}></a>
          {this.state.pagination.map(index => (
            <a href="#" className={"page" + ((parseInt(this.page.offset / this.page.limit) === index) ? " current" : "") } key={index} onClick={e => { e.preventDefault(); this.goToPage(index) }}>{index+1}</a>
          ))}
          <a href="#" onClick={e => { e.preventDefault(); this.goLast() }} className={"last" + (this.page.offset === parseInt(this.state.data.meta.count / this.page.limit ) * this.page.limit ? " disabled" : "")}></a>
        </nav>
      </div>
    );
  }
}

export default withRouter(Table);