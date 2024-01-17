import type React from "react"

import { useAppDispatch } from "../app/hooks"

import { useGetPokemonByNameQuery } from "../features/pokemon/pokemonApi"
import type { PokemonEntry, PokemonStats, PokemonType } from "../types/pokemon"
import { PokemonDescription } from "./PokemonDescription"
import { unsetTarget } from "../features/pokemon/selectedPokemonSlice"

type Props = {
  pokemon: PokemonEntry
}

export const PokemonDetail: React.FC<Props> = ({ pokemon }: Props) => {
  const dispatch = useAppDispatch()
  const { data, isLoading, isError } = useGetPokemonByNameQuery(pokemon.name)

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

  const primaryType: string =
    "capitalize text-5xl 2xl:text-7xl py-3 pl-16 outline outline-1 outline-transparent -rotate-y-[7deg] -translate-x-16 border-t border-b border-black scale-105 text-white overflow-hidden".concat(
      data.types.length ? ` bg-${data.types[0].type.name}` : "",
    )

  return (
    <div className="container w-full">
      <div className="rounded-t-xl text-center w-full relative">
        <button
          className="text-4xl absolute z-10 top-2 right-6 font-bold text-white cursor-pointer"
          onClick={() => dispatch(unsetTarget())}
        >
          &times;
        </button>
        <div className="bg-amber-300 perspective-250 rounded-xl overflow-hidden w-full py-4">
          <div className={primaryType}>
            <span className="inline-block subpixel-antialiased translate-y-1 pb-3 font-bold">
              {data.name}
            </span>
            {data.sprites.other.showdown.front_default && (
              <img
                className="inline ml-8 -translate-y-1 max-h-24 drop-shadow-2xl"
                src={data.sprites.other.showdown.front_default}
                alt={data.name}
              />
            )}
            <div></div>
          </div>
        </div>
      </div>
      <div className="container w-full flex px-6 pt-2">
        <div className="flex-none w-1/2 text-left">
          {data.sprites.other["official-artwork"].front_default && (
            <img
              className="max-w-60"
              src={data.sprites.other["official-artwork"].front_default}
              alt={data.name}
            />
          )}
        </div>
        <div className="grow"></div>
        <div className="flex-none w-1/2">
          {data.species.url && <PokemonDescription url={data.species.url} />}
          <div className="pokemon-types">
            <h3>Types</h3>
            <div className="grid gap-2 grid-cols-2">
              {data.types.length
                ? data.types.map((type: PokemonType) => (
                    <div
                      key={`${pokemon.name}-${type.type.name}`}
                      className={"py-1 px-0 rounded-lg text-white text-center text-md capitalize".concat(
                        ` bg-${type.type.name}`,
                      )}
                    >
                      <span>{type.type.name}</span>
                    </div>
                  ))
                : ""}
            </div>
          </div>
        </div>
      </div>
      <div className="container w-full flex p-4 pt-2">
        <div className="flex-none w-1/2 text-left rounded-lg bg-blue-400 p-4">
          {data.stats.length
            ? data.stats.map((stats: PokemonStats) => (
                <div
                  key={`${pokemon.name}-${stats.stat.name}`}
                  className="text-white text-md capitalize"
                >
                  <span>
                    {stats.stat.name}: {stats.base_stat}
                  </span>
                </div>
              ))
            : ""}
        </div>
        <div className="grow"></div>
        <div className="flex-none w-1/3 rounded-lg font-semibold bg-indigo-400 p-4">
          {data.height && (
            <div className="text-white text-lg capitalize">
              Height: <span>{data.height}</span>
            </div>
          )}
          {data.weight && (
            <div className="text-white text-lg capitalize">
              Weight: <span>{data.weight}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
