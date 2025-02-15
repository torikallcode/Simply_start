import React from 'react'

export const InputSearch = ({ className }) => {
  return (
    <div className={`flex items-center gap-5 w-full border border-gray-200 rounded-lg py-3 px-5 bg-ashGray1 ${className}`}>
      <span className="flex-shrink-0 text-gray-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </span>
      <input
        type="text"
        className="w-full outline-none bg-transparent"
        placeholder="Search your task..."
      />
    </div>
  )
}
