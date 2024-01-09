import React, { useState, MouseEvent, FormEvent } from "react"

interface Props {
  pokemonList: []
}

export const SearchForm: React.FC<Props> = ( pokemonList ) => {

  const [searchTerm, setSearchTerm] = useState<string>()
  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }
  const formSubmit = (e: FormEvent<HTMLFormElement>) => {
    console.log(e)
    e.preventDefault()
  }
  const autofillSearch = (e: MouseEvent<HTMLLIElement>) => {
    e.preventDefault()
    const div = e.target as HTMLLIElement
    setSearchTerm(div.getAttribute('data-name') as string)
  }

  return (
    <div className="mx-auto">
      <form onSubmit={formSubmit}>
        <div className="container mt-2 mb-0 mx-auto w-3/4 flex items-center py-2 px-8 rounded-xl bg-white">
          <input className="capitalize appearance-none bg-transparent border-none w-full text-gray-700 mr-3 p-1 leading-tight focus:outline-none" 
            type="text" placeholder="Bulbasaur" value={searchTerm || ''} onChange={onSearchChange} />
          <button className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded" 
            type="submit">
            Search
          </button>
        </div>
        {/* autocomplete dropdown */}
        <div className="w-full lg:w-1/3 px-6 rounded-b-xl absolute text-black text-left z-10 right-full lg:right-96 xl:right-1/3 2xl:right-1/3">
          <ul className="ml-5 mr-12 px-3 rounded-b-xl border-r border-l border-b border-gray-400 shadow-lg bg-white">
            <li className='capitalize w-1/2' data-name='bulbasaur' onClick={autofillSearch}>Bulbasaur</li>
          </ul>
        </div>
      </form>
    </div>

  )
}