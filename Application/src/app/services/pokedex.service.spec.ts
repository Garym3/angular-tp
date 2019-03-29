import { TestBed, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { PokedexService } from './pokedex.service';
import { Pokemon } from '../classes/pokemon';
import { Skill } from '../classes/skill';

describe('PokedexService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [PokedexService]
  }));

  it('should return Bulbasaur as a Pokemon', async(() => {
    const pokedexService: PokedexService = TestBed.get(PokedexService);
    const http = TestBed.get(HttpTestingController);
    const thunder: Skill = new Skill('thunder', 120, 70);
    const powerWhip: Skill = new Skill('power whip', 120, 85);
    const mockedPokemon: Pokemon = new Pokemon(1, "Bulbasaur", 1, 45, 45, 45, 45, 45, 45, [thunder, powerWhip], "", "");
    const id: number = 1;

    pokedexService.getPokemon(id).subscribe((pokemon: Pokemon) =>
    {
      expect(pokemon.name).toBe("Bulbasaur");
    });

    http.expectOne(`${pokedexService.baseUrl}/${id}`).flush(mockedPokemon);
  }));
});
