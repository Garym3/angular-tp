import {Pokemon} from '../pokemon/pokemon'
import { TimeInterval } from 'rxjs';

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

    round(): boolean{
        this.hasStarted = true;
        this.logs = [""];

        if(!this.isPaused){
            if(this.isWon()) return true;
        
            this.logs.push(`<b>--------- Round n°${this.roundCount += 1} ---------</b><br>`);
            
            this.firstAttack();
            if(this.isWon()) return true;
            this.riposte();
        }

        return false;
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

        return true;
    }

    firstAttack(){
        if(this.isOver) return;

        this.hasStarted = true;

        if(this.firstPokemon.speed >= this.secondPokemon.speed) {
            this.damagePokemon(this.firstPokemon, this.secondPokemon);
        } else {
            this.damagePokemon(this.secondPokemon, this.firstPokemon);
        }
    }

    riposte(){
        if(!this.hasStarted || this.isOver) return;

        if(this.firstPokemon.speed >= this.secondPokemon.speed) {
            this.damagePokemon(this.secondPokemon, this.firstPokemon);
        } else {
            this.damagePokemon(this.firstPokemon, this.secondPokemon);
        }
    }

    damagePokemon(damageFrom: Pokemon, damageTarget: Pokemon){
        damageTarget.health = (damageTarget.health - damageFrom.attackPoints) < 0 ? 0 : damageTarget.health - damageFrom.attackPoints;
        this.logs.push(`${damageTarget.name} took ${damageFrom.attackPoints} damages from ${damageFrom.name}.<br>`);
    }
}