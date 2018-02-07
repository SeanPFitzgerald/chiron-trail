import React, { Component } from 'react'

class HomeContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    return(
      <div>
        <h3>Hello, {this.props.currentUserName}!</h3>
      </div>
    )
  }
}

export default HomeContainer
