import { PokemonCries, ThisPokemonDetails } from '../models/pokemon';
import { convertToTitleCase } from './convert-to-title-case';

export function mapearDetalhesPokemon(obj: any): ThisPokemonDetails {
  const sprites: string[] = [
    obj.sprites.front_default,
    obj.sprites.back_default,
    obj.sprites.back_shiny,
    obj.sprites.front_shiny,
    obj.sprites.other.dream_world.front_default,
    obj.sprites.other['official-artwork'].front_default,
  ];

  return {
    id: obj.id,
    name: convertToTitleCase(obj.name),
    urlSprite: obj.sprites.front_default,
    sprites: sprites,
    types: obj.types.map((x: any) => convertToTitleCase(x.type.name)),
    cries: mapearSonsDoPokemon(obj.cries),
  };
}

export function mapearSonsDoPokemon(obj: any): PokemonCries {
  return { actual: obj.latest, oldest: obj.legacy };
}
