export interface PokemonList {
  next: string|null,
  previous: string|null,
  count: number,
  results: PokemonEntry[]
}

export interface PokemonEntry {
  name: string,
  url?: string,
}

export interface Pokemon {
  id: number,
  name: string,
  sprites: {
    other: {
      dream_world: {
        front_default: string|undefined,
      },
      home: {
        front_default: string|undefined,
      },
      showdown: {
        front_default: string|undefined,
      },
      "official-artwork": {
        front_default: string|undefined,
      },
    },
  },
  species: {
    url: string|null,
  }
  stats: PokemonStats[],
  height: number|null,
  weight: number|null,
  types: PokemonType[],
}

export interface PokemonStats {
  base_stat: number,
  stat: {
    name: string,
  },
}

export interface PokemonSpecies {
  flavor_text_entries: {
    flavor_text: string|undefined,
  }[],
  evolution_chain: {
    url: string,
  }
}

export interface PokemonType {
  slot: number,
  type: {
    name: string,
  }
}
