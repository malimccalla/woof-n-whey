import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
  state = {
    token: null,
    user: null,
  };

  componentDidMount() {
    let hashParams = {};
    let e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    while ((e = r.exec(q))) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }

    if (!hashParams.access_token) {
      window.location.href =
        'https://accounts.spotify.com/authorize?client_id=e90e285754b6455c9adc392d9c7f2a94&scope=playlist-read-private%20playlist-read-collaborative%20playlist-modify-public%20user-read-recently-played%20playlist-modify-private%20ugc-image-upload%20user-follow-modify%20user-follow-read%20user-library-read%20user-library-modify%20user-read-private%20user-read-email%20user-top-read%20user-read-playback-state&response_type=token&redirect_uri=http://localhost:3000/callback';
    }

    // if (!this.state.token) {
    //   window.location.href =
    //     'https://accounts.spotify.com/authorize?client_id=e90e285754b6455c9adc392d9c7f2a94&scope=playlist-read-private%20playlist-read-collaborative%20playlist-modify-public%20user-read-recently-played%20playlist-modify-private%20ugc-image-upload%20user-follow-modify%20user-follow-read%20user-library-read%20user-library-modify%20user-read-private%20user-read-email%20user-top-read%20user-read-playback-state&response_type=token&redirect_uri=http://localhost:3000/callback';
    // }
  }

  getCurrentUser = async () => {
    // Redirect user to authorize woof n whey if app token does not exist
    let hashParams = {};
    let e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    while ((e = r.exec(q))) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }

    this.setState(() => ({ token: hashParams.access_token }));

    try {
      const res = await axios.get(`https://api.spotify.com/v1/me`, {
        headers: {
          Authorization: 'Bearer ' + hashParams.access_token,
        },
      });
      this.setState(() => ({ user: res.data }));
    } catch (error) {
      console.log('ERROR:', error);
    }
  };

  render() {
    const { user } = this.state;

    if (!user) {
      return (
        <div className="App">
          <h1>Woof'n'Whey</h1>
          <button className="button" onClick={this.getCurrentUser}>
            Start
          </button>
        </div>
      );
    }

    console.log('====================================');
    console.log(user);
    console.log('====================================');

    return (
      <div className="App">
        <main className="container">
          <h1>Woof'n'Whey</h1>
          <img className="avatar" src={user.images[0].url} />
          <h2>
            We know everything about you {user.display_name} but how well do you
            know your own taste in music?
          </h2>
          <div className="button-options">
            <button className="button">Very well thanks</button>
            <button className="button">Second guessing</button>
          </div>
        </main>
      </div>
    );
  }
}

export default App;