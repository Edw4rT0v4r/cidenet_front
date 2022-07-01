import React from 'react'
import FormGroup from 'react-bootstrap/FormGroup'
import FormLabel from 'react-bootstrap/FormLabel'
import FormControl from 'react-bootstrap/FormControl'

const Input = ({ element, value, title, onChange, type = 'text', maxlength = 20 }) => {
  return (
    <FormGroup className='mb-3'>
      <FormLabel>{title}</FormLabel>
      <br />
      <FormControl
        maxLength={maxlength}
        type={type}
        name={element}
        value={value}
        onChange={onChange}
        autoComplete='off' />
    </FormGroup>
  )
}

export default Input