import React, { Component } from 'react';
import './App.css';
import Navbar from './Navbar/Navbar';
import Tweets from './Tweets/Tweets';
import AddHashtag from './AddHashtag/AddHashtag';
import Axios from 'axios';

// will be storing hashtags in local storage to avoid the use of a database.
const myStorage = localStorage;

class App extends Component {
  constructor(props){
    super(props);
    this.state = {tags: []};
    this.addHashTag = this.addHashTag.bind(this);
    this.deleteHashTag = this.deleteHashTag.bind(this);
  }

  componentWillMount() {
    let hashtags = this.getHashtagsFromStore();
    if (typeof hashtags !== "undefined") {
      hashtags.forEach((hashtag) => {
        this.getTweets(hashtag);
      });
    }
  }

  getHashtagsFromStore() {
    if ("hashtags" in myStorage) {
      let hashtags = JSON.parse(myStorage.hashtags);
      if (hashtags.length === 0) {
      return;
      } else {
        return hashtags;
      }
    } else {
      return
    }
  }

  getTweets(hashtag) {
    let data = this.state.tags;
    // since my API is hosted on a different port, have to set up the url to that. if they were on the same port, pathing would work.
    Axios.get('http://localhost:3001/api/tweets?hashtag=' + encodeURIComponent(hashtag))
    .then((response) => {
      let updatedTags = {
        "hashtag": hashtag,
        "tweets": response
      };
      data.push(updatedTags);
      this.setState({tags: data});
    })
    .catch(function (error) {
      console.log(error);
    });

  }

  addHashTag(hashtag) {
    // if the hashtags already exist, then can just simply push into the array
    if ("hashtags" in myStorage) { 
      let hashtags = JSON.parse(myStorage.hashtags);
      if (hashtags.length < 3) {
        hashtags.push(hashtag);
        myStorage.setItem("hashtags", JSON.stringify(hashtags));
        this.getTweets(hashtag);
      } else {
        return;
      }
    } else {
    // otherwise, have to instantiate them in the local storage and THEN add to them
      myStorage.setItem("hashtags", JSON.stringify([]));
      let hashtags = JSON.parse(myStorage.hashtags);
      hashtags.push(hashtag);
      myStorage.setItem("hashtags", JSON.stringify(hashtags));
      this.getTweets(hashtag);
    } 
  }

  deleteHashTag(hashtag) {
    var data = this.state.tags;
    // if returns true, filter item out of the array
    // if false, keep the item in the array
    // basically, return anything from the array that isn't the item selected to be deleted
    var updatedData = data.filter(function(val, index) {
      return hashtag !== val.hashtag;
    });
    var updatedHashtags = JSON.parse(myStorage.hashtags).filter(function(val, index){
      return hashtag !== val;
    });
    this.setState({tags: updatedData});
    myStorage.setItem("hashtags", JSON.stringify(updatedHashtags));
  }

  render() {
    let tweetBoxes;
    let data = this.state.tags;
    if(data.length === 0){
      tweetBoxes = [];
    } else {
      tweetBoxes = data.map((info, index)=>{
        return (<Tweets hashtag={info.hashtag} 
                        tweets={info.tweets} 
                        key={index}  
                        deleteHashTag={this.deleteHashTag} />);
      });
    }

    if (tweetBoxes.length <= 2) {
      return (
        <div className="App">
          <Navbar />
          <div className="container-container">
            {tweetBoxes}
            <AddHashtag addHashTag={this.addHashTag} />
          </div>
        </div>
      );
    } else {
      return (
        <div className="App">
          <Navbar />
          <div className="container-container">
            {tweetBoxes}
           </div>
        </div>
      );
    }
  }  
}

export default App;
