# Pokemon Pokédex

![pokedex2](https://github.com/jorgensean/jorgensean-pokedex/assets/3663199/00f6a7b4-f7e8-451c-bb10-0d1ca7c64050)

A working Pokédex! Data (including most image assets) is pulled using PokeAPI's free static data.

## Features

- Pokedex browsing and search
- Search box with search history and autocomplete
- RTK Query for PokeAPI requests/caching
- Redux for state storage

Project created using

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Redux](https://redux.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- [PokeAPI Data](https://pokeapi.co/)

## Installation

- `npm install` (npm chosen because it has the widest general support)
- `npm run dev`
- [Pokedex](http://localhost:8080/)

## Scripts

- `dev`/`start` - start dev server and open browser
- `build` - build for production
- `preview` - locally preview production build
- `test` - launch test runner

## TODO

- Better tests/testing
- More info on Pokemon detail page
- Evolution chains piped to front-end
- Moves/Category for Pokemon detail
- Browser history (forward/back) support
- Loading/Error screens (left barebones)
- Docker container to test build/productionizing
- Data sanitization to avoid slowing the app down
