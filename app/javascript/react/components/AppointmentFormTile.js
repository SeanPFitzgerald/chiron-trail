import React from 'react'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import * as Datetime from 'react-datetime'
import { Link } from 'react-router'

const AppointmentFormTile = (props) => {
  return(
    <div>
      <h3>New Appointment Form</h3>
      <form onSubmit={props.handleSubmit}>
        <label>Enter Appointment Name:
          <input type='text' value={props.name} onChange={props.changeName} />
        </label>

        <label>Enter Provider:
          <select onChange={props.changeProvider}>
            {props.providers.map((provider, index) => <option key={index} value={provider.id}>{provider.name}</option>)}
          </select>
        </label>

        <label>Date:
          <div>
            <Datetime
              timeFormat={false}
              onChange={props.changeDate}
              defaultValue={props.defaultTime}
            />
          </div>
        </label>

        <label>Time:
          <div>
            <Datetime
              dateFormat={false}
              onChange={props.changeTime}
              defaultValue={props.defaultTime}
            />
          </div>
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
