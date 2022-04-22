import React from 'react'
import Field from './Field'
const BoardForm = () => {
  return (
    <div className='w-1/3 space-y-8 p-5'>
      <Field
     fieldType="text"
     fieldId="Board title"
     title="Board title"
     />
     <div class="inline-block relative w-64">
         <select class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                <option>Really long option that will likely overlap the chevron</option>
                <option>Option 2</option>
                <option>Option 3</option>
        </select>
  </div>
    </div>
  )
}

export default BoardForm
