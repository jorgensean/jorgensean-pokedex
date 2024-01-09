import React from 'react';
import { useGetPokemonByNameQuery } from '../features/pokemon/pokemonApi';
import { Pokemon } from "../types/pokemon";

type Props = {
  pokemon: Pokemon
};

export const PokemonTile: React.FC<Props> = ({ pokemon }) => {

  const { data, isLoading, isError } = useGetPokemonByNameQuery(pokemon.name);
  if (isLoading) {
    return <div><span>Loading</span></div>;
  }
  if (isError) {
    return <div><span>Error</span></div>;
  }

  return (
    <div>
      <div>
        <h2 className="capitalize">
          {pokemon.name}
        </h2>
        <img src={data.sprites.front_default} alt={pokemon.name} />
      </div>
    </div>
  )
}
