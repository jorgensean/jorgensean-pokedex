import type React from "react"
import { useState, type MouseEvent } from "react"

import { useAppDispatch, useAppSelector } from "../app/hooks"

import { useGetPokemonListQuery } from "../features/pokemon/pokemonApi"
import type { PokemonEntry } from "../types/pokemon"
import {
  unsetTarget,
  selectedPokemonValue,
} from "../features/pokemon/selectedPokemonSlice"
import {
  setSearchQuery,
  clearSearch,
} from "../features/pokemon/pokemonSearchSlice"
import {
  addToHistory,
  clearItem,
  pokemonSearchHistory,
} from "../features/pokemon/pokemonSearchHistorySlice"
import { nanoid } from "@reduxjs/toolkit"

export const SearchForm: React.FC = () => {
  const dispatch = useAppDispatch()
  const selectedPokemon = useAppSelector(selectedPokemonValue)
  const searchHistory = useAppSelector(pokemonSearchHistory)
  const { data } = useGetPokemonListQuery()

  const [searchTerm, setSearchTerm] = useState<string>()
  const [allowAutocomplete, setAllowAutocomplete] = useState<Boolean>(true)

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    setAllowAutocomplete(true)
  }

  const formSubmit = (e: any) => {
    e.preventDefault()
    setAllowAutocomplete(false)
    if (selectedPokemon) {
      dispatch(unsetTarget())
    }
    if (e.target.elements.searchInput.value) {
      dispatch(addToHistory(e.target.elements.searchInput.value))
      dispatch(setSearchQuery(e.target.elements.searchInput.value))
    } else {
      setSearchTerm(undefined)
      dispatch(clearSearch())
    }
  }

  const autofillSearch = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    const div = e.target as HTMLDivElement
    const searchQuery = div.getAttribute("data-name") as string
    setSearchTerm(searchQuery)
    if (selectedPokemon) {
      dispatch(unsetTarget())
    }
    dispatch(addToHistory(searchQuery))
    dispatch(setSearchQuery(searchQuery))
    setAllowAutocomplete(false)
  }

  const resetSearch = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setAllowAutocomplete(true)
    if (selectedPokemon) {
      dispatch(unsetTarget())
    }
    if (searchTerm) {
      setSearchTerm(undefined)
    }
    dispatch(clearSearch())
  }

  const removeSearchItem = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setAllowAutocomplete(true)
    const div = e.target as HTMLButtonElement
    const item = div.getAttribute("data-name") as string
    dispatch(clearItem(item))
  }

  return (
    <div className="mx-auto">
      <form onSubmit={formSubmit} autoComplete="off">
        <div className="container mt-2 mb-0 mx-auto w-3/4 flex items-center py-2 px-8 rounded-xl bg-white">
          <input
            className="capitalize appearance-none bg-transparent border-none w-full text-gray-700 mr-3 p-1 leading-tight focus:outline-none"
            type="text"
            name="searchInput"
            placeholder="Bulbasaur"
            value={searchTerm || ""}
            onChange={onSearchChange}
          />
          {searchTerm ? (
            <button
              type="button"
              onClick={resetSearch}
              className="inline py-2 px-4 mt-0.5 mr-4 btn bg-gray-500"
            >
              Reset
            </button>
          ) : (
            ""
          )}
          <button
            className="flex-shrink-0 bg-teal-500 uppercase font-medium hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded-lg"
            type="submit"
          >
            Search
          </button>
        </div>
        {/* autocomplete/search history dropdown */}
        {data ? (
          <div className="w-full lg:w-1/3 px-6 rounded-b-xl absolute text-black text-left z-10 right-full lg:right-96 xl:right-1/3 2xl:right-1/3">
            <div className="ml-5 mr-12 px-3 py-0 rounded-b-xl border-r border-l border-b border-gray-400 shadow-lg bg-white">
              {allowAutocomplete && searchHistory.length && !selectedPokemon
                ? searchHistory.map((item: string) => (
                    <div className="flex" key={item}>
                      <div
                        className="capitalize w-3/4 float-left"
                        data-name={item}
                        onClick={autofillSearch}
                      >
                        {item}
                      </div>
                      <div className="capitalize w-1/4 float-right">
                        <button
                          onClick={removeSearchItem}
                          data-name={`${item}-${nanoid}`}
                          key={item.concat("-remove")}
                          className="text-xs btn btn-sm float-right"
                        >
                          &times; Remove
                        </button>
                      </div>
                    </div>
                  ))
                : ""}
              {allowAutocomplete &&
                data.results
                  .filter((pokemon: PokemonEntry) => {
                    const search = searchTerm ? searchTerm.toLowerCase() : ""
                    const name = pokemon.name
                    return (
                      name !== search &&
                      search.length > 0 &&
                      name.startsWith(search)
                    )
                  })
                  .slice(0, 12)
                  .map((pokemon: PokemonEntry) => (
                    <div
                      className="capitalize w-1/2 last:pb-2"
                      data-name={pokemon.name}
                      key={pokemon.name}
                      onClick={autofillSearch}
                    >
                      {pokemon.name}
                    </div>
                  ))}
            </div>
          </div>
        ) : (
          ""
        )}
      </form>
    </div>
  )
}
