import { Component, Input, HostListener, OnInit, OnChanges, Output, EventEmitter } from '@angular/core';
import {Pokemon} from '../pokemon/pokemon'
import {Fight} from '../fight/fight'


@Component({
  selector: 'app-arena',
  templateUrl: './arena.component.html',
  styleUrls: ['./arena.component.css']
})
export class ArenaComponent implements OnInit, OnChanges {
  firstPokemon: Pokemon = undefined;
  secondPokemon: Pokemon = undefined;
  fight: Fight = undefined;
  fightInProgress: boolean = true;
  fightLogs: string[] = [""];
  fightIsPaused: boolean = true;

  @Output() roundDoneAlert = new EventEmitter<any>();

  constructor(){
    this.firstPokemon = new Pokemon("Pikachu", 200, 90, 50, 40, 50, 50);
    this.secondPokemon = new Pokemon("Bulbasaur", 200, 45, 65, 49, 65, 45);
    this.fight = new Fight(this.firstPokemon, this.secondPokemon);

    var interval = setInterval(() => {
      if(!this.fightIsPaused){
        if(this.fight.round()){
          clearInterval(interval);
          this.fightInProgress = !this.fight.isOver;  
          this.fight.isPaused = this.fightIsPaused;
          this.fightLogs = this.fightLogs.concat(this.fight.logs);
          return;
        }      
        
        this.fightLogs = this.fightLogs.concat(this.fight.logs);
      }
    }, 1000);
  }

  onClickMe(fight: Fight){
    this.fightIsPaused = !this.fightIsPaused;
    fight.isPaused = this.fightIsPaused;
  }

  ngOnInit(): void {
    
  }

  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    //console.log(changes);
  }
}
