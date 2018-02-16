import React from 'react';
import { browserHistory } from 'react-router'

const BackButton = () => {
  return(
    <div className='floatRight'>
      <button className='button tiny' onClick={browserHistory.goBack}>Back</button>
    </div>
  )
}

export default BackButton
