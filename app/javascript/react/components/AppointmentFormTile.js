import React from 'react'
import DayPickerInput from 'react-day-picker/DayPickerInput'

const AppointmentFormTile = (props) => {
  return(
    <div>
      <h2>New Appointment Form</h2>
      <form onSubmit={props.handleSubmit}>
        <label>Enter Appointment Name:
          <input type='text' value={props.name} onChange={props.changeName} />
        </label>

        <label>Enter Provider:
          <select>
            {props.providers.map((provider, index) => <option key={index} value={provider.id}>{provider.name}</option>)}
          </select>
        </label>

        <label>Date:
          <div>
            <DayPickerInput
              onDayChange={props.handleDayChange}
              value={props.selectedDay}
            />
          </div>
        </label>

        <label>(Optional) Enter Notes:
          <textarea value={props.notes} onChange={props.changeNotes} />
        </label>

        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default AppointmentFormTile
