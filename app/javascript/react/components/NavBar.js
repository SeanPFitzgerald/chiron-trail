import React from 'react'
import { Link } from 'react-router'

const NavBar = (props) => {
  return(
    <div className='row'>
      <div className='button-group'>
        <Link to='/' ><button className='button small'>Home</button></Link>
        <Link to='/providers/new' ><button className='button small'>Providers</button></Link>
        <Link to='/prescriptions/new'><button className='button small'>Prescriptions</button></Link>
        <Link to='/appointments/new' ><button className='button small'>Appointments</button></Link>
        <Link to='/wellness_checks/new' ><button className='button small'>Enter New Wellness Check</button></Link>
      </div>
    </div>
  )
}

export default NavBar
