import {Pokemon} from '../pokemon/pokemon'
import {Skill} from '../skill/skill'

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

    fightProcess(attackingOpponent: Pokemon, attackedOpponent: Pokemon, fightLogs: object[], callback: any)
    {
      const randomSkill: number = Math.round(Math.random());

      fightLogs.push({type : 'attack', pokemonName : attackingOpponent.name, skillName : attackingOpponent.skills[randomSkill].name});

      if(this.checkIfAttackHits(attackingOpponent.skills[randomSkill]) == false) 
      {
        fightLogs.push({type : 'miss', pokemonName : attackingOpponent.name});
        return callback(false);
      } 

      const damages: number = this.calculateDamages(attackingOpponent, attackingOpponent.skills[randomSkill], attackedOpponent);

      fightLogs.push({type : 'damages', pokemonName : attackedOpponent.name, damages : damages});

      const isDown:boolean = attackedOpponent.health - damages <= 0;

      return callback(true, damages, isDown);
    }

    /****************************************************************************************************/
    /****************************************************************************************************/

    fightAnimation(attacked: Pokemon, damages: number, callback: any)
    {
      const attackedCurrentHealth = attacked.health - damages  < 0 ? 0 : attacked.health - damages;
      const totalTime = (attacked.maxHealth - attackedCurrentHealth) * 0.1 > 2 ? 2 : (attacked.maxHealth - attackedCurrentHealth) * 0.1;
      const intervalTime = totalTime / (attacked.maxHealth - attackedCurrentHealth);

      console.log(Math.floor(intervalTime * 1000));

      const animationInterval = setInterval(() =>
      {
        if(attacked.health === attackedCurrentHealth)
        {
          clearInterval(animationInterval);
          return callback();
        }
        
        attacked.health -= 1;
      }, Math.floor(intervalTime * 1000));
    }
    
    /****************************************************************************************************/
    /****************************************************************************************************/

    fightAttack(attacker: Pokemon, attacked: Pokemon, callback)
    {
      const randomSkill: number = Math.round(Math.random());

      document.getElementById('logsList').innerHTML +=  `<div class="logsListElement"><span class="pokemon">${attacker.name}</span> uses <span class="attack">${attacker.skills[randomSkill].name}</span></div>`;
      document.getElementById('logsList').scrollTop = document.getElementById('logsList').scrollHeight;

      if(this.checkIfAttackHits(attacker.skills[randomSkill]) == false)
      {
        document.getElementById('logsList').innerHTML += `<div class="logsListElement"><span class="pokemon">${attacker.name}</span> misses !</div></br>`;
        document.getElementById('logsList').scrollTop = document.getElementById('logsList').scrollHeight;

        setTimeout(() =>
        {
          return this.fightAttack(attacked, attacker, callback);

        }, 1000);
      }

      else
      {
        const damages: number = this.calculateDamages(attacker, attacker.skills[randomSkill], attacked);

        document.getElementById('logsList').innerHTML += `<div class="logsListElement"><span class="pokemon">${attacked.name}</span> takes <span class="damages">${damages}</span> damages !</div></br>`;
        document.getElementById('logsList').scrollTop = document.getElementById('logsList').scrollHeight;

        const newCurrentHp: number = attacked.health - damages < 0 ? 0 : attacked.health - damages;

        var isTobeHidden: boolean = true;
        var blinkCounter: number = 0;

        const blinkInterval = setInterval(() =>
        {
          if(attacked === this.firstOpponent)
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
          attacked.health -= 1;

          if(attacked.health === newCurrentHp)
          {
            clearInterval(takeOffHpInterval);

            if(attacked.health === 0)
            {
              document.getElementById('logsList').innerHTML += `<div class="logsListElement"><span class="pokemon">${attacked.name}</span> fainted !</div>`;
              document.getElementById('logsList').innerHTML += `<div class="logsListElement"><span class="pokemon">${attacker.name}</span> wins !</div>`;
              document.getElementById('logsList').scrollTop = document.getElementById('logsList').scrollHeight;

              attacked === this.firstOpponent
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
