import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { Pokemon } from '../../models/pokemon';
import { convertToTitleCase } from '../../utils/convert-to-title-case';
import { CardPokemon } from '../card-pokemon/card-pokemon';
import { changePokemonStatus, favoritesPokemon } from '../../utils/favorites-pokemon';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-pokemon-list',
  imports: [CardPokemon, RouterLink],
  templateUrl: './pokemon-list.html',
})
export class PokemonList implements OnInit {
  public pokemons: Pokemon[] = [];
  public favoritesPokemon = favoritesPokemon;
  public changePokemonStatus = changePokemonStatus;
  public convertToTitleCase = convertToTitleCase;
  public theBest: string = '';

  private readonly url: string = 'https://pokeapi.co/api/v2/pokemon/?limit=10';
  private readonly http = inject(HttpClient);

  public ngOnInit(): void {
    this.http.get(this.url).subscribe((obj: any) => {
      const arrayResults: any[] = obj.results;

      for (let result of arrayResults) {
        this.http.get(result.url).subscribe((objDetails) => {
          const pokemon = this.getPokemon(objDetails);

          this.pokemons.push(pokemon);
        });
      }

      const charizard = arrayResults.find((p) => p.name == 'charizard');
      this.theBest = charizard.name;
    });
  }

  private getPokemon(obj: any): Pokemon {
    return {
      id: obj.id,
      name: convertToTitleCase(obj.name),
      urlSprite: obj.sprites.front_default,
      types: obj.types.map((x: any) => convertToTitleCase(x.type.name)),
      favorite: favoritesPokemon.some((p) => p.id == obj.id),
    };
  }
}
