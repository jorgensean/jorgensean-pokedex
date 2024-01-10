import React from 'react';
import { useGetPokemonByNameQuery } from '../features/pokemon/pokemonApi';
import { Pokemon, PokemonType } from "../types/pokemon";

type Props = {
  pokemon: Pokemon
};

export const PokemonTile: React.FC<Props> = ({ pokemon }) => {
  const { data, isLoading, isError } = useGetPokemonByNameQuery(pokemon.name);

  if (isLoading) {
    return (
      <div className="border-[6px] border-amber-300 rounded-xl min-w-40 min-h-52">
        <span>Loading</span>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="border-[6px] border-amber-300 rounded-xl min-w-40 min-h-52">
        <span>Error getting Pokemon!</span>
      </div>
    )
  }

  const primaryType: string = 'border-[6px] border-amber-300 rounded-xl min-w-40 min-h-52 relative pokemon-tile'
    .concat(data.types.length ? ` bg-${data.types[0].type.name}` : '')

  return (
    <div className={primaryType}>
      <h2 className="capitalize rounded-t-lg text-lg font-bold text-white py-1 mb-5 pl-4 bg-black bg-opacity-50">
        {pokemon.name}
        <span className="text-6xl absolute bottom-3/4 right-0 text-white text-opacity-25">#{pokemon.url.split('/').slice(-2, -1)}</span>
      </h2>
      <img className="bg-white p-3 lg:p-4 2xl:p-5  my-2 aspect-square overflow-visible rounded-full mx-auto max-w-28 lg:max-w-32 2xl:max-w-36 max-h-28 lg:max-h-32 2xl:max-h-36"
        src={data.sprites.other.dream_world.front_default} alt={pokemon.name} />
      <div className='grid gap-2 grid-cols-2 p-2'>
        {data.types.length ? 
          data.types.map((type: PokemonType) => (
            <div key={`${pokemon.name}-${type.type.name}`} className={'py-1 px-0.5 rounded-xl text-white text-center text-sm capitalize'
              // add bg filter or bg-<type> if secondary
              .concat(type.type.name !== data.types[0].type.name ? ` bg-${data.types[1].type.name}` : ' bg-black bg-opacity-30')}>
              <span>{type.type.name}</span>
            </div>
          )
        ) : ''}
      </div>
    </div>
  )
}
