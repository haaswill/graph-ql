import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import gql from 'graphql-tag';

import query from '../queries/fetchSongs';

class SongList extends Component {
  onSongDelete(id) {
    this.props.mutate({ variables: { id } })
      // data is added by react apollo
      //
      // not using refetchQueries because SongList is binded to the query
      .then(() => this.props.data.refetch());
  }

  renderSongs() {
    return this.props.data.songs.map(({ id, title }) => (
      <li key={id} className="collection-item">
        <Link to={`/songs/${id}`}>{title}</Link>
        <i className="material-icons" onClick={() => this.onSongDelete(id)}>
          delete
        </i>
      </li>
    ));
  }

  render() {
    if (this.props.data.loading) return <div>Loading...</div>;
    return (
      <div>
      <ul className="collection">
        {this.renderSongs()}
      </ul>
        <Link
          to="/songs/new"
          className="btn-floating btn-large red right"
        >
          <i className="material-icons">add</i>
        </Link>
      </div>
    );
  }
}

const mutation = gql`
  mutation DeleteSong($id: ID) {
    deleteSong(id: $id) {
      id
    }
  }
`;

// We must call graphql twice because graphql cannot deal with multiple mutations
export default graphql(mutation)(
  graphql(query)(SongList)
);