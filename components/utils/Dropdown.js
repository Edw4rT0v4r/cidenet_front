import React from 'react'
import FormGroup from 'react-bootstrap/FormGroup'
import FormLabel from 'react-bootstrap/FormLabel'

const Dropdown = ({ options, value, title, name, onChange }) => {
  console.log(value, name)
  return (
    <FormGroup className='mb-3' id={name}>
      <FormLabel>{title}</FormLabel>
      <br />
      <select value={value} name={name} onChange={onChange} className={'form-select'}>
        <option value={''}>Select {title}</option>
        {options.map(option => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
    </FormGroup>
  )
}

export default Dropdown