import React from 'react'

const ProviderIndexTile = (props) => {
  return(
    <div>
      <hr />
      <div className='row'>
        <div className='small-10 large-10 columns'>
          <div className='row'>
            <div className='small-2 large-2 columns'>
              <strong className='tile-title right'>Name: </strong>
              <strong className='tile-title right'>Type: </strong>
            </div>
            <div className='small-8 large-8 columns end'>
              <span className='tile-info'>{props.name}</span><br />
              <span className='tile-info'>{props.providerType}</span>
            </div>
          </div>
        </div>
        <div className='small-2 large-2 columns'>
          <button className='button tiny' id={props.id} onClick={props.handleEdit}>Edit</button>
        </div>
      </div>
    </div>
  )
}

export default ProviderIndexTile
