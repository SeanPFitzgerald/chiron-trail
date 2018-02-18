import React from 'react'

const PrescriptionIndexTile = (props) => {
  return(
    <li>
      <strong>Name:</strong> {props.name}<br />
      <strong>Dosage:</strong> {props.dosage}
      <ol>
        Start Date: {props.date.format('ddd, MMM Do YYYY')}<br />
        Time: {props.time.format('h:mm a')}<br />
        Notes: {props.notes}
      </ol>
    </li>
  )
}

export default PrescriptionIndexTile
