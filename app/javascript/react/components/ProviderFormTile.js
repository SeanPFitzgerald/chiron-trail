import React from 'react'

const ProviderFormTile = (props) => {
  return(
    <div>
      <h2>New Provider Form</h2>
      <form onSubmit={props.handleSubmit}>
        <label>Enter Provider Name:
          <input type='text' value={props.name} onChange={props.changeName} />
        </label>

        <label>Enter Provider Type:
          <input type='text' value={props.type} onChange={props.changeType} />
        </label>

        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default ProviderFormTile
