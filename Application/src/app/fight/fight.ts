import {Pokemon} from '../pokemon/pokemon'

export class Fight {
    firstPokemon: Pokemon;
    secondPokemon: Pokemon;
    winner: Pokemon = undefined;
    hasStarted: boolean = false;
    isOver: boolean = false;
    logs: string[] = [];
    isPaused: boolean = true;

    constructor(firstPokemon: Pokemon, secondPokemon: Pokemon){
        this.firstPokemon = firstPokemon;
        this.secondPokemon = secondPokemon;
    }

	beforeStartChecks() {
		if(this.hasStarted) {
            this.logs.push("Fight has already started.");
			return;
		}

		if(!this.checkPokemonsStats()) {
            this.logs.push("Fight hasn't started because one of the fighters doesn't meet requirements.");
            return;
		}
	}

    checkPokemonsStats(): boolean {
	    if (this.firstPokemon.health <= 0 || this.secondPokemon.health <= 0) {
            return false;
        }
        return true;
    }

    start(callback) {
        this.hasStarted = true;

        const currentFight = this;

        var interval = setInterval(() => {
            var haveHealthLeft: boolean = currentFight.firstPokemon.health > 0 && currentFight.secondPokemon.health > 0;

            if(!this.isPaused){
                if(haveHealthLeft){
                    if(currentFight.isWon()) {
                        clearInterval(interval);
                        return callback(currentFight);
                    }
                
                    currentFight.attackRound();                    
                } else {
                    clearInterval(interval);
                    return callback(currentFight);
                }
            }
        }, 1000);
    }

    attackRound(){
        this.firstAttack();
        if(this.isWon()) return;
        this.riposte();
    }

    isWon(): boolean{
        if(this.firstPokemon.health <= 0) {
            this.winner = this.secondPokemon;
            this.logs.push(`${this.winner.name} wins!`);
            this.isOver = true;
            return true;
        } else if(this.secondPokemon.health <= 0) {
            this.winner = this.firstPokemon;
            this.logs.push(`${this.winner.name} wins!`);
            this.isOver = true;
            return true;
        }

        return false;
    }

    firstAttack(){
        if(this.isOver) return;

        this.hasStarted = true;

        if(this.firstPokemon.speed >= this.secondPokemon.speed) {
            this.secondPokemon.health -= this.firstPokemon.attack;
            this.logs.push(`${this.secondPokemon.name} took ${this.firstPokemon.attack} damages from ${this.firstPokemon.name}.`);
        } else {
            this.firstPokemon.health -= this.secondPokemon.attack;
            this.logs.push(`${this.firstPokemon.name} took ${this.secondPokemon.attack} damages from ${this.secondPokemon.name}.`);
        }
    }

    riposte(){
        if(!this.hasStarted || this.isOver) return;

        if(this.firstPokemon.speed >= this.secondPokemon.speed) {
            this.firstPokemon.health -= this.secondPokemon.attack;
            this.logs.push(`${this.firstPokemon.name} took ${this.secondPokemon.attack} damages from ${this.secondPokemon.name}.`);
        } else {
            this.secondPokemon.health -= this.firstPokemon.attack;
            this.logs.push(`${this.secondPokemon.name} took ${this.firstPokemon.attack} damages from ${this.firstPokemon.name}.`);
        }
    }
}