import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerPostPage } from './ver-post.page';

const routes: Routes = [
  {
    path: '',
    component: VerPostPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerPostPageRoutingModule {}
