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
        <Link to='/prescriptions/new'><button>Prescriptions</button></Link>
        <Link to='/providers/new'><button>Providers</button></Link>
        <Link to='/wellness_checks/new'><button>Enter New Wellness Check</button></Link>
      </div>
    )
  }
}

export default HomeContainer
