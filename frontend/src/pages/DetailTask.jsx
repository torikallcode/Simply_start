import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

export const DetailTask = () => {

  const { id } = useParams();
  const [task, setTask] = useState(null)

  useEffect(() => {
    axios.get(`http://localhost:8080/task/${id}`)
      .then(response => setTask(response.data))
      .catch(error => console.log(error))
  }, [id])

  if (!task) {
    return <div>Loading...</div>
  }

  return (
    <div className='flex flex-col font-poppins px-3 py-5 bg-ashGray1'>
      <div className='flex justify-between mb-3 px-4'>
        <div>
          <h2 className='text-base text-gray-500'>{task.from_time} - {task.to_time}</h2>
          <h1 className='text-3xl font-bold'>{task.name_task}</h1>
        </div>
        <Link to={`/`} replace={true} className="inline-flex items-center justify-center px-4 py-2 font-sans font-semibold tracking-wide text-white bg-ashGray2 rounded-lg h-fit">
          Back
        </Link>
      </div>
      <div className='bg-putih p-5 min-h-screen rounded-xl shadow-sm'>
        <p>{task.content}</p>
      </div>
    </div>
  )
}
