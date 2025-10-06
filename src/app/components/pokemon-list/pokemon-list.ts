import { Component, inject, OnInit } from '@angular/core';
import { Pokemon } from '../../models/pokemon';
import { convertToTitleCase } from '../../utils/convert-to-title-case';
import { CardPokemon } from '../card-pokemon/card-pokemon';
import { changePokemonStatus, favoritesPokemon } from '../../utils/favorites-pokemon';
import { RouterLink } from '@angular/router';
import { PokeApiService } from '../../services/poke-api.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-pokemon-list',
  imports: [CardPokemon, AsyncPipe, RouterLink],
  templateUrl: './pokemon-list.html',
})
export class PokemonList implements OnInit {
  public pokemons$?: Observable<Pokemon[]>;
  public favoritesPokemon = favoritesPokemon;
  public changePokemonStatus = changePokemonStatus;
  public convertToTitleCase = convertToTitleCase;

  private readonly pokeApiService = inject(PokeApiService);

  public ngOnInit(): void {
    this.pokemons$ = this.pokeApiService.getPokemonList();
  }
}
