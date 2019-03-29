import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpHandler } from '@angular/common/http';

import { ArenaComponent } from './arena.component';
import { Pokemon } from "../classes/pokemon";
import { Fight } from "../classes/fight";

describe('ArenaComponent', () => {
  let component: ArenaComponent;
  let fixture: ComponentFixture<ArenaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArenaComponent ],
      providers:[
        RouterModule,
        HttpClient,
        HttpHandler
      ],
      imports: [ RouterTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArenaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', async(() => {
    expect(component).toBeTruthy();
  }));

  // it('#pauseFight() should switch pause button\' state', () => {
  //   fixture.detectChanges();
  //   let button = fixture.nativeElement.querySelector('#pauseBtn')
  //   expect(document.querySelector("#pauseBtn").textContent === "Start fight").toBe(true);

  //   button.click();
  //   fixture.detectChanges();
    
  //   expect(document.querySelector("#pauseBtn").textContent === "Pause fight").toBe(true);

  //   button.click();
  //   fixture.detectChanges();
    
  //   expect(document.querySelector("#pauseBtn").textContent === "Start fight").toBe(true);
  // });

  // it('#restartFight() should restart the fight', () => {
  //   component.ngOnInit();

  //   // Start the fight if it's paused (is paused by default)
  //   component.pauseFight();

  //   const initialFight: Fight = component.fight;

  //   component.restartFight();

  //   const currentFight: Fight = component.fight;

  //   expect(initialFight === currentFight).toBe(false);
  // });

  // it('#restartFight() should clear logs after restarting the fight', () => {
  //   component.ngOnInit();

  //   // Start the fight if it's paused (is paused by default)
  //   component.pauseFight();

  //   const initialFightLogs: object[] = component.fightLogs;

  //   component.restartFight();

  //   const currentFightLogs: object[] = component.fightLogs;

  //   expect(initialFightLogs === currentFightLogs).toBe(false);
  // });

  // it('#redirectToOpponentsMenu() should redirect to opponentsMenu', fakeAsync(() => {
  //   component.ngOnInit();

  //   component.redirectToOpponentsMenu();
  //   tick();
  //   expect(location.pathname).toBe('/fighters-menu');
  // }));
});
