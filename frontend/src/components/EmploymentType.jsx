import React from 'react'
import InputField from './InputField'

const EmploymentType = ({handleChange}) => {
  return (
<div>
      <h4 className="text-lg font-medium mb-2">Location</h4>
      <div>
       
        <InputField
          handleChange={handleChange}
          value="Full-time"
          title="Full Time"
          name="test"
        />
        <InputField
          handleChange={handleChange}
          value="temporay"
          title="Temporay"
          name="test"
        />
        <InputField
          handleChange={handleChange}
          value="Part-time"
          title="Part Time"
          name="test"
        />
       
      </div>
    </div>  )
}

export default EmploymentType