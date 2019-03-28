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
  isReadyToBeDisplayed: boolean = false;

  constructor(private router: Router, private pokedexService: PokedexService)
  {
    this.retrievePokemonListFromApi();
  }

  /****************************************************************************************************/
  /****************************************************************************************************/

  retrievePokemonListFromApi()
  {
    const thundershock: Skill = new Skill('thundershock', 40, 100);
    const thunder: Skill = new Skill('thunder', 120, 70);
    const vineWhip: Skill = new Skill('vine whip', 35, 100);
    const powerWhip: Skill = new Skill('power whip', 120, 85);
    const tackle: Skill = new Skill('tackle', 50, 100);

    let index: number = 1;

    const browseApi = () =>
    {
      this.pokedexService.getPokemon(index, (result) =>
      {
        const newPokemon = new Pokemon(result.id, result.name, 1, result.stats[5].base_stat, result.stats[0].base_stat, result.stats[0].base_stat, result.stats[0].base_stat, result.stats[0].base_stat, result.stats[0].base_stat, [tackle, thundershock], `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index}.png`, `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${index}.png`);

        this.fightersList.push(newPokemon);

        if((index += 1) <= 151) return browseApi();

        this.isReadyToBeDisplayed = true;
      });
    }

    browseApi();
  }

  /****************************************************************************************************/
  /****************************************************************************************************/

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
      this.router.navigateByUrl(`/arena?first=${this.firstFighter.id}&second=${this.secondFighter.id}`);
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
