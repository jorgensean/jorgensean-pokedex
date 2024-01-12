import { useAppDispatch, useAppSelector } from "./app/hooks"

import { PokemonEntry } from "./types/pokemon"
import { useGetPokemonListQuery } from "./features/pokemon/pokemonApi"
import { setTarget, selectedPokemonValue } from "./features/pokemon/selectedPokemonSlice"
import { setSearchQuery, clearSearch, pokemonSearchQuery } from "./features/pokemon/pokemonSearchSlice"

import { Header } from "./components/Header"
import { PokemonTile } from "./components/PokemonTile"
import { PokemonDetail } from "./components/PokemonDetail"

const App = () => {
  const dispatch = useAppDispatch()
  const selectedPokemon = useAppSelector(selectedPokemonValue)
  const searchQuery = useAppSelector(pokemonSearchQuery)

  const { data, isLoading, isError } = useGetPokemonListQuery()
  if (isLoading) {
    return <div>Loading</div>
  }
  if (isError) {
    return <div>Error</div>
  }
  if (!data) {
    return <div>No Pokemon found!</div>
  }
  return (
    <div style={{ backgroundImage: 'url(/pokeball-bg.png)' }} className="w-full m-0">
      <div className="w-full m-0 bg-white bg-opacity-80">
        <div className="container w-full lg:w-3/4 xl:w-3/5 2xl:w-2/3 bg-red-600 pb-8">
          <div className="container w-full xl:w-4/5 bg-white lg:px-12 pb-8 rounded-b-lg">
            <Header data={data} />
            {selectedPokemon ? (
              <div className="container w-full p-4 md:px-14 pt-2">
                <PokemonDetail pokemon={selectedPokemon} />
              </div>
            ) : (
              <div className="container w-full p-4 md:px-14 pt-2">
                <div className="flex justify-space-between grid gap-1 md:gap-2 grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                  {searchQuery ? (
                    data.results.filter((pokemon: PokemonEntry) => {
                      return searchQuery.length > 0 && pokemon.name.includes(searchQuery)
                    })
                    .map((pokemon: PokemonEntry) => (
                      <div className="cursor-pointer" key={pokemon.name} onClick={() => dispatch(setTarget({name: pokemon.name}))} data-name={pokemon.name}>
                        <PokemonTile pokemon={pokemon} />
                      </div>
                    ))
                  ) : (
                    data.results.slice(91, 104).map((pokemon: PokemonEntry) => (
                      <div className="cursor-pointer" key={pokemon.name} onClick={() => dispatch(setTarget({name: pokemon.name}))} data-name={pokemon.name}>
                        <PokemonTile pokemon={pokemon} />
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
