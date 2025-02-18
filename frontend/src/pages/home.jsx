import { CardList } from "../components/CardList"
import { CreateList } from "../components/CreateList"
import { Header } from "../components/Header"
import { InputSearch } from "../components/InputSearch"
import { useState } from "react"

export const Home = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="p-3">
      <div className="mb-5 max-w-sm mx-auto">
        <Header />
      </div>
      <div className="flex flex-col justify-center py-3 max-w-sm mx-auto">
        <InputSearch
          className={"mb-11"}
        />
        <button
          className="bg-ashGray1 border border-gray-200 cursor-pointer rounded-lg py-1 text-hitam px-5 font-poppins text-center text-3xl mb-3"
          onClick={handleOpenModal}>+
        </button>
        {isModalOpen && (
          <div className="modal-overlay" onClick={handleCloseModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <CreateList onClose={handleCloseModal} />
            </div>
          </div>
        )}
        <CardList />
      </div>
    </div>
  )
}