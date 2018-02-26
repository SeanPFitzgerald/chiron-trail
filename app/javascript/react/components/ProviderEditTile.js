import React from 'react'

const ProviderEditTile = (props) => {
  return(
    <div id='providerEditTile'>
      <hr />
      <div>
        <h5>Edit Provider:</h5>
        <form onSubmit={props.handleUpdate}>
          <div className='row'>
            <label className='small-6 large-6 columns'>Name:
              <input type='text' value={props.name} onChange={props.changeName} />
            </label>

            <label className='small-6 large-6 columns'>Type:
              <input type='text' value={props.providerType} onChange={props.changeType}/>
            </label>

          </div>
          <div className='row'>
            <label className='small-2 large-2 columns'>
              <button className='button tiny' value={props.providerId} type='submit'>Update</button>
            </label>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ProviderEditTile
