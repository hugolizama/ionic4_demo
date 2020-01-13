import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ApiKiuvoxService } from './services/api-kiuvox.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'List',
      url: '/list',
      icon: 'list'
    },
    {
      title: 'Encriptar',
      url: '/encriptar',
      icon: 'lock'
    }
  ];

  noInternet: any;
  siInternet: any;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private apiKiuvox: ApiKiuvoxService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      /*this.apiKiuvox.setInternet(true);
      this.testNoInternet();*/
    });
  }

  testNoInternet() {
    if (this.siInternet !== undefined) {
      this.siInternet.unsubscribe();
    }

    this.noInternet = this.apiKiuvox.testNoInternet()
        .subscribe((resp) => {
          console.error('Se fue el internet!!');
          this.apiKiuvox.setInternet(false);

          this.testInternet();
        });
  }

  testInternet() {
    if (this.noInternet !== undefined) {
      this.noInternet.unsubscribe();
    }

    this.siInternet = this.apiKiuvox.testInternet()
      .subscribe((resp) => {
        console.log('Regreso el internet!!');
        this.apiKiuvox.setInternet(true);

        this.testNoInternet();
      });
  }
}
