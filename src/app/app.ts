import { Component } from '@angular/core';
import { PokemonList } from './components/pokemon-list/pokemon-list';

@Component({
  selector: 'app-root',
  imports: [PokemonList],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App  {}
