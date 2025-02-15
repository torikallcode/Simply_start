import React from 'react'

export const CardList = () => {
  return (
    <a
      href="#"
      className="relative block overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8 bg-ashGray1 font-poppins"
    >
      <span
        className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-sky-500 via-emerald-300 to-emerald-500"
      ></span>

      <div className="flex justify-between sm:gap-4">
        <h3 className="text-lg font-semibold text-hitam sm:text-xl max-w-[18rem]">
          Building a sass
        </h3>
        <svg viewBox="0 0 24 24" width={24} height={24} fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Edit / Edit_Pencil_Line_02"> <path id="Vector" d="M4 20.0001H20M4 20.0001V16.0001L14.8686 5.13146L14.8704 5.12976C15.2652 4.73488 15.463 4.53709 15.691 4.46301C15.8919 4.39775 16.1082 4.39775 16.3091 4.46301C16.5369 4.53704 16.7345 4.7346 17.1288 5.12892L18.8686 6.86872C19.2646 7.26474 19.4627 7.46284 19.5369 7.69117C19.6022 7.89201 19.6021 8.10835 19.5369 8.3092C19.4628 8.53736 19.265 8.73516 18.8695 9.13061L18.8686 9.13146L8 20.0001L4 20.0001Z" stroke="#0d1333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g> </g></svg>
      </div>


      <div className="mt-4 flex gap-4 sm:gap-6 w-full justify-between">
        <div className="flex flex-col-reverse">
          <h2 className="text-sm font-medium text-gray-600">31st June, 2021</h2>
        </div>

        <div className="flex flex-col-reverse">
          <label className="cursor-pointer">
            <input type="checkbox" name="" id="" className="hidden" />
            <span className="inline-flex items-center justify-center w-7 h- p-1 text-white bg-blue-500 rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </label>
        </div>
      </div>
    </a>
  )
}
