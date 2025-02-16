import React, { useState } from 'react';

export const CreateList = ({ onClose }) => {
  const [taskData, setTaskData] = useState({
    title: '',
    from: '',
    to: '',
    note: ''
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setTaskData(prevData => ({
      ...prevData,
      [id]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validasi waktu
    if (taskData.from && taskData.to) {
      const fromTime = new Date(`2023-01-01T${taskData.from}`);
      const toTime = new Date(`2023-01-01T${taskData.to}`);

      if (fromTime >= toTime) {
        alert('Waktu "From" harus lebih awal dari waktu "To"');
        return;
      }
    }

    // Lakukan sesuatu dengan data tugas
    console.log('Task Data:', taskData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-hitam/30 backdrop-blur-xs flex justify-center items-center z-50 transition-all ease-in-out duration-300">
      <div
        className="w-full max-w-[23rem] p-5 bg-white rounded-lg shadow font-poppins relative transition-all ease-in-out duration-300"
        aria-label="signup-form"
      >
        <h1
          className='absolute top-5 right-5 cursor-pointer text-xl font-bold'
          onClick={onClose}
        >
          ✕
        </h1>
        <form
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <h2 className="mb-10 text-2xl font-bold text-center text-hitam">Create your task</h2>

          {[
            {
              id: 'title',
              label: 'Title',
              placeholder: 'Enter task title...',
              type: 'text'
            },
            {
              id: 'from',
              label: 'From',
              placeholder: 'Select start time',
              type: 'time'
            },
            {
              id: 'to',
              label: 'To',
              placeholder: 'Select end time',
              type: 'time'
            },
          ].map(({ id, label, placeholder, type }) => (
            <div key={id} className="flex flex-col items-start mb-5 gap-y-1">
              <label
                htmlFor={id}
                className="text-sm font-medium cursor-pointer text-hitam"
              >
                {label}
              </label>
              <input
                id={id}
                type={type}
                value={taskData[id]}
                onChange={handleInputChange}
                className="w-full p-4 bg-ashGray1 border border-gray-200 rounded-lg outline-none text-sm"
                placeholder={placeholder}
                required={id === 'title'}
              />
            </div>
          ))}

          <div className="mb-5">
            <label
              htmlFor="note"
              className="text-sm font-medium cursor-pointer text-hitam"
            >
              Note (optional)
            </label>
            <textarea
              id="note"
              value={taskData.note}
              onChange={handleInputChange}
              className="w-full p-4 bg-ashGray1 border border-gray-200 rounded-lg outline-none text-sm"
              placeholder="Note"
            />
          </div>

          <button
            type="submit"
            className="inline-flex w-full items-center justify-center px-8 py-4 font-sans font-semibold tracking-wide text-white bg-ashGray2 rounded-lg h-[60px]"
          >
            Create a Task
          </button>
        </form>
      </div>
    </div>
  );
};