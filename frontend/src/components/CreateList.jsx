export const CreateList = ({ onClose }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your submit logic here
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
            { id: 'title', label: 'Title', placeholder: 'Enter task title...' },
            { id: 'from', label: 'From', placeholder: 'From time' },
            { id: 'to', label: 'To', placeholder: 'To time' },
          ].map(({ id, label, placeholder }) => (
            <div key={id} className="flex flex-col items-start mb-5 gap-y-1">
              <label
                htmlFor={id}
                className="text-sm font-medium cursor-pointer text-hitam"
              >
                {label}
              </label>
              <input
                id={id}
                type="text"
                className="w-full p-4 bg-ashGray1 border border-gray-200 rounded-lg outline-none text-sm"
                placeholder={placeholder}
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
