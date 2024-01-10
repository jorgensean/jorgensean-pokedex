import { Pokemon } from "./types/pokemon"
import { useGetPokemonListQuery } from "./features/pokemon/pokemonApi"
import { Header } from "./components/Header"
import { PokemonTile } from "./components/PokemonTile"

const App = () => {
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
      <div className="w-full m-0 bg-white bg-opactity-80">
        <div className="container w-full lg:w-3/4 xl:w-3/5 2xl:w-2/3 bg-red-600 pb-8">
          <div className="container w-full xl:w-4/5 bg-white lg:px-12 pb-8">
            <Header data={data} />
            <div className="container w-full p-4 md:px-14 pt-2">
              <div className="flex justify-space-between grid gap-1 md:gap-2 grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                {data.results.slice(0, 12)
                .map((pokemon: Pokemon) => (
                  <PokemonTile key={pokemon.name} pokemon={pokemon} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
