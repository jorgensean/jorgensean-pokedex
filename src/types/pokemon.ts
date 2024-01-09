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
