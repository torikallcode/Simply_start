import React, { useState } from 'react';
import axios from 'axios';

export const CreateList = ({ onClose, onTaskCreated }) => {
  const [taskData, setTaskData] = useState({
    name_task: '',
    from_time: '',
    to_time: '',
    content: '',
    status: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setTaskData(prevData => ({
      ...prevData,
      [id]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Validasi waktu
    if (taskData.from_time && taskData.to_time) {
      const fromTime = new Date(`2023-01-01T${taskData.from_time}`);
      const toTime = new Date(`2023-01-01T${taskData.to_time}`);

      if (fromTime >= toTime) {
        setError('Waktu "From" harus lebih awal dari waktu "To"');
        return;
      }
    }

    // Validasi input wajib
    if (!taskData.name_task) {
      setError('Judul task harus diisi');
      return;
    }

    try {
      setIsLoading(true);

      const response = await axios.post('http://localhost:8080/task',
        {
          name_task: taskData.name_task,
          from_time: taskData.from_time,
          to_time: taskData.to_time,
          content: taskData.content || '',
          status: false
        },
        {
          headers: {
            'Content-Type': 'application/json'
          },
          timeout: 5000
        }
      );

      // Callback untuk memberi tahu parent komponen
      if (onTaskCreated) {
        onTaskCreated(response.data);
      }

      // Refresh halaman setelah task berhasil dibuat
      window.location.reload();

      // Reset form dan tutup modal
      onClose();
    } catch (err) {
      console.error('Full error object:', err);

      if (err.response) {
        console.error('Error response data:', err.response.data);
        console.error('Error response status:', err.response.status);
        console.error('Error response headers:', err.response.headers);

        setError(
          err.response.data?.message ||
          err.response.data ||
          'Gagal membuat task'
        );
      } else if (err.request) {
        console.error('Error request:', err.request);
        setError('Tidak ada respon dari server');
      } else {
        console.error('Error message:', err.message);
        setError('Gagal mengirim request');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-hitam/30 backdrop-blur-xs flex justify-center items-center z-50 transition-all ease-in-out duration-300">
      <div
        className="w-full max-w-[23rem] p-5 bg-white rounded-lg shadow font-poppins relative transition-all ease-in-out duration-300"
        aria-label="task-form"
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

          {/* Error Message */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          {[
            {
              id: 'name_task',
              label: 'Title',
              placeholder: 'Enter task title...',
              type: 'text'
            },
            {
              id: 'from_time',
              label: 'From',
              placeholder: 'Select start time',
              type: 'time'
            },
            {
              id: 'to_time',
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
                required={id === 'name_task'}
              />
            </div>
          ))}

          <div className="mb-5">
            <label
              htmlFor="content"
              className="text-sm font-medium cursor-pointer text-hitam"
            >
              Content (optional)
            </label>
            <textarea
              id="content"
              value={taskData.content}
              onChange={handleInputChange}
              className="w-full p-4 bg-ashGray1 border border-gray-200 rounded-lg outline-none text-sm"
              placeholder="Additional task details"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`inline-flex w-full items-center justify-center px-8 py-4 font-sans font-semibold tracking-wide text-white rounded-lg h-[60px] ${isLoading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-ashGray2 hover:bg-opacity-90'
              }`}
          >
            {isLoading ? 'Membuat Task...' : 'Create a Task'}
          </button>
        </form>
      </div>
    </div>
  );
};