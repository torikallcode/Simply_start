import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { EditTaskModal } from './EditTaskModal';

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
  const handleToggleStatus = async (taskId) => {
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
      // Optional: Tambahkan toast atau notifikasi error
    }
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

  // Render tasks
  return (
    <>
      <div>
        {tasks.map((task) => (
          <a
            key={task.id}
            href="#"
            onDoubleClick={() => handleDoubleClick(task.id)}
            className="relative block overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8 bg-ashGray1 font-poppins mb-4"
          >
            <span
              className="absolute inset-x-0 bottom-0 h-2 bg-emerald-500/50"
            ></span>

            <div className="flex justify-between sm:gap-4">
              <h3 className="text-lg font-semibold text-hitam sm:text-xl max-w-[18rem]">
                {task.name_task}
              </h3>
              <svg
                onClick={() => handleEditTask(task)}
                viewBox="0 0 24 24"
                width={24}
                height={24}
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="cursor-pointer"
              >
                {/* SVG path content */}
              </svg>
            </div>

            <div className="mt-4 flex gap-4 sm:gap-6 w-full justify-between">
              <div className="flex space-x-1">
                <h2 className="text-sm font-medium text-gray-600">{task.from_time}</h2>
                <h2> - </h2>
                <h2 className="text-sm font-medium text-gray-600">{task.to_time}</h2>
              </div>

              <div className="flex flex-col-reverse">
                <label className="cursor-pointer">
                  <input
                    type="checkbox"
                    checked={task.status}
                    onChange={() => handleToggleStatus(task.id)}
                    className="form-checkbox h-5 w-5 text-green-500"
                  />
                </label>
              </div>
            </div>
          </a>
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