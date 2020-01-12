import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EncriptarPage } from './encriptar.page';

const routes: Routes = [
  {
    path: '',
    component: EncriptarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EncriptarPageRoutingModule {}
