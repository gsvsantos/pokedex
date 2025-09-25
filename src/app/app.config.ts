import { provideHttpClient } from '@angular/common/http';
import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { PokemonList } from './components/pokemon-list/pokemon-list';
import { PokemonDetails } from './components/pokemon-details/pokemon-details';

const routes: Routes = [
  { path: '', redirectTo: 'pokemons', pathMatch: 'full' },
  { path: 'pokemons', component: PokemonList },
  { path: 'pokemons/:id', component: PokemonDetails },
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
  ],
};
