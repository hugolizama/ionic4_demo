import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerPostPageRoutingModule } from './ver-post-routing.module';

import { VerPostPage } from './ver-post.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerPostPageRoutingModule
  ],
  declarations: [VerPostPage],
  providers: [
  ]
})
export class VerPostPageModule {}
