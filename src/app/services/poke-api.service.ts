import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { PokeApiResponse, PokeApiDetailsResponse } from '../models/poke-api';
import { Pokemon, ThisPokemonDetails } from '../models/pokemon';
import { mapPokemon, mapPokemonDetails } from '../utils/pokemon-mapping';
import { forkJoin, map, Observable, switchMap, tap, withLatestFrom } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root', // singleton
})
export class PokeApiService {
  private readonly url: string = 'https://pokeapi.co/api/v2/pokemon/';
  private readonly http = inject(HttpClient);
  public readonly localStorageService = inject(LocalStorageService);

  public getPokemonList(): Observable<Pokemon[]> {
    return this.http.get<PokeApiResponse>(this.url).pipe(
      switchMap((req) => {
        const requests = req.results.map((r) => this.http.get<PokeApiDetailsResponse>(r.url));

        return forkJoin(requests);
      }),
      withLatestFrom(this.localStorageService.getFavorites()),
      map(([objDetails, favorites]) => {
        return objDetails
          .map((d) => mapPokemon(d))
          .map((p) => ({ ...p, favorite: favorites.some((f) => f.id === p.id) }));
      }),
    );
  }

  public getPokemonDetails(pokemonId: number): Observable<ThisPokemonDetails> {
    const urlCompleto = `${this.url}/${pokemonId}`;

    return this.http.get<PokeApiDetailsResponse>(urlCompleto).pipe(
      withLatestFrom(this.localStorageService.getFavorites()),
      map(([objDetails, favorites]) => {
        const pokemonAlreadyFavorited = favorites.some((f) => f.id === objDetails.id);
        const details = mapPokemonDetails(objDetails);
        details.favorite = pokemonAlreadyFavorited;

        return details;
      }),
    );
  }
}
