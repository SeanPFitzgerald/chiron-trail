import React from 'react'

const AppointmentIndexTile = (props) => {
  return(
    <div>
      <li>
        <strong>Description:</strong> {props.appointmentName}
        <span className='floatRight'>
          <strong>Provider:</strong> {props.providerName}
        </span>
        <ol>
          Start Date: {props.date}<br />
          Time: {props.time}<br />
          Notes: {props.notes}<br />
        </ol>
      </li><br />
    </div>
  )
}

export default AppointmentIndexTile
