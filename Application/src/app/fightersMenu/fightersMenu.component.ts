import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Pokemon } from '../classes/pokemon'
import { PokedexService } from '../pokedex.service'
import { Skill } from '../classes/skill'

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
  fightersList: Pokemon[] = [];

  constructor(private router: Router, private pokedexService: PokedexService)
  {
    const thundershock: Skill = new Skill('thundershock', 40, 100);
    const thunder: Skill = new Skill('thunder', 120, 70);
    const vineWhip: Skill = new Skill('vine whip', 35, 100);
    const powerWhip: Skill = new Skill('power whip', 120, 85);

    const bulbasaur = new Pokemon('Bulbasaur', 1, 45, 45, 49, 49, 65, 45, [vineWhip, powerWhip], 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png');
    const pikachu = new Pokemon('Pikachu', 1, 35, 90, 55, 55, 50, 50, [thundershock, thunder], 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/25.png');

    this.fightersList.push(pikachu);
    this.fightersList.push(bulbasaur);
    
    //TODO: Supposed to do a HTTP request to the pokéapi but isn't finished yet
    /*pokedexService.getPokemons().subscribe(pokemons => {
      this.firstFighter = pokemons[0];
      this.secondFighter = pokemons[1];
    });*/
  }

  redirectToMainMenu(): void
  {
    this.router.navigateByUrl('/');
  }

  /****************************************************************************************************/
  /****************************************************************************************************/

  redirectToArena(): void
  {
    if(this.firstFighter !== null && this.secondFighter !== null)
    {
      this.router.navigateByUrl(`/arena?first=${1}&second=${2}`);
    }
  }

  /****************************************************************************************************/
  /****************************************************************************************************/

  firstFighterSelected(pokemonSelected: Pokemon): void
  {
    if(this.firstFighter !== null) return;

    this.firstFighter = pokemonSelected;
  }

  /****************************************************************************************************/
  /****************************************************************************************************/

  secondFighterSelected(pokemonSelected: Pokemon): void
  {
    if(this.secondFighter !== null) return;

    this.secondFighter = pokemonSelected;
  }
}

/****************************************************************************************************/
