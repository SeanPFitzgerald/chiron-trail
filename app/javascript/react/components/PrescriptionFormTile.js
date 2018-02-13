import React from 'react'
import { Link } from 'react-router'

const PrescriptionFormTile = (props) => {
  return(
    <div>
      <h3>New Prescription Form</h3>
      <form onSubmit={props.handleSubmit}>
        <label>Enter Medication Name:
          <input type='text' value={props.name} onChange={props.changeName} />
        </label>

        <label>Enter Medication Dosage:
          <input type='text' value={props.dosage} onChange={props.changeDosage} />
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

export default PrescriptionFormTile
