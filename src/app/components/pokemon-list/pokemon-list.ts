import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { Pokemon } from '../../models/pokemon';
import { colorByTypeMapping } from '../../utils/color-by-type-mapping';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-pokemon-list',
  imports: [NgClass],
  templateUrl: './pokemon-list.html'
})
export class PokemonList implements OnInit{
 public pokemons: Pokemon[] = [];
  public colorByTypeMapping = colorByTypeMapping;
  public theBest: string = "";
  private readonly url: string = "https://pokeapi.co/api/v2/pokemon/?limit=10";
  private readonly http = inject(HttpClient);

  public ngOnInit(): void {
    this.http.get(this.url).subscribe((obj: any) => {
      const arrayResults: any[] = obj.results;

      for (let result of arrayResults) {
        this.http.get(result.url).subscribe(objDetails => {
          const pokemon = this.getPokemon(objDetails);

          this.pokemons.push(pokemon);
        })
      }
      
      const charizard = arrayResults.find(p => p.name == 'charmander');
      this.theBest = charizard.name;
    });

  }
  private getPokemon(obj: any): Pokemon {
    return {
      name: this.convertToTitleCase(obj.name),
      urlSprite: obj.sprites.front_default,
      types: obj.types.map((x: any) => this.convertToTitleCase(x.type.name))
    }
  }

  private convertToTitleCase(text: string): string {
    if (text.length < 1) return text;

    const newString = text[0].toUpperCase()
      + text.substring(1).toLowerCase();

    return newString;
  }
}
