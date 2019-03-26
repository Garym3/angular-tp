export class Pokemon {
    name: string;
    health: number;
    speed: number;
    attack: number;
    defense: number;
    specialAttack: number;
    specialDefense: number;

    constructor(name: string, health: number, 
        speed: number, attack: number, defense: number,
        specialAttack: number, specialDefense: number){
        this.name = name;
        this.health = health;
        this.speed = speed;
        this.attack = attack;
        this.defense = defense;
        this.specialAttack = specialAttack;
        this.specialDefense = specialDefense;
    }
}