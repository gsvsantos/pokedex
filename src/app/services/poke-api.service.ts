import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { PokeApiResponse, PokeApiDetailsResponse } from '../models/poke-api';
import { Pokemon, ThisPokemonDetails } from '../models/pokemon';
import { mapPokemonDetails, mapPokemon } from '../utils/pokemon-mapping';
import { forkJoin, map, Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root', // singleton
})
export class PokeApiService {
  private readonly url: string = 'https://pokeapi.co/api/v2/pokemon/';
  private readonly http = inject(HttpClient);

  public getPokemonList(): Observable<Pokemon[]> {
    return this.http.get<PokeApiResponse>(this.url).pipe(
      switchMap((req) => {
        const requests = req.results.map((r) =>
          this.http.get<PokeApiDetailsResponse>(r.url).pipe(map(mapPokemonDetails))
        );

        return forkJoin(requests);
      })
    );
  }

  public getPokemonDetails(pokemonId: number): Observable<ThisPokemonDetails> {
    const urlCompleto = `${this.url}/${pokemonId}`;

    return this.http.get<PokeApiDetailsResponse>(urlCompleto).pipe(map(mapPokemonDetails));
  }
}
