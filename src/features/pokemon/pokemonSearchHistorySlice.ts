import type { PayloadAction } from "@reduxjs/toolkit"
import { createAppSlice } from "../../app/createAppSlice"

export interface pokemonSearchHistorySliceState {
  history: string[],
}

const initialState: pokemonSearchHistorySliceState = {
  history: [],
}

export const pokemonSearchHistorySlice = createAppSlice({
  name: "pokemonSearchHistory",
  initialState,
  reducers: create => ({
    addToHistory: create.reducer(
      (state, action: PayloadAction<string>) => {
      state.history.push(action.payload)
    }),
    clearItem: create.reducer(
      (state, action: PayloadAction<string  >) => {
      state.history.splice(state.history.indexOf(action.payload), 1)
    }),
  }),
  selectors: {
    pokemonSearchHistory: pokemonSearchHistory => pokemonSearchHistory.history,
  },
})

export const { addToHistory, clearItem } = pokemonSearchHistorySlice.actions

export const { pokemonSearchHistory } = pokemonSearchHistorySlice.selectors
