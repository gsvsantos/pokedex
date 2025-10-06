import { PokeApiDetailsResponse } from '../models/poke-api';
import { Pokemon, PokemonCries, ThisPokemonDetails } from '../models/pokemon';
import { convertToTitleCase } from './convert-to-title-case';
import { favoritesPokemon } from './favorites-pokemon';

export function mapPokemon(obj: PokeApiDetailsResponse): Pokemon {
  return {
    id: obj.id,
    name: convertToTitleCase(obj.name),
    urlSprite: obj.sprites.front_default,
    types: obj.types.map((x: any) => convertToTitleCase(x.type.name)),
    favorite: favoritesPokemon.some((p) => p.id == obj.id),
  };
}

export function mapPokemonDetails(obj: PokeApiDetailsResponse): ThisPokemonDetails {
  const sprites = [
    obj.sprites.front_default,
    obj.sprites.back_default,
    obj.sprites.front_shiny,
    obj.sprites.back_shiny,
    obj.sprites.other.dream_world.front_default,
    obj.sprites.other['official-artwork'].front_default,
  ];

  return {
    id: obj.id,
    name: convertToTitleCase(obj.name),
    urlSprite: obj.sprites.front_default,
    sprites: sprites,
    types: obj.types.map((x: any) => convertToTitleCase(x.type.name)),
    cries: mapPokemonCries(obj.cries),
    favorite: favoritesPokemon.some((p) => p.id == obj.id),
  };
}

export function mapPokemonCries(obj: any): PokemonCries {
  return { actual: obj.latest, oldest: obj.legacy };
}
