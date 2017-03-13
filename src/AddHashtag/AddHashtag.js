import React, { Component } from 'react';

class AddHashtag extends Component {
  addHashTag(e) {
    e.preventDefault();
    this.props.addHashTag(this.refs.hashtag.value);
    this.refs.hashtag.value = '';
  }
  render() {
    return (
      <form className="input-container"
            onSubmit={this.addHashTag.bind(this)}
      >
        <input type="text" 
               className="wide"
               placeholder="add a hashtag"
               ref="hashtag"
               required
        />
      </form>
    );
  }
}

export default AddHashtag;