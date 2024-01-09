import { Header } from "./components/Header"
import { useGetPokemonListQuery } from "./features/pokemon/pokemonApi"



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
      <div className="w-full m-0 bg-filter">
        <div className="container w-full lg:w-3/4 xl:w-3/5 2xl:w-2/3 bg-red-600 pb-8">
          <div className="container w-full xl:w-4/5 bg-white lg:px-12 pb-8">
            <Header data={data} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
