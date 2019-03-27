import { Component } from '@angular/core';
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
  fightInProgress: boolean = true;
  fightLogs: string[] = [""];

  constructor(){
    this.initFight();
    this.startFight();
  }

  pauseFight() : void{
    // this.fight.isPaused = this.fight.isPaused;

    if(this.fight.isPaused) {
      this.fight.isPaused = false;
      this.startFight();
    } else {
      this.fight.isPaused = true;
    }
  }

  restartFight(): void {
    this.initFight();
    this.startFight();
  }

  private initFight(): void{
    this.firstPokemon = new Pokemon("Pikachu", 200, 90, 50, 40, 50, 50);
    this.secondPokemon = new Pokemon("Bulbasaur", 200, 45, 65, 49, 65, 45);
    this.fight = new Fight(this.firstPokemon, this.secondPokemon);    
    this.fightLogs = [""];
    this.fightInProgress = true;
  }

  private startFight(): void {
    this.fight.round((isOver: boolean) => {

      this.fightLogs = this.fightLogs.concat(this.fight.logs);
      if(isOver){
        this.fightInProgress = !this.fight.isOver;
        return;
      }

      setTimeout(() => {
        this.startFight();
      }, 1000);
    });
  }
}
