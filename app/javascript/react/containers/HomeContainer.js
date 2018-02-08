import React, { Component } from 'react'
import { Link } from 'react-router'

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
        <Link to="/treatments/new"><button>Enter Treatment</button></Link>
      </div>
    )
  }
}

export default HomeContainer
