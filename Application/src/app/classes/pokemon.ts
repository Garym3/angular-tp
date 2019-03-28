import { Skill } from './skill'

export class Pokemon
{
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

  constructor(name: string, level: number, health: number, speed: number, attack: number, defense: number, specialAttack: number, specialDefense: number, skills: Skill[])
  {
    this.name = `${name.charAt(0).toUpperCase()}${name.slice(1).toLowerCase()}`;
    this.level = level < 1 ? 1 : level > 100 ? 100 : level;
    this.health = health < 1 ? 1 : health > 999 ? 999 : health;
    this.speed = speed < 1 ? 1 : speed > 999 ? 999 : speed;
    this.attack = attack < 1 ? 1 : attack > 999 ? 999 : attack;
    this.defense = defense < 1 ? 1 : defense > 999 ? 999 : defense;
    this.specialAttack = specialAttack < 1 ? 1 : specialAttack > 999 ? 999 : specialAttack;
    this.specialDefense = specialDefense < 1 ? 1 : specialDefense > 999 ? 999 : specialDefense;
    this.maxHealth = this.health;
    this.skills = skills;
  }
}
