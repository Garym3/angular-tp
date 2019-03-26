import { Component } from '@angular/core';
import {Pokemon} from './pokemon/pokemon'
import {Fight} from './fight/fight'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular TP';

  constructor() { 
  }
}
