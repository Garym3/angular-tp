import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

/****************************************************************************************************/

@Component(
{
  selector: 'app-create-pokemon',
  templateUrl: './createPokemon.component.html',
  styleUrls: ['./createPokemon.component.css']
})

/****************************************************************************************************/

export class CreatePokemonComponent implements OnInit
{
  pokemonName: string;
  pokemonHealth: number;
  pokemonSpeed: number;
  pokemonAttack: number;
  pokemonDefense: number;

  constructor(private router: Router){ }

  ngOnInit()
  {
    
  }

  /****************************************************************************************************/
  /****************************************************************************************************/

  redirectToMainMenu(): void
  {
    this.router.navigateByUrl('/');
  }

  /****************************************************************************************************/
  /****************************************************************************************************/

  saveForm()
  {
    console.log(true);
  }
}

/****************************************************************************************************/
