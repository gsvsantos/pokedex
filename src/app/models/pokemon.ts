export interface Pokemon {
  id: number;
  name: string;
  urlSprite?: string;
  types: string[];
  favorite: boolean;
}

export interface ThisPokemonDetails extends Pokemon {
  cries: PokemonCries;
  sprites: string[];
}

export interface PokemonCries {
  actual: string;
  oldest: string;
}
