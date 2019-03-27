import {Skill} from '../skill/skill'

export class Pokemon {
    name: string;
    level: number;
    health: number;
    speed: number;
    attack: number;
    defense: number;
    specialAttack: number;
    specialDefense: number;
    maxHealth: number;
    mainColor: string;
    skills: Skill[];

    constructor(name: string, level: number, health: number, speed: number, attack: number,
        defense: number, specialAttack: number, specialDefense: number, skills: Skill[]){
        this.name = `${name.charAt(0).toUpperCase()}${name.slice(1).toLowerCase()}`;
        this.level = level;
        this.health = health;
        this.speed = speed;
        this.attack = attack;
        this.defense = defense;
        this.specialAttack = specialAttack;
        this.specialDefense = specialDefense;
        this.maxHealth = this.health;
        this.skills = skills;
    }
}
