import React from 'react'
import { Link } from 'react-router'

const ProviderFormTile = (props) => {
  return(
    <div>
      <h3>New Provider Form</h3>
      <form onSubmit={props.handleSubmit}>
        <label>Enter Provider Name:
          <input type='text' value={props.name} onChange={props.changeName} />
        </label>

        <label>Enter Provider Type:
          <input type='text' value={props.type} onChange={props.changeType} />
        </label>

        <button type='submit'>Submit</button>
        <Link to='/'><button type='button' className='backButton'>Back</button></Link>
      </form>
    </div>
  )
}

export default ProviderFormTile
