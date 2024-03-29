import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CocktailMenuComponent } from './cocktail-menu.component';

const routes: Routes = [
  { path: '', component: CocktailMenuComponent, outlet: 'cocktail' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CocktailMenuRoutingModule {}
