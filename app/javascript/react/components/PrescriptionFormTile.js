import React from 'react'
import BackButton from './BackButton'
import * as Datetime from 'react-datetime'

const PrescriptionFormTile = (props) => {
  return(
    <div>
      <h3>New Prescription Form</h3>
      <form onSubmit={props.handleSubmit}>
        <label>Medication Name:
          <input type='text' value={props.name} onChange={props.changeName} />
        </label>

        <label>Medication Dosage:
          <input type='text' value={props.dosage} onChange={props.changeDosage} />
        </label>

        <div className='row'>
          <label className='small-4 large-4 columns'>Date:
            <div>
              <Datetime
                timeFormat={false}
                onChange={props.changeDate}
                defaultValue={props.defaultTime}
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
            <select onChange={props.changeRule}>
              <option value='singular'>singular</option>
              <option value='daily'>daily</option>
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

        <label>(Optional) Enter Notes:
          <textarea value={props.notes} onChange={props.changeNotes} />
        </label>

        <button className='button tiny' type='submit'>Submit</button>
        <BackButton />
      </form>
    </div>
  )
}

export default PrescriptionFormTile
