import { Component, ViewEncapsulation } from '@angular/core';
import {Pokemon} from '../pokemon/pokemon'
import {Skill} from '../skill/skill'
import {Fight} from '../fight/fight'


@Component({
  selector: 'app-arena',
  templateUrl: './arena.component.html',
  styleUrls: ['./arena.component.css'],
  encapsulation: ViewEncapsulation.None,
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

    const thundershock: Skill = new Skill('thundershock', 40, 100);
    const thunder: Skill = new Skill('thunder', 120, 70);
    const vineWhip: Skill = new Skill('vine whip', 35, 100);
    const powerWhip: Skill = new Skill('power whip', 120, 85);

    this.firstPokemon = new Pokemon("Bulbasaur", 1, 45, 45, 49, 49, 65, 45, [vineWhip, powerWhip]);
    this.secondPokemon = new Pokemon("Pikachu", 1, 35, 90, 55, 55, 50, 50, [thundershock, thunder]);

    this.fight = new Fight(this.firstPokemon, this.secondPokemon);
    this.fightLogs = [""];
    this.fightInProgress = true;
  }

  private startFight(): void
  {
    this.fightLogs.push(`<div class="logsListElement">A fight begins between <span class="pokemon">${this.firstPokemon.name}</span> and <span class="pokemon">${this.secondPokemon.name}</span> !</div></br>`);

    const firstToAttack: Pokemon = this.firstPokemon.speed >= this.secondPokemon.speed ? this.firstPokemon : this.secondPokemon;
    const secondToAttack: Pokemon = this.firstPokemon.speed < this.secondPokemon.speed ? this.firstPokemon : this.secondPokemon;

    this.handleFight(firstToAttack, secondToAttack);
  }

  private handleFight(attacker: Pokemon, attacked: Pokemon): void
  {
    setTimeout(() =>
    {
      this.fight.fightAttack(attacker, attacked, (fightIsOver) =>
      {
        //this.fightLogs = this.fightLogs.concat(this.fight.logs);

        if(fightIsOver == false)
        {
          this.handleFight(attacked, attacker);
        }

        //return this.fightInProgress = !this.fight.isOver;
      });

    }, 1000);
  }
}
