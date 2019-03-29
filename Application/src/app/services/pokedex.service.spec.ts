import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PokedexService } from './pokedex.service';

describe('PokedexService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [],
    providers: [PokedexService]
  }));

  it('should return one pokemon', async() => {
    const service: PokedexService = TestBed.get(PokedexService);
    expect(service).toBeTruthy();
  });
});
