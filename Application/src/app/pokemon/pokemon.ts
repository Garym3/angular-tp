export class Pokemon {
    name: string;
    health: number;
    speed: number;
    attackPoints: number;
    defense: number;
    specialAttack: number;
    specialDefense: number;
    maxHealth: number;

    constructor(name: string, health: number, 
        speed: number, attack: number, defense: number,
        specialAttack: number, specialDefense: number){
        this.name = name;
        this.health = health;
        this.speed = speed;
        this.attackPoints = attack;
        this.defense = defense;
        this.specialAttack = specialAttack;
        this.specialDefense = specialDefense;
        this.maxHealth = this.health;
    }
}