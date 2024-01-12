import type { PayloadAction } from "@reduxjs/toolkit"
import { createAppSlice } from "../../app/createAppSlice"
import { PokemonEntry } from "../../types/pokemon"

export interface SelectedPokemonSliceState {
  value: PokemonEntry | undefined,
}

const initialState: SelectedPokemonSliceState = {
  value: undefined
}

export const selectedPokemonSlice = createAppSlice({
  name: "selectedPokemon",
  initialState,
  reducers: create => ({
    setTarget: create.reducer(
      (state, action: PayloadAction<PokemonEntry>) => {
      state.value = action.payload
    }),
    unsetTarget: create.reducer(state => {
      state.value = undefined
    }),
  }),
  selectors: {
    selectedPokemonValue: selectedPokemon => selectedPokemon.value,
  },
})

export const { setTarget, unsetTarget } = selectedPokemonSlice.actions

export const { selectedPokemonValue } = selectedPokemonSlice.selectors
