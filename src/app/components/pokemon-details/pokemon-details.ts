import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ThisPokemonDetails } from '../../models/pokemon';
import { AsyncPipe, NgClass } from '@angular/common';
import { colorByTypeMapping } from '../../utils/color-by-type-mapping';
import { CardPokemon } from '../card-pokemon/card-pokemon';
import { changePokemonStatus } from '../../utils/favorites-pokemon';
import { PokeApiService } from '../../services/poke-api.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-pokemon-details',
  imports: [NgClass, AsyncPipe, CardPokemon],
  templateUrl: './pokemon-details.html',
})
export class PokemonDetails implements OnInit {
  public pokemonDetails$?: Observable<ThisPokemonDetails>;
  public colorByTypeMapping = colorByTypeMapping;
  public changePokemonStatus = changePokemonStatus;

  private readonly route = inject(ActivatedRoute);
  private readonly pokeApiService = inject(PokeApiService);

  public ngOnInit(): void {
    const pokemonIdParam = this.route.snapshot.paramMap.get('id');

    if (!pokemonIdParam)
      throw new Error('Não foi possível encontrar os detalhes do pokemon escolhido.');

    const pokemonId = parseInt(pokemonIdParam);

    this.pokemonDetails$ = this.pokeApiService.getPokemonDetails(pokemonId);
  }
}
