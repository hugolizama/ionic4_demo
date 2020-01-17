import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// imports
import { HttpClientModule } from '@angular/common/http';

// servicios
import { ApiKiuvoxService } from './services/api-kiuvox.service';
import { MensajeToastService } from './services/mensaje-toast.service';

// componentes
import { Network } from '@ionic-native/network/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx';



@NgModule({
  declarations: [AppComponent],
  entryComponents: [
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    ApiKiuvoxService,
    MensajeToastService,
    Network,
    Camera,
    EmailComposer
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
