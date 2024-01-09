import React from "react"
import { PokemonList } from "../types/pokemon"
import { SearchForm } from "./SearchForm"

interface Props {
  data: PokemonList
}

export const Header: React.FC<Props> = ({ data }) => {
  return (
    <header className="text-center m-0 p-0 lg:pt-6 py-6 md:mx-14 bg-red-600 rounded-b-xl text-white">
      <h1>Pokémon Pokédex</h1>
      <h3>Pokémon database: {data.count}</h3>
      <h2 className="text-lg xl:text-2xl font-bold">Which Pokémon are you looking for?</h2>
      <SearchForm pokemonList={data.results} />
    </header>
  )
}
