import React from 'react';

const Checkbox = (props) => {
  return (
    <li className={props.className} >
      <a href='#' id={props.id} onClick={props.handleClick}>
        {props.value}
      </a>
    </li>
  )
}

export default Checkbox
