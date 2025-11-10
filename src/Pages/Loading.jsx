import React, { Component } from "react";

class Loading extends Component {
  render() {
    return (
      <div className="flex justify-center"> 
        <span className="loading loading-spinner text-success"></span>
      </div>
    );
  }
}

export default Loading;
