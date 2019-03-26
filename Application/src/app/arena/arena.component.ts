import { Component, Input, HostListener } from '@angular/core';
import {Pokemon} from '../pokemon/pokemon'
import {Fight} from '../fight/fight'


@Component({
  selector: 'app-arena',
  templateUrl: './arena.component.html',
  styleUrls: ['./arena.component.css']
})
export class ArenaComponent {
  firstPokemon: Pokemon = undefined;
  secondPokemon: Pokemon = undefined;
  fight: Fight = undefined;
  isOver: string = "No";
  fightLogs: string = "";
  fightIsPaused: boolean = true;

  constructor(){
    this.firstPokemon = new Pokemon("Pikachu", 100, 90, 50, 40, 50, 50);
    this.secondPokemon = new Pokemon("Bulbizar", 100, 45, 65, 49, 65, 45);
    this.fight = new Fight(this.firstPokemon, this.secondPokemon);

    this.fight.start((currentFight: Fight) => {
      this.EndArenaFight(currentFight);
    });
  }

  private EndArenaFight(currentFight: Fight) {
    for (let i = 0; i < currentFight.logs.length; i++) {
      this.fightLogs = this.fightLogs.concat(`<div>${currentFight.logs[i]}</div>`);
    }
    this.isOver = currentFight.isOver ? "Yes" : "No";
  }

  onClickMe(fight: Fight){
    this.fightIsPaused = !this.fightIsPaused;
    fight.isPaused = this.fightIsPaused;
  }
}
