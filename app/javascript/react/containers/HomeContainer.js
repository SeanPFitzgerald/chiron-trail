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
      <div className='row'>
        <h3>Hello, {this.props.currentUserName}!</h3>
        <div className='group'>
        <Link to='/providers/new' className='homeButtons'><button>Providers</button></Link>
        <Link to='/prescriptions/new' className='homeButtons'><button>Prescriptions</button></Link>
        <Link to='/appointments/new' className='homeButtons'><button>Appointments</button></Link>
        <Link to='/wellness_checks/new' className='homeButtons'><button>Enter New Wellness Check</button></Link>
      </div>
      </div>
    )
  }
}

export default HomeContainer
