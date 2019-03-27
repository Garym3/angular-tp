import { Component, Input, HostListener, OnInit, OnChanges, Output, EventEmitter, OnDestroy } from '@angular/core';
import {Pokemon} from '../pokemon/pokemon'
import {Fight} from '../fight/fight'
import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';
import { TimeInterval } from 'rxjs';


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
  fightIsPaused: boolean = true;

  fightInterval: NodeJS.Timer = null

  constructor(){
    this.initFight();
  }

  pauseFight(fight: Fight) : void{
    this.fightIsPaused = !this.fightIsPaused;
    fight.isPaused = this.fightIsPaused;
  }

  restartFight(): void {    
    if(this.fightInterval != null) clearInterval(this.fightInterval);
    this.initFight();
  }

  private initFight(): void{
    this.firstPokemon = new Pokemon("Pikachu", 200, 90, 50, 40, 50, 50);
    this.secondPokemon = new Pokemon("Bulbasaur", 200, 45, 65, 49, 65, 45);
    this.fight = new Fight(this.firstPokemon, this.secondPokemon);    
    this.fightLogs = [""];
    this.fightInProgress = true;
    this.fightIsPaused = true;

    this.fightInterval = setInterval(() => {
      if(!this.fightIsPaused){
        if(this.fight.round()){
          clearInterval(this.fightInterval);
          this.fightInProgress = !this.fight.isOver;  
          this.fight.isPaused = this.fightIsPaused;
          this.fightLogs = this.fightLogs.concat(this.fight.logs);
          return;
        }      
        
        this.fightLogs = this.fightLogs.concat(this.fight.logs);
      }
    }, 1000);
  }
}
