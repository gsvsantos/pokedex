import { Pokemon } from '../models/pokemon';

export let favoritesPokemon: Pokemon[] = [];

export function changePokemonStatus(pokemon: Pokemon) {
  if (pokemon.favorite) {
    pokemon.favorite = false;

    favoritesPokemon = favoritesPokemon.filter((p) => p.id != pokemon.id);
  } else {
    pokemon.favorite = true;
    favoritesPokemon.push(pokemon);
  }
}
