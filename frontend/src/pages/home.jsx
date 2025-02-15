import { CardList } from "../components/CardList"
import { Header } from "../components/Header"
import { InputSearch } from "../components/InputSearch"

export const Home = () => {
  return (
    <div className="p-3">
      <div className="mb-5">
        <Header />
      </div>
      <div className="flex flex-col justify-center py-3 max-w-sm mx-auto">
        <InputSearch
          className={"mb-11"}
        />
        <button
          className="bg-ashGray1 border border-gray-200 rounded-lg py-1 text-hitam px-5 font-poppins text-center text-3xl mb-3">+</button>
        <CardList />
      </div>
    </div>
  )
}