import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class MensajeToastService {

  constructor(public toastController: ToastController) { }


  async mostrarToastTiempo(mensaje: string, tiempo: number) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: tiempo * 1000,
      buttons: [
        {
          text: 'Cerrar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    toast.present();
  }
}
