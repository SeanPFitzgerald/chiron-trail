import React from 'react'
import Checkbox from './Checkbox'
import * as Datetime from 'react-datetime'
import BackButton from './BackButton'

const AppointmentFormTile = (props) => {
  return(
    <div>
      <h3>New Appointment Form</h3>
      <form onSubmit={props.handleSubmit}>
        <label>Description:
          <input type='text' value={props.name} onChange={props.changeName} />
        </label>

        <label>Provider:
          <select onChange={props.changeProvider}>
            {props.providers.map((provider, index) => <option key={index} value={provider.id}>{provider.name}</option>)}
          </select>
        </label>

        <div className='row'>
          <label className='small-4 large-4 columns'>Start Date:
            <div>
              <Datetime
                timeFormat={false}
                onChange={props.changeDate}
                defaultValue={props.selectedDate}
                value={props.selectedDate}
              />
            </div>
          </label>

          <label className='small-4 large-4 columns'>Time:
            <div>
              <Datetime
                dateFormat={false}
                onChange={props.changeTime}
                defaultValue={props.defaultTime}
              />
            </div>
          </label>

          <label className='small-4 large-4 columns'>Rule:
            <select onChange={props.changeRule} value={props.defaultRule}>
              <option value='' disabled></option>
              <option value='singular'>singular</option>
              <option value='daily'>daily</option>
              <option value='custom'>weekly (custom)</option>
              <option value='weekly'>weekly</option>
              <option value='monthly'>monthly</option>
            </select>
          </label>
        </div>

        <label>Days of the Week:
          <div className='days'>
            <ul className='pagination'>
              {props.daysCheckboxes}
            </ul>
          </div>
        </label>

        <label>(Optional) Notes:
          <textarea value={props.notes} onChange={props.changeNotes} />
        </label>

        <button className='button tiny' type='submit'>Submit</button>
        <BackButton />
      </form>
    </div>
  )
}

export default AppointmentFormTile
