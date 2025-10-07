import { Injectable } from '@angular/core';
import { Pokemon } from '../models/pokemon';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private readonly key: string = 'pokedex:favortes';
  private readonly favoritesPokemonSubject = new BehaviorSubject<Pokemon[]>([]);

  constructor() {
    const jsonString = localStorage.getItem(this.key);

    if (!jsonString) return;

    this.favoritesPokemonSubject.next(JSON.parse(jsonString));
  }

  public changePokemonStatus(pokemon: Pokemon) {
    const actualFavorites = this.favoritesPokemonSubject.getValue();

    if (pokemon.favorite) {
      pokemon.favorite = false;

      const index = actualFavorites.findIndex((x) => x.id == pokemon.id);
      if (index > -1) actualFavorites.splice(index, 1);
    } else {
      pokemon.favorite = true;
      actualFavorites.push(pokemon);
    }

    this.favoritesPokemonSubject.next(actualFavorites);

    const jsonString = JSON.stringify(actualFavorites);

    localStorage.setItem(this.key, jsonString);
  }

  public getFavorites(): Observable<Pokemon[]> {
    return this.favoritesPokemonSubject.asObservable();
  }
}
