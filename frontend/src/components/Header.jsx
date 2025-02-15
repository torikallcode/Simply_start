export const Header = () => {
  return (
    <header className="flex justify-between">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold">Hey, Name</h1>
        <div className="flex justify-between">
          <h2 className="text-sm font-medium text-gray-500">21 sep 2022</h2>
          <h2 className="text-sm font-medium text-gray-500">12:00 pm</h2>
        </div>
      </div>
      <div className="bg-sky-500 aspect-[1/1] w-11 h-fit rounded-full flex justify-center items-center">
        profil
      </div>
    </header>
  )
}