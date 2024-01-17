import {
  createApi,
  fetchBaseQuery,
  type FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react"
import type { Pokemon, PokemonList, PokemonSpecies } from "../../types/pokemon"

const baseUrl = "https://pokeapi.co/api/v2/"

export const pokemonApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
  }),
  endpoints: builder => ({
    getPokemonList: builder.query<PokemonList, void>({
      async queryFn(_arg, _queryApi, _extraOptions, fetchWithBaseQuery) {
        const countResult = await fetchWithBaseQuery("/pokemon")
        if (countResult.error) {
          return { error: countResult.error as FetchBaseQueryError }
        }
        const pokemonList = countResult.data as PokemonList
        const result = await fetchWithBaseQuery(
          `/pokemon?limit=${pokemonList.count}`,
        )
        return result.data
          ? { data: result.data as PokemonList }
          : { error: result.error as FetchBaseQueryError }
      },
    }),
    getPokemonByName: builder.query<Pokemon, string>({
      query: name => `/pokemon/${name}`,
    }),
    getPokemonSpecies: builder.query<PokemonSpecies, string>({
      query: url => url.slice(url.indexOf(baseUrl)),
    }),
  }),
})

export const {
  useGetPokemonListQuery,
  useGetPokemonByNameQuery,
  useGetPokemonSpeciesQuery,
} = pokemonApi
