export class Pokemon {
    name: string;
    health: number;
    speed: number;
    attackPoints: number;
    defense: number;
    specialAttack: number;
    specialDefense: number;
    maxHealth: number;
    mainColor: string;

    constructor(name: string, health: number, speed: number, attack: number,
        defense: number, specialAttack: number, specialDefense: number){
        this.name = `${name.charAt(0).toUpperCase()}${name.slice(1).toLowerCase()}`;
        this.health = health;
        this.speed = speed;
        this.attackPoints = attack;
        this.defense = defense;
        this.specialAttack = specialAttack;
        this.specialDefense = specialDefense;
        this.maxHealth = this.health;
    }
}