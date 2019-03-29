import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

import { zip, of } from 'rxjs'
import { map, concatAll } from 'rxjs/operators'

import { Pokemon } from '../classes/pokemon'
import { Skill } from '../classes/skill'

@Injectable(
{
  providedIn: 'root'
})

export class PokedexService
{
  private baseUrl: string = 'https://pokeapi.co/api/v2/pokemon';

  private pokemonList: object = {};

  constructor(private http: HttpClient)
  {

  }

  getPokemonList(limit: number): Observable<Pokemon[]>
  {
    const arrayOfObservable = [...new Array(limit)].fill().map((_, index) => this.getPokemon(index + 1));

    return zip(...arrayOfObservable);
  }

  getPokemon(id: number): Observable<Pokemon>
  {
    const thundershock: Skill = new Skill('thundershock', 40, 100);
    const thunder: Skill = new Skill('thunder', 120, 70);
    const vineWhip: Skill = new Skill('vine whip', 35, 100);
    const powerWhip: Skill = new Skill('power whip', 120, 85);
    const tackle: Skill = new Skill('tackle', 50, 100);

    if(this.pokemonList[id] !== undefined) return of(this.pokemonList[id].pokemon);

    return this.http.get<any>(`${this.baseUrl}/${id}`).pipe(map((result: any):Pokemon =>
    {
      const newPokemon = new Pokemon(
        result.id,
        result.name,
        1,
        result.stats[5].base_stat,
        result.stats[0].base_stat,
        result.stats[4].base_stat,
        result.stats[3].base_stat,
        result.stats[2].base_stat,
        result.stats[1].base_stat,
        [tackle, thundershock],
        `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
        `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${id}.png`
      );

      this.pokemonList[id] = { pokemon: newPokemon };

      return newPokemon;
    }));
  }
}
