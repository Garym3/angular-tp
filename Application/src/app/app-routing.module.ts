import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArenaComponent } from './arena/arena.component';

const routes: Routes = [
  { path: 'arena', component: ArenaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
