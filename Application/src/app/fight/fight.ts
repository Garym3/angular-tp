import {Pokemon} from '../pokemon/pokemon'
import { TimeInterval } from 'rxjs';
import { callbackify } from 'util';

export class Fight {
    firstPokemon: Pokemon = undefined;
    secondPokemon: Pokemon = undefined;
    winner: Pokemon = undefined;
    hasStarted: boolean = false;
    isOver: boolean = false;
    logs: string[] = [""];
    isPaused: boolean = true;
    roundCount: number = 0;

    constructor(firstPokemon: Pokemon, secondPokemon: Pokemon){
        this.firstPokemon = firstPokemon;
        this.secondPokemon = secondPokemon;
    }

	beforeStartChecks() {
		if(this.hasStarted) {
            this.logs.push("Fight has already started.<br>");
			return;
		}

		if(!this.checkPokemonsStats()) {
            this.logs.push("Fight hasn't started because one of the fighters doesn't meet requirements.<br>");
            return;
		}
	}

    checkPokemonsStats(): boolean {
	    return this.firstPokemon.health <= 0 || this.secondPokemon.health <= 0;
    }

    round(callback: any): void{
        this.hasStarted = true;
        this.logs = [""];

        if(!this.isPaused){
            if(this.isWon()) return;
        
            this.logs.push(`<b>--------- Round n°${this.roundCount += 1} ---------</b><br>`);
            
            this.launchAttack(callback);
            if(this.isWon()) return callback(this.isOver);
        }
    }

    isWon(): boolean{
        if(this.firstPokemon.health <= 0) {
            this.winner = this.secondPokemon;
            this.logs.push(`<h3>${this.firstPokemon.name} is K.O.!</h3>`);
        } else if(this.secondPokemon.health <= 0) {
            this.winner = this.firstPokemon;
            this.logs.push(`<h3>${this.secondPokemon.name} is K.O.!</h3>`);
        } else {
            return false;
        }

        this.logs.push(`<h2>${this.winner.name} wins!</h2>`);
        this.isOver = true;

        return this.isOver;
    }

    riposte(callback: any){
        if(!this.hasStarted || this.isOver) return;

        if(this.firstPokemon.speed >= this.secondPokemon.speed) {
            this.damagePokemon(this.secondPokemon, this.firstPokemon, callback);
        } else {
            this.damagePokemon(this.firstPokemon, this.secondPokemon, callback);
        }
    }

    launchAttack(callback: any){
        if(this.isOver) return;

        this.hasStarted = true;

        if(this.firstPokemon.speed >= this.secondPokemon.speed) {
            this.damagePokemon(this.firstPokemon, this.secondPokemon, callback);
            return this.riposte(callback);
        } else {
            this.damagePokemon(this.secondPokemon, this.firstPokemon, callback);
            return this.riposte(callback);
        }
    }

    damagePokemon(damageFrom: Pokemon, damageTarget: Pokemon, callback: any){
        
        const newCurrentHp: number = (damageTarget.health - damageFrom.attackPoints) < 0 ? 0 : damageTarget.health - damageFrom.attackPoints;

        const interval = setInterval(() => {
            if(damageTarget.health === newCurrentHp) {
                clearInterval(interval);
                return callback();
            }
            
            damageTarget.health -= 1;
        }, 100);

        
        this.logs.push(`${damageTarget.name} took ${damageFrom.attackPoints} damages from ${damageFrom.name}.<br>`);
    }
}