import React from 'react'
import Checkbox from './Checkbox'
import * as Datetime from 'react-datetime'
import { Link } from 'react-router'

const AppointmentFormTile = (props) => {
  return(
    <div>
      <h3>New Appointment Form</h3>
      <form onSubmit={props.handleSubmit}>
        <label>Enter Description:
          <input type='text' value={props.name} onChange={props.changeName} />
        </label>

        <label>Enter Provider:
          <select onChange={props.changeProvider}>
            {props.providers.map((provider, index) => <option key={index} value={provider.id}>{provider.name}</option>)}
          </select>
        </label>

        <label className='small-6 large-6 columns'>Date:
          <div>
            <Datetime
              timeFormat={false}
              onChange={props.changeDate}
              defaultValue={props.defaultTime}
            />
          </div>
        </label>

        <label className='small-6 large-6 columns'>Time:
          <div>
            <Datetime
              dateFormat={false}
              onChange={props.changeTime}
              defaultValue={props.defaultTime}
            />
          </div>
        </label>

        <label>Rule:
          <select onChange={props.changeRule}>
            <option value='singular'>singular</option>
            <option value='daily'>daily</option>
            <option value='weekly'>weekly</option>
            <option value='monthly'>monthly</option>
          </select>
        </label>

        <label>Days of the Week:
          <ul className='pagination days'>
            {props.daysCheckboxes}
          </ul>
        </label>

        <label>(Optional) Enter Notes:
          <textarea value={props.notes} onChange={props.changeNotes} />
        </label>

        <button type='submit'>Submit</button>
        <Link to='/'><button type='button' className='backButton'>Back</button></Link>
      </form>
    </div>
  )
}

export default AppointmentFormTile
