import React from 'react'

const PrescriptionFormTile = (props) => {
  return(
    <div>
      <h2>New Prescription Form</h2>
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

        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default PrescriptionFormTile
