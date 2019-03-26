import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArenaComponent } from './arena.component';
import { Pokemon } from "../pokemon/pokemon";
import { Fight } from "../fight/fight";

describe('ArenaComponent', () => {
  let component: ArenaComponent;
  let fixture: ComponentFixture<ArenaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArenaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArenaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // test("Pokemon should have a name", () => {
  //   const pokemon = new Pokemon("Pikachu", 100, 90, 50, 40, 50, 50);
  //   expect(pokemon.name !== undefined && pokemon.name.length > 0).toBe(true);
  // });

  // test("Pokemon should not have a name", () => {
  //     const pokemon = new Pokemon("", 100, 90, 50, 40, 50, 50);
  //     expect(pokemon.name === undefined || pokemon.name.length <= 0).toBe(true);
  // });

  // test("Fight should start", () => {
  //     const pickachu = new Pokemon("Pikachu", 100, 90, 50, 40, 50, 50);
  //     const bulbizar = new Pokemon("Bulbizar", 100, 45, 65, 49, 65, 45);
  //     const fight = new Fight(pickachu, bulbizar);
  //     fight.start();

  //     expect(fight.hasStarted).toBe(true);
  // });

  // test("Pikachu should have lost", () => {
  //     const pickachu = new Pokemon("Pikachu", 100, 90, 50, 40, 50, 50);
  //     const charizard = new Pokemon("Charizard", 100, 100, 109, 78, 85, 109);
  //     const fight = new Fight(pickachu, charizard);

  //     fight.start();
  //     expect(fight.isOver).toBe(true);
  //     expect(fight.winner === charizard).toBe(true);
  // });

  // test("No riposte before fight has started", () => {
  //     const pickachu = new Pokemon("Pikachu", 100, 90, 50, 40, 50, 50);
  //     const charizard = new Pokemon("Charizard", 100, 100, 109, 78, 85, 109);
  //     const fight = new Fight(pickachu, charizard);

  //     expect(fight.riposte()).toBe(true);
  // });
});
