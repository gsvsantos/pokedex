import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ThisPokemonDetails } from '../../models/pokemon';
import { mapearDetalhesPokemon } from '../../utils/pokemon-mapping';
import { NgClass } from '@angular/common';
import { colorByTypeMapping } from '../../utils/color-by-type-mapping';
import { CardPokemon } from '../card-pokemon/card-pokemon';
import { changePokemonStatus } from '../../utils/favorites-pokemon';

@Component({
  selector: 'app-pokemon-details',
  imports: [NgClass, CardPokemon],
  templateUrl: './pokemon-details.html',
})
export class PokemonDetails implements OnInit {
  public pokemonDetails?: ThisPokemonDetails;
  public colorByTypeMapping = colorByTypeMapping;
  public changePokemonStatus = changePokemonStatus;

  private readonly url: string = 'https://pokeapi.co/api/v2/pokemon';
  private readonly http = inject(HttpClient);
  private readonly route = inject(ActivatedRoute);

  ngOnInit(): void {
    const pokemonId = this.route.snapshot.paramMap.get('id');

    const urlCompleto = `${this.url}/${pokemonId}`;

    this.http.get(urlCompleto).subscribe((objDetails) => {
      this.pokemonDetails = mapearDetalhesPokemon(objDetails);
    });
  }
}
