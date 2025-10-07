import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pokemon } from '../../models/pokemon';
import { NgClass } from '@angular/common';
import { colorByTypeMapping } from '../../utils/color-by-type-mapping';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-card-pokemon',
  imports: [NgClass, RouterLink],
  template: `
    @if (pokemon){
    <div class="card text-center">
      @if (showLink){
      <a class="text-decoration-none" [routerLink]="['/pokemons', pokemon.id]">
        <p class="card-title fw-bolder fs-4">
          {{ pokemon.name }}
        </p>
      </a>
      } @else {
      <p class="card-title fw-bolder fs-4">
        {{ pokemon.name }}
      </p>
      }
      <div class="d-flex justify-content-center gap-2">
        @for (tipo of pokemon.types; track $index){
        <span
          class="badge rounded-pill text-light fs-8 fs-md-6"
          [ngClass]="colorByTypeMapping[tipo]"
        >
          {{ tipo }}
        </span>
        }
      </div>
      <img class="w-50 h-75 align-self-center" [src]="pokemon.urlSprite" [alt]="pokemon.name" />
      @if (pokemon.favorite){

      <button class="btn mx-auto" (click)="changeFavoriteState()">
        <i class="bi bi-heart-fill fs-4 text-danger"></i>
      </button>
      } @else {
      <button class="btn mx-auto" (click)="changeFavoriteState()">
        <i class="bi bi-heart fs-4 text-danger"></i></button
      >}
    </div>
    }
  `,
})
export class CardPokemon {
  @Input({ required: true }) public pokemon?: Pokemon;
  @Input({ required: true }) public showLink: boolean = false;

  @Output() public favoriteStateChanged: EventEmitter<Pokemon> = new EventEmitter<Pokemon>();

  public colorByTypeMapping = colorByTypeMapping;

  public changeFavoriteState(): void {
    this.favoriteStateChanged.emit(this.pokemon);
  }
}
