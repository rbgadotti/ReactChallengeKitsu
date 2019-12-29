import React, { Component } from 'react';
import './detail.css';
import api from '../../services/api';

export default class Detail extends Component {

  state = {
    data: null
  }

  componentDidMount() {
    this.loadData();
  }

  async loadData(){
    const { id } = this.props.match.params;
    const response = await api.get(`/characters/${id}`, {
      params: {
        include: "mediaCharacters.media"
      }
    });
    this.setState({data: response.data});
  }

  render() {
    return ( !this.state.data ? null :
      <div className="PageDetail">
        <img
          className="character-profile-image"
          src={this.state.data.data.attributes.image ? this.state.data.data.attributes.image.original : "https://via.placeholder.com/225x350"}
          alt={this.state.data.data.attributes.names.en}
        />
        <div className="character-data">
          <h2 className="character-name">{this.state.data.data.attributes.names.en}</h2>
          <div className="character-description" dangerouslySetInnerHTML={{__html: this.state.data.data.attributes.description}}></div>
          <div className="character-gallery">
            {this.state.data.included
            .filter(data => data.type !== "mediaCharacters")
            .map(data => (
              <div className="media" key={data.id}>
                <img src={data.attributes.posterImage.small} alt={data.attributes.canonicalTitle} />
                <span className="media-title">{data.attributes.canonicalTitle}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
