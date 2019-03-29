import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe, DecimalPipe } from '@angular/common';
import { Observable } from 'rxjs';

import { Pokemon } from '../classes/pokemon';
import { PokedexService } from '../services/pokedex.service';
import { Skill } from '../classes/skill';
import { Fight } from '../fight/fight';


@Component({
  selector: 'app-arena',
  templateUrl: './arena.component.html',
  styleUrls: ['./arena.component.css'],
  providers: [DatePipe, DecimalPipe]
})
export class ArenaComponent implements OnInit {
  topOpponent: Pokemon = null;
  bottomOpponent: Pokemon = null;
  fight: Fight;
  fightLogs: object[] = [];
  startDate: Date;
  intervalIsPaused: boolean = true;
  rounds: Observable<Array<any>>;
  topOpponentBlinking: string = 'block';
  bottomOpponentBlinking: string = 'block';
  fightRoundInterval: NodeJS.Timer;

  constructor(private router: Router, private route: ActivatedRoute, private pokedexService: PokedexService)
  {

  }

  ngOnInit(): void
  {
    this.route.queryParams.subscribe(params =>
    {
      const firstFighterId: number = params['first'];
      const secondFighterId: number = params['second'];

      this.pokedexService.getPokemon(firstFighterId).subscribe((result) =>
      {
        this.topOpponent = result;

        this.pokedexService.getPokemon(secondFighterId).subscribe((result) =>
        {
          this.bottomOpponent = result;

          this.initFight();
          this.startFight();
        });
      });
    });
  }

  redirectToOpponentsMenu(): void
  {
    clearInterval(this.fightRoundInterval);
    this.router.navigateByUrl('/fighters-menu');
  }

  private initFight(): void
  {
    this.topOpponent.health = this.topOpponent.maxHealth;
    this.bottomOpponent.health = this.bottomOpponent.maxHealth;

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


  private handleFight(attacker: Pokemon, attacked: Pokemon)
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

  restartFight(): void
  {
    this.fight.isPaused = true;

    clearInterval(this.fightRoundInterval);
    this.initFight();
    this.startFight();
  }
}
