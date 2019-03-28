import { Component, ViewEncapsulation } from '@angular/core';
import { formatDate, DatePipe, DecimalPipe } from '@angular/common';
import {Pokemon} from '../pokemon/pokemon'
import {Skill} from '../skill/skill'
import {Fight} from '../fight/fight'
import { LineToLineMappedSource } from 'webpack-sources';


@Component({
  selector: 'app-arena',
  templateUrl: './arena.component.html',
  styleUrls: ['./arena.component.css'],
  providers: [DatePipe, DecimalPipe],
  encapsulation: ViewEncapsulation.None,
})
export class ArenaComponent {
  topOpponent: Pokemon;
  bottomOpponent: Pokemon;
  fight: Fight;
  fightLogs: object[] = [];
  startDate: Date;
  intervalIsPaused: boolean = true;
  topOpponentBlinking: string = 'block';
  bottomOpponentBlinking: string = 'block';
  fightRoundInterval: NodeJS.Timer;

  constructor(private datePipe: DatePipe, private decimalPipe: DecimalPipe){
    this.initFight();
    this.startFight();
  }

  private initFight(): void{

    const thundershock: Skill = new Skill('thundershock', 40, 100);
    const thunder: Skill = new Skill('thunder', 120, 70);
    const vineWhip: Skill = new Skill('vine whip', 35, 100);
    const powerWhip: Skill = new Skill('power whip', 120, 85);

    this.topOpponent = new Pokemon("Bulbasaur", 1, 45, 45, 49, 49, 65, 45, [vineWhip, powerWhip]);
    this.bottomOpponent = new Pokemon("Pikachu", 1, 35, 90, 55, 55, 50, 50, [thundershock, thunder]);

    this.fight = new Fight(this.topOpponent, this.bottomOpponent);
    this.fightLogs = [];
    this.intervalIsPaused = true;
  }

  private startFight(): void
  {
    this.startDate = new Date();
    this.fightLogs.push({type : 'start', topOpponent : this.topOpponent.name, bottomOpponent : this.bottomOpponent.name});

    const firstToAttack: Pokemon = this.topOpponent.speed >= this.bottomOpponent.speed ? this.topOpponent : this.bottomOpponent;
    const secondToAttack: Pokemon = this.topOpponent.speed < this.bottomOpponent.speed ? this.topOpponent : this.bottomOpponent;

    this.handleFight(firstToAttack, secondToAttack);
  }

  
  private handleFight(attacker: Pokemon, attacked: Pokemon): void
  {
    this.fightRoundInterval = setInterval(() => 
    {
      if(this.intervalIsPaused) return;

      this.intervalIsPaused = true;

      this.fight.fightProcess(attacker, attacked, this.fightLogs, (hasHit: boolean, damages: number, isDown: boolean) => 
      {
        if(hasHit === false)
        {
          const tmpOpponent = attacker;
          attacker = attacked;
          attacked = tmpOpponent;

          if(this.fight.isPaused) return;

          return this.intervalIsPaused = false;
        }

        this.fight.fightAnimation(attacked, damages, () =>
        {
          if(isDown)
          {
            this.fightLogs.push({type : 'faint', pokemonName : attacked.name});
            this.fightLogs.push({type : 'win', pokemonName : attacker.name});

            return clearInterval(this.fightRoundInterval);
          }
          
          const tmpOpponent = attacker;
          attacker = attacked;
          attacked = tmpOpponent;

          if(this.fight.isPaused) return;

          this.intervalIsPaused = false;
        });
      });
    }, 1000);
  }

  pauseFight() : void{
    if(this.fight.isPaused) {
      this.fight.isPaused = false;
      this.intervalIsPaused = false;
    } else {
      this.fight.isPaused = true;
      this.intervalIsPaused = true;
    }
  }  

  restartFight(): void {
    clearInterval(this.fightRoundInterval);
    this.initFight();
    this.startFight();
  }
}
