import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class PokedexService
{
  baseUrl: string = 'https://pokeapi.co/api/v2/pokemon';

  constructor(private http: HttpClient)
  {
  }

  getPokemon(id: number): Observable<any>
  {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }
}
