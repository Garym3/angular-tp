import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pokemon } from './classes/pokemon'

@Injectable({
  providedIn: 'root'
})
export class PokedexService
{
  private baseUrl: string = 'https://pokeapi.co/api/v2/pokemon';
  pokemons: Pokemon[] = [];

  constructor(private http: HttpClient)
  {

  }

  getPokemon(id: number, callback: any)
  {
    this.http.get(`${this.baseUrl}/${id}`).toPromise().then((response) =>
    {
      return callback(response);
    });
  }
}
