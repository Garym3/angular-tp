export class Skill
{
  name: string;
  power: number;
  accuracy: number;

  constructor(name: string, power: number, accuracy: number)
  {
    this.name = `${name.charAt(0).toUpperCase()}${name.slice(1).toLowerCase()}`;
    this.power = power < 1 ? 1 : power;
    this.accuracy = accuracy < 1 ? 1 : accuracy > 100 ? 100 : accuracy;
  }
}
