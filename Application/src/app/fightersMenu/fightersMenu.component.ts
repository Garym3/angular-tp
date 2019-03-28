import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Pokemon } from '../classes/pokemon'

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

  constructor(private router: Router){ }

  redirectToMainMenu(): void
  {
    this.router.navigateByUrl('/');
  }
}

/****************************************************************************************************/
