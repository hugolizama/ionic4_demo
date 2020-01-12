import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EncriptarPageRoutingModule } from './encriptar-routing.module';

import { EncriptarPage } from './encriptar.page';

import { AES256 } from '@ionic-native/aes-256/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EncriptarPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [EncriptarPage],
  providers: [
    AES256
  ]
})
export class EncriptarPageModule {}
