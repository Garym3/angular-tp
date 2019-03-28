import {Pokemon} from '../classes/pokemon'
import {Skill} from '../classes/skill'
import { TimeInterval } from 'rxjs';
import { callbackify } from 'util';

export class Fight {
    firstOpponent: Pokemon = undefined;
    secondOpponent: Pokemon = undefined;
    winner: Pokemon = undefined;
    hasStarted: boolean = false;
    isOver: boolean = false;
    logs: string[] = [""];
    isPaused: boolean = true;
    roundCount: number = 0;

    constructor(firstOpponent: Pokemon, secondOpponent: Pokemon)
    {
      this.firstOpponent = firstOpponent;
      this.secondOpponent = secondOpponent;
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
	    return this.firstOpponent.health <= 0 || this.secondOpponent.health <= 0;
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
        if(this.firstOpponent.health <= 0) {
            this.winner = this.secondOpponent;
            this.logs.push(`<h3>${this.firstOpponent.name} is K.O.!</h3>`);
        } else if(this.secondOpponent.health <= 0) {
            this.winner = this.firstOpponent;
            this.logs.push(`<h3>${this.secondOpponent.name} is K.O.!</h3>`);
        } else {
            return false;
        }

        this.logs.push(`<h2>${this.winner.name} wins!</h2>`);
        this.isOver = true;

        return this.isOver;
    }

    riposte(callback: any){
        if(!this.hasStarted || this.isOver) return;

        if(this.firstOpponent.speed >= this.secondOpponent.speed) {
            this.damagePokemon(this.secondOpponent, this.firstOpponent, callback);
        } else {
            this.damagePokemon(this.firstOpponent, this.secondOpponent, callback);
        }
    }

    launchAttack(callback: any){
        if(this.isOver) return;

        this.hasStarted = true;

        if(this.firstOpponent.speed >= this.secondOpponent.speed) {
            this.damagePokemon(this.firstOpponent, this.secondOpponent, callback);
            return this.riposte(callback);
        } else {
            this.damagePokemon(this.secondOpponent, this.firstOpponent, callback);
            return this.riposte(callback);
        }
    }

    damagePokemon(damageFrom: Pokemon, damageTarget: Pokemon, callback: any){

        const newCurrentHp: number = (damageTarget.health - damageFrom.attack) < 0 ? 0 : damageTarget.health - damageFrom.attack;

        const interval = setInterval(() => {
            if(damageTarget.health === newCurrentHp) {
                clearInterval(interval);
                return callback();
            }

            damageTarget.health -= 1;
        }, 100);


        this.logs.push(`${damageTarget.name} took ${damageFrom.attack} damages from ${damageFrom.name}.<br>`);
    }

    /****************************************************************************************************/
    /****************************************************************************************************/

    fightAttack(attackingOpponent: Pokemon, attackedOpponent: Pokemon, callback)
    {
      const randomSkill: number = Math.round(Math.random());

      document.getElementById('logsList').innerHTML +=  `<div class="logsListElement"><span class="pokemon">${attackingOpponent.name}</span> uses <span class="attack">${attackingOpponent.skills[randomSkill].name}</span></div>`;
      document.getElementById('logsList').scrollTop = document.getElementById('logsList').scrollHeight;

      if(this.checkIfAttackHits(attackingOpponent.skills[randomSkill]) == false)
      {
        document.getElementById('logsList').innerHTML += `<div class="logsListElement"><span class="pokemon">${attackingOpponent.name}</span> misses !</div></br>`;
        document.getElementById('logsList').scrollTop = document.getElementById('logsList').scrollHeight;

        setTimeout(() =>
        {
          return this.fightAttack(attackedOpponent, attackingOpponent, callback);

        }, 1000);
      }

      else
      {
        const damages: number = this.calculateDamages(attackingOpponent, attackingOpponent.skills[randomSkill], attackedOpponent);

        document.getElementById('logsList').innerHTML += `<div class="logsListElement"><span class="pokemon">${attackedOpponent.name}</span> takes <span class="damages">${damages}</span> damages !</div></br>`;
        document.getElementById('logsList').scrollTop = document.getElementById('logsList').scrollHeight;

        const newCurrentHp: number = attackedOpponent.health - damages < 0 ? 0 : attackedOpponent.health - damages;

        var isTobeHidden: boolean = true;
        var blinkCounter: number = 0;

        const blinkInterval = setInterval(() =>
        {
          if(attackedOpponent === this.firstOpponent)
          {
            isTobeHidden
            ? document.getElementById('topOpponentGif').style.display = 'none'
            : document.getElementById('topOpponentGif').removeAttribute('style');
          }

          else
          {
            isTobeHidden
            ? document.getElementById('bottomOpponentGif').style.display = 'none'
            : document.getElementById('bottomOpponentGif').removeAttribute('style');
          }

          isTobeHidden = isTobeHidden ? false : true;

          if((blinkCounter += 1) === 4)
          {
            clearInterval(blinkInterval);
          }
        }, 125);

        const takeOffHpInterval = setInterval(() =>
        {
          attackedOpponent.health -= 1;

          if(attackedOpponent.health === newCurrentHp)
          {
            clearInterval(takeOffHpInterval);

            if(attackedOpponent.health === 0)
            {
              document.getElementById('logsList').innerHTML += `<div class="logsListElement"><span class="pokemon">${attackedOpponent.name}</span> fainted !</div>`;
              document.getElementById('logsList').innerHTML += `<div class="logsListElement"><span class="pokemon">${attackingOpponent.name}</span> wins !</div>`;
              document.getElementById('logsList').scrollTop = document.getElementById('logsList').scrollHeight;

              attackedOpponent === this.firstOpponent
              ? document.getElementById('topOpponentGif').style.display = 'none'
              : document.getElementById('bottomOpponentGif').style.display = 'none';

              return callback(true);
            }

            else
            {
              setTimeout(() =>
              {
                return callback(false);

              }, 1000);
            }
          }

        }, 100);
      }
    }

    /****************************************************************************************************/
    /****************************************************************************************************/

    checkIfAttackHits(currentAttack: Skill) : boolean
    {
      return Math.floor(Math.random() * 100) < currentAttack.accuracy;
    }

    /****************************************************************************************************/
    /****************************************************************************************************/

    calculateDamages(attackingOpponent: Pokemon, currentAttack: Skill, attackedOpponent: Pokemon) : number
    {
      return (Math.floor(Math.floor(Math.floor((2 * attackingOpponent.level / 5) + 2) * (attackingOpponent.attack * currentAttack.power) / attackedOpponent.defense) / 50) + 2);
    }
}
