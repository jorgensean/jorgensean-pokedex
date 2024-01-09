import { createApi, fetchBaseQuery, FetchBaseQueryError } from "@reduxjs/toolkit/query/react"
import { PokemonList } from "../../types/pokemon"

function fakeLoading() {
  return new Promise((resolve) => setTimeout(resolve, 2000))
}

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://pokeapi.co/api/v2/'
  }),
  endpoints: (builder) => ({
    getPokemonList: builder.query<PokemonList, void>({
      async queryFn(_arg, _queryApi, _extraOptions, fetchWithBaseQuery) {
        const countResult = await fetchWithBaseQuery('/pokemon')
        if (countResult.error) {
          return { error: countResult.error as FetchBaseQueryError }
        }
        const pokemonList = countResult.data as PokemonList
        const result = await fetchWithBaseQuery(`/pokemon?limit=${pokemonList.count}`)
        await fakeLoading();
        return result.data 
          ? { data: result.data as PokemonList } 
          : { error: result.error as FetchBaseQueryError }
        },
    }),
    getPokemonByName: builder.query({
      query: (name) => `/pokemon/${name}`
    })
  })
})

export const { useGetPokemonListQuery, useGetPokemonByNameQuery } = pokemonApi
