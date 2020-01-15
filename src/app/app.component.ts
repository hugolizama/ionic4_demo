import { Component } from '@angular/core';

import { Platform, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { InternetService } from './services/internet.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: '/home', icon: 'home', direction: 'root' },
    { title: 'Encriptar', url: '/encriptar', icon: 'lock', direction: 'forward' },
    { title: 'Blog', url: '/blog', icon: 'paper', direction: 'forward' },
    { title: 'Camara', url: '/camara', icon: 'camera', direction: 'forward' },
    { title: 'Enviar correo', url: '/correo', icon: 'mail', direction: 'forward' },

  ];

  sinConexion: any;
  conConexion: any;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public alertController: AlertController,
    private internetService: InternetService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleLightContent();
      this.splashScreen.hide();

      // Segu el estado de la conexion iniciar una prueba
      if (navigator.onLine) {
        this.pruebaDesconexionInternet();
      } else {
        this.pruebaConexionInternet();
      }
    });
  }

  /** Funcion para iniciar la prueba de desconexion de internet */
  pruebaDesconexionInternet() {
    if (this.conConexion !== undefined) {
      this.conConexion.unsubscribe();
    }

    this.sinConexion = this.internetService.pruebaDesconexionInternet()
        .subscribe((resp) => {
          this.internetService.setEstadoConexionInternet(false);
          this.crearAlerta('No hay Internet');
          this.pruebaConexionInternet();
        });
  }

  pruebaConexionInternet() {
    if (this.sinConexion !== undefined) {
      this.sinConexion.unsubscribe();
    }

    this.conConexion = this.internetService.pruebaConexionInternet()
      .subscribe((resp) => {
        this.internetService.setEstadoConexionInternet(true);
        this.crearAlerta('Regreso Internet');
        this.pruebaDesconexionInternet();
      });
  }

  async crearAlerta(mensaje: any) {
    const alert = await this.alertController.create({
      header: 'Notificación',
      message: mensaje,
      buttons: ['OK']
    });

    await alert.present();
  }
}
