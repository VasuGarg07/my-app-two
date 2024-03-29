import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HoroscopeComponent } from './horoscope.component';

const routes: Routes = [{ path: '', component: HoroscopeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HoroscopeRoutingModule {}
