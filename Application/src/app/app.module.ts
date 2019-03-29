import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { FightersMenuComponent } from './fightersMenu/fightersMenu.component';
import { ArenaComponent } from './arena/arena.component';

import { HttpClientModule } from '@angular/common/http';
import { PokedexService } from './services/pokedex.service';

@NgModule({
  declarations: [
    AppComponent,
    ArenaComponent,
    MenuComponent,
    FightersMenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [PokedexService],
  bootstrap: [AppComponent]
})
export class AppModule { }
