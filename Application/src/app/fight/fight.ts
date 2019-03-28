import {Pokemon} from '../classes/pokemon'
import {Skill} from '../classes/skill'

export class Fight {
    firstOpponent: Pokemon;
    secondOpponent: Pokemon;
    logs: string[] = [""];
    isPaused: boolean = true;

    constructor(firstOpponent: Pokemon, secondOpponent: Pokemon)
    {
      this.firstOpponent = firstOpponent;
      this.secondOpponent = secondOpponent;
    }

    /****************************************************************************************************/
    /****************************************************************************************************/

    fightProcess(attackingOpponent: Pokemon, attackedOpponent: Pokemon, fightLogs: object[], callback: any)
    {
      const randomSkill: number = Math.round(Math.random());

      if(this.checkIfAttackHits(attackingOpponent.skills[randomSkill]) == false) 
      {
        fightLogs.push({type : 'miss', pokemonName : attackingOpponent.name});

        fightLogs.push({type : 'attack', pokemonName : attackingOpponent.name, skillName : attackingOpponent.skills[randomSkill].name});

        return callback(false);
      } 

      const damages: number = this.calculateDamages(attackingOpponent, attackingOpponent.skills[randomSkill], attackedOpponent);

      fightLogs.push({type : 'damages', pokemonName : attackedOpponent.name, damages : damages});

      fightLogs.push({type : 'attack', pokemonName : attackingOpponent.name, skillName : attackingOpponent.skills[randomSkill].name});

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
