import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterModule, } from '@angular/router';

import { FightersMenuComponent } from './fightersMenu.component';
import { HttpClientModule } from '@angular/common/http';

describe('FightersMenuComponent', () => {
  let component: FightersMenuComponent;
  let fixture: ComponentFixture<FightersMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        RouterModule,
        HttpClientModule
      ],
      imports: [
        RouterTestingModule
      ],
      declarations: [ FightersMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FightersMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', async(() => {
    expect(component).toBeTruthy();
  }));
});
