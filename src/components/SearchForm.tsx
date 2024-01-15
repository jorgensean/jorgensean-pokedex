import React, { useState, MouseEvent, FormEvent } from "react"

import { useAppDispatch, useAppSelector } from "../app/hooks"

import { useGetPokemonListQuery } from "../features/pokemon/pokemonApi"
import { PokemonEntry } from "../types/pokemon"
import { setTarget, unsetTarget, selectedPokemonValue } from "../features/pokemon/selectedPokemonSlice"
import { setSearchQuery, clearSearch, pokemonSearchQuery } from "../features/pokemon/pokemonSearchSlice"

export const SearchForm: React.FC = () => {
  const dispatch = useAppDispatch()
  const selectedPokemon = useAppSelector(selectedPokemonValue)

  const [searchTerm, setSearchTerm] = useState<string>()
  const [allowAutocomplete, setAllowAutocomplete] = useState<Boolean>(true)

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    setAllowAutocomplete(true)
  }
  const formSubmit = (e: any) => {
    setAllowAutocomplete(false)
    if (selectedPokemon) {
      dispatch(unsetTarget())
    }
    if ((e.target.elements.searchInput.value)) {
      dispatch(setSearchQuery(e.target.elements.searchInput.value))
    } else {
      setSearchTerm(undefined)
      dispatch(clearSearch())
    }
    setSearchTerm(undefined)
    e.preventDefault()
  }
  const autofillSearch = (e: MouseEvent<HTMLLIElement>) => {
    e.preventDefault()
    const div = e.target as HTMLLIElement
    setSearchTerm(div.getAttribute("data-name") as string)
    setAllowAutocomplete(false)
  }
  const { data } = useGetPokemonListQuery()

  return (
    <div className="mx-auto">
      <form onSubmit={formSubmit} autoComplete="off">
        <div className="container mt-2 mb-0 mx-auto w-3/4 flex items-center py-2 px-8 rounded-xl bg-white">
          <input className="capitalize appearance-none bg-transparent border-none w-full text-gray-700 mr-3 p-1 leading-tight focus:outline-none" 
            type="text" name="searchInput" placeholder="Bulbasaur" value={searchTerm || ""} onChange={onSearchChange} />
          <button className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded" 
            type="submit">
            Search
          </button>
        </div>
        {/* autocomplete dropdown */}
        {data ? 
          <div className="w-full lg:w-1/3 px-6 rounded-b-xl absolute text-black text-left z-10 right-full lg:right-96 xl:right-1/3 2xl:right-1/3">
            <ul className="ml-5 mr-12 px-3 rounded-b-xl border-r border-l border-b border-gray-400 shadow-lg bg-white">
              {allowAutocomplete && data.results.filter((pokemon: PokemonEntry) => {
                const search = searchTerm ? searchTerm.toLowerCase() : "";
                const name = pokemon.name
                return name !== search && search.length > 0 && name.startsWith(search)
              })
              .slice(0, 12)
              .map((pokemon: PokemonEntry) => (
                <li className="capitalize w-1/2 last:pb-2" data-name={pokemon.name} key={pokemon.name} onClick={autofillSearch}>{pokemon.name}</li>
              ))}
            </ul>
          </div>
        : ""}
      </form>
    </div>
  )
}
