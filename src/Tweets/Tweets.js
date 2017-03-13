import React, { Component } from 'react';

class Tweets extends Component {
  deleteHashTag(e) {
    this.props.deleteHashTag(this.props.hashtag);
  }

  render() {
    let data = this.props.tweets.data.statuses.slice(0, 5);
    let hashtag = this.props.hashtag;
    let tweets = data.map((tweet, index) => {
      return (
        <div className="tweet" key={index}>
            <span className="username">{tweet.user.name}</span> 
            <span>&nbsp;</span>
            <span className="user-handle">@{tweet.user.screen_name}</span>
          <p>{tweet.text}</p>
        </div>
      )
    });
    return (
      <div className="tweet-container">
        <div className="hashtag-holder">
          <h2> #{hashtag} 
          <span className="item-delete"
                onClick={this.deleteHashTag.bind(this)}
                value={hashtag}> x
          </span></h2>
        </div>

        <div className="tweet-holder">
            {tweets}
        </div>
      </div>
    );
  }
}

export default Tweets;