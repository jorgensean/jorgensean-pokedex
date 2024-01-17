import type { PayloadAction } from "@reduxjs/toolkit"
import { createAppSlice } from "../../app/createAppSlice"

export interface SearchQuerySliceState {
  value: string | undefined
}

const initialState: SearchQuerySliceState = {
  value: undefined,
}

export const pokemonSearchSlice = createAppSlice({
  name: "pokemonSearch",
  initialState,
  reducers: create => ({
    setSearchQuery: create.reducer((state, action: PayloadAction<string>) => {
      state.value = action.payload
    }),
    clearSearch: create.reducer(state => {
      state.value = undefined
    }),
  }),
  selectors: {
    pokemonSearchQuery: pokemonSearch => pokemonSearch.value,
  },
})

export const { setSearchQuery, clearSearch } = pokemonSearchSlice.actions

export const { pokemonSearchQuery } = pokemonSearchSlice.selectors
