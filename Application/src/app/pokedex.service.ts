import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pokemon } from './classes/pokemon'

@Injectable({
  providedIn: 'root'
})
export class PokedexService {
  private baseUrl: string = 'https://pokeapi.co/api/v2/pokemon';
  pokemons: Pokemon[] = [];

  constructor(private http: HttpClient)
  { 
    for(let i = 1; i <= 2; i++)
    {
      this.pokemons.push(this.getPokemon(2));
    }
  }

  getPokemon(count: number = 2): Promise
  {
    return new Promise((resolve, reject) => {
      this.http.get<Pokemon[]>(`${this.baseUrl}/${count}`)
      .toPromise()
      .then(
        res => {
          // this.pokemons = res.map(item => {
          //   return new Pokemon(
          //     item.name,
          //     1,
          //     item.stats[5].base_stat,
          //     item.stats[0].base_stat,
          //     item.stats[4].base_stat,
          //     item.stats[3].base_stat,
          //     item.stats[2].base_stat,
          //     item.stats[1].base_stat,
          //     null
          //   );
          });
          resolve();
        },
        msg => {
          reject(msg);
        }
      );
    });
  }
}
