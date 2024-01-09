export interface Pokemon {
  id: string;
  name: string;
  url: string;
}

export interface PokemonList {
  next: string|null,
  previous: string|null,
  count: number,
  results: []
}

export interface PokemonType {
  slot: number,
  type: {
    name: string,
    url: string,
  }
}
