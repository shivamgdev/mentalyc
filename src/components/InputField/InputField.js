import React from 'react'

function InputField({type, id, name, value, onChange, placeholder, required, defaultChecked}) {
  return (
    <>
        <input 
            type={type} 
            name={name} 
            id={id} 
            value={value} 
            onChange={onChange} 
            placeholder={placeholder}
            required={required}
            defaultChecked={defaultChecked}
        />
    </>
  )
}

export default InputField