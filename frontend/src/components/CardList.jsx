import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { EditTaskModal } from './EditTaskModal';
import { Link } from 'react-router-dom';
import { Select } from './Select';

export const CardList = ({ onDelete }) => {
  const [tasks, setTasks] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);

  // Fetch tasks from the backend
  useEffect(() => {
    setIsLoading(true);
    axios.get('http://localhost:8080/task')
      .then(response => {
        setTasks(Array.isArray(response.data) ? response.data : []);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching tasks:', error);
        setError(error);
        setTasks([]);
        setIsLoading(false);
      });
  }, []);

  // Handle double click to delete a task
  const handleDoubleClick = (taskId) => {
    axios.delete(`http://localhost:8080/task/${taskId}`)
      .then(() => {
        setTasks(prevTasks =>
          prevTasks ? prevTasks.filter(task => task.id !== taskId) : []
        );
        if (onDelete) {
          onDelete(taskId);
        }
      })
      .catch(error => console.error('Error deleting task:', error));
  };

  // Handle edit task
  const handleEditTask = (task) => {
    setSelectedTask(task);
  };

  // Handle task update
  const handleTaskUpdated = (updatedTask) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === updatedTask.id ? updatedTask : task
      )
    );
    setSelectedTask(null);
  };

  // Handle toggle status
  const handleToggleStatus = async (taskId, event) => {
    // Mencegah event bawaan dan navigasi
    event.preventDefault();
    event.stopPropagation();

    try {
      const response = await axios.patch(`http://localhost:8080/task/${taskId}/status`);

      // Update list dengan status baru
      setTasks(prevTasks =>
        prevTasks.map(task =>
          task.id === taskId
            ? { ...task, status: response.data.status }
            : task
        )
      );
    } catch (error) {
      console.error('Error toggling status', error);
    }
  };

  // Handle edit icon click
  const handleEditClick = (task, event) => {
    // Mencegah event bawaan dan navigasi
    event.preventDefault();
    event.stopPropagation();
    setSelectedTask(task);
  };

  // Kondisi loading
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <h1 className="text-2xl font-bold text-gray-500">Memuat Tasks...</h1>
      </div>
    );
  }

  // Kondisi error
  if (error) {
    return (
      <div className="flex justify-center items-center h-full">
        <h1 className="text-2xl font-bold text-red-500">
          Gagal memuat tasks. Silakan coba lagi.
        </h1>
      </div>
    );
  }

  // Kondisi tidak ada task
  if (!tasks || tasks.length === 0) {
    return (
      <div className="flex justify-center items-center h-full">
        <h1 className="text-base font-bold text-gray-500">Add your task</h1>
      </div>
    );
  }

  const handleSelectClick = (e) => {
    // Mencegah link dari berpindah halaman
    e.preventDefault();
    e.stopPropagation();
  };

  // Render tasks
  return (
    <>
      <div>
        {tasks.map((task) => (
          <Link
            to={`/detail/${task.id}`}
            key={task.id}
            href="#"
            onDoubleClick={() => handleDoubleClick(task.id)}
            className="relative block overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8 bg-ashGray1 font-poppins mb-4 shadow-sm"
          >
            <span
              className="absolute inset-x-0 bottom-0 h-2 "
            ></span>

            <div className="flex justify-between sm:gap-4">
              <h3 className="text-lg font-semibold text-hitam sm:text-xl max-w-[18rem]">
                {task.name_task}
              </h3>
              <svg
                onClick={(e) => handleEditClick(task, e)}
                width={24}
                height={24}
                className="cursor-pointer"
                viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                  <path d="M20.1497 7.93997L8.27971 19.81C7.21971 20.88 4.04971 21.3699 3.27971 20.6599C2.50971 19.9499 3.06969 16.78 4.12969 15.71L15.9997 3.84C16.5478 3.31801 17.2783 3.03097 18.0351 3.04019C18.7919 3.04942 19.5151 3.35418 20.0503 3.88938C20.5855 4.42457 20.8903 5.14781 20.8995 5.90463C20.9088 6.66146 20.6217 7.39189 20.0997 7.93997H20.1497Z" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                  <path d="M21 21H12" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                </g>
              </svg>
            </div>

            <div className="mt-4 flex gap-4 sm:gap-6 w-full justify-between">
              <div className="flex space-x-1">
                <h2 className="text-sm font-medium text-gray-600">{task.from_time}</h2>
                <h2> - </h2>
                <h2 className="text-sm font-medium text-gray-600">{task.to_time}</h2>
              </div>

              <div className="flex flex-col-reverse" onClick={handleSelectClick}>
                <Select
                  onValueChange={(value) => {
                    // Handle select value change
                    console.log(value);
                  }}
                />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Modal Edit Task */}
      {selectedTask && (
        <EditTaskModal
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          onTaskUpdated={handleTaskUpdated}
        />
      )}
    </>
  );
};