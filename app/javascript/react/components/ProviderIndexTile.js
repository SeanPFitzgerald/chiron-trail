import React from 'react'

const ProviderIndexTile = (props) => {
  return(
    <li>
      <strong>Name:</strong> {props.name}
      <ol>
        <strong>Type:</strong> {props.providerType}
      </ol><br />
    </li>
  )
}

export default ProviderIndexTile
