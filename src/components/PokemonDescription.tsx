import type React from "react"
import { useGetPokemonSpeciesQuery } from "../features/pokemon/pokemonApi"

type Props = {
  url: string
}

export const PokemonDescription: React.FC<Props> = ({ url }: Props) => {
  const { data, isLoading, isError } = useGetPokemonSpeciesQuery(url)

  if (isLoading) {
    return (
      <div>
        <span>Loading</span>
      </div>
    )
  }

  if (!data || isError) {
    return (
      <div>
        <span>Error</span>
      </div>
    )
  }

  return (
    <div className="my-3">
      {data.flavor_text_entries.length > 0 &&
        data.flavor_text_entries[0].flavor_text && (
          <p className="text-xl text-justify">
            {data.flavor_text_entries[0].flavor_text
              // janky scrub for weird characters and line endings
              // here, but we catch the é too so put it back when
              // we're done AND fix the capitalization
              .replace("POKéMON", "Pokemon")
              .replace("POKé BALL", "Poke Ball")
              .replace(/[^\x20-\x7E]/gim, " ")
              .replace("Pokemon", "Pokémon")
              .replace("Poke Ball", "Poké Ball")}
          </p>
        )}
    </div>
  )
}
