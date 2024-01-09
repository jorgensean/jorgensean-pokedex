import React from "react"
import { PokemonList } from "../types/pokemon"

interface Props {
  data: PokemonList
}

export const Header: React.FC<Props> = ({ data }) => {
  return (
    <header>
      <h1>Pokémon Pokédex</h1>
      <h3>Pokémon database: {data.count}</h3>
      <h2 className="text-lg xl:text-2xl font-bold">Which Pokémon are you looking for?</h2>
    </header>
  )
}
