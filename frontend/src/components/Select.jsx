import React, { useState } from 'react'

export const Select = () => {
  const [selectedStatus, setSelectedStatus] = useState('P')

  return (
    <div className='font-poppins'>
      <select
        name="HeadlineAct"
        id="HeadlineAct"
        value={selectedStatus}
        onChange={(e) => setSelectedStatus(e.target.value)}
        className="mt-1.5 w-full rounded-lg border-gray-300 sm:text-sm custom-select font-medium"
        style={{
          color:
            selectedStatus === 'P' ? 'orange' :
              selectedStatus === 'OP' ? 'blue' :
                selectedStatus === 'C' ? 'green' : 'black'
        }}
      >
        <option value="P" className="text-orange-500 text-sm">Pending</option>
        <option value="OP" className="text-blue-500 text-sm">On Progress</option>
        <option value="C" className="text-green-500 text-sm">Complete</option>
      </select>
    </div>
  )
}