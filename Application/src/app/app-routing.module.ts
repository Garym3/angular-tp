import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { ArenaComponent } from './arena/arena.component';
import { FightersMenuComponent } from './fightersMenu/fightersMenu.component';
import { CreatePokemonComponent } from './createPokemon/createPokemon.component';

const routes: Routes = [
  { path: '', component: MenuComponent },
  { path: 'fighters-menu', component: FightersMenuComponent },
  { path: 'create-pokemon', component: CreatePokemonComponent },
  { path: 'arena', component: ArenaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
