import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Pokemon } from '../classes/pokemon'
import { PokedexService } from '../pokedex.service'

/****************************************************************************************************/

@Component(
{
  selector: 'app-fighters-menu',
  templateUrl: './fightersMenu.component.html',
  styleUrls: ['./fightersMenu.component.css']
})

/****************************************************************************************************/

export class FightersMenuComponent
{
  firstFighter: Pokemon = null;
  secondFighter: Pokemon = null;

  constructor(private router: Router, private pokedexService: PokedexService)
  {
    pokedexService.getPokemons().subscribe(pokemons => {
      this.firstFighter = pokemons[0];
      this.secondFighter = pokemons[1];
    });
  }

  redirectToMainMenu(): void
  {
    this.router.navigateByUrl('/');
  }
}

/****************************************************************************************************/
