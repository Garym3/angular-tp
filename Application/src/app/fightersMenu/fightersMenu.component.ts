import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Pokemon } from '../classes/pokemon'
import { PokedexService } from '../services/pokedex.service'
import { Skill } from '../classes/skill'

/****************************************************************************************************/

@Component(
{
  selector: 'app-fighters-menu',
  templateUrl: './fightersMenu.component.html',
  styleUrls: ['./fightersMenu.component.css']
})

/****************************************************************************************************/

export class FightersMenuComponent implements OnInit
{
  firstFighter: Pokemon = null;
  secondFighter: Pokemon = null;
  fightersList: Pokemon[] = [];
  isReadyToBeDisplayed: boolean = false;

  constructor(private router: Router, private pokedexService: PokedexService)
  {

  }

  ngOnInit(): void
  {
    this.getPokemonsFromApi();
  }

  /****************************************************************************************************/
  /****************************************************************************************************/

  getPokemonsFromApi()
  {
    this.pokedexService.getPokemonList(151).subscribe((result) =>
    {
      this.fightersList = result;

      this.isReadyToBeDisplayed = true;
    });
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
