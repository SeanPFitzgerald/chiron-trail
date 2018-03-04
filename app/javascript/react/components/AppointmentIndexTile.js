import React from 'react'

const AppointmentIndexTile = (props) => {
  return(
    <div>
      <hr />
      <div className='row'>
        <div className='small-10 large-10 columns'>
          <div className='row'>
            <div className='small-3 large-3 columns'>
              <strong className='tile-title right'>Description: </strong>
            </div>
            <div className='small-8 large-8 columns left'>
              <span className='tile-info'>{props.appointmentName}</span><br />
            </div>
          </div>
          <div className='row'>
            <div className='small-3 large-3 columns'>
              <strong className='tile-title right'>Provider: </strong>
            </div>
            <div className='small-8 large-8 columns left'>
              <span className='tile-info'>{props.providerName}</span><br />
            </div>
          </div>
          <div className='row'>
            <div className='small-3 large-3 columns'>
              <strong className='tile-title right'>Start Date: </strong>
            </div>
            <div className='small-8 large-8 columns left'>
              <span className='tile-info'>{props.date.format('ddd, MMM Do YYYY')}</span><br />
            </div>
          </div>
          <div className='row'>
            <div className='small-3 large-3 columns'>
              <strong className='tile-title right'>Time: </strong>
            </div>
            <div className='small-8 large-8 columns left'>
              <span className='tile-info'>{props.time.format('h:mm a')}</span><br />
            </div>
          </div>
          <div className='row'>
            <div className='small-3 large-3 columns'>
              <strong className='tile-title right'>Day(s): </strong>
            </div>
            <div className='small-8 large-8 columns left'>
              <span className='tile-info'>{props.days}</span><br />
            </div>
          </div>
          <div className='row'>
            <div className='small-3 large-3 columns'>
              <strong className='tile-title right'>Notes: </strong>
            </div>
            <div className='small-8 large-8 columns left'>
              <span className='tile-info'>{props.notes}</span><br />
            </div>
          </div>
        </div>
        <div className='small-2 large-2 columns'>
          <button className='button tiny' id={props.id} onClick={props.handleEdit}>Edit</button>
        </div>
      </div>
    </div>
  )
}

export default AppointmentIndexTile
