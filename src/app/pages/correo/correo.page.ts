import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { EmailComposer, EmailComposerOptions } from '@ionic-native/email-composer/ngx';
import { MensajeToastService } from '../../services/mensaje-toast.service';

@Component({
  selector: 'app-correo',
  templateUrl: './correo.page.html',
  styleUrls: ['./correo.page.scss'],
})
export class CorreoPage implements OnInit {

  imagen: any = null;
  mostrarImagen: any = null;

  constructor(public toast: MensajeToastService, private camera: Camera, private correo: EmailComposer) { }

  ngOnInit() {
  }

  capturarImagen() {
    const opciones: CameraOptions = {
      sourceType: this.camera.PictureSourceType.CAMERA,
      destinationType: this.camera.DestinationType.FILE_URI,
      quality: 50,
      correctOrientation: true,
      saveToPhotoAlbum: true
    };

    this.camera.getPicture(opciones)
      .then((imageData) => {
        console.log(imageData);
        this.imagen = imageData;
        this.mostrarImagen = (window as any).Ionic.WebView.convertFileSrc(imageData);

      }, (error) => {
        console.error('Error de imagen: ' + error);
      });
  }


  seleccionarImagen() {
    const options: CameraOptions = {
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.FILE_URI,
      quality: 50
    };

    this.camera.getPicture(options)
      .then((imageData) => {
        this.imagen = imageData;
        this.mostrarImagen = (window as any).Ionic.WebView.convertFileSrc(imageData);

      }, (error) => {
        console.error('Image error: ', error);
      });
  }


  enviarCorreo() {

    this.correo.isAvailable()
      .then((habilitado) => {
        console.log('isAvailable: ', habilitado);

        // this.correo.addAlias('gmail', 'com.google.android.gm');

        const opcionesCorreo: EmailComposerOptions = {
            to: 'hugolizama22@gmail.com',
            cc: '',
            bcc: [],
            attachments: [
              this.imagen
            ],
            subject: 'Eviando correo desde Ionic',
            body: 'Este es un correo de prueba desde Ionic',
            isHtml: true,
            // app: 'gmail'
          };

        this.correo.open(opcionesCorreo)
          .then((enviado) => {
            console.log(enviado);
            this.toast.mostrarToastTiempo('Redacción de correo finalizado.', 5);
          })
          .catch();

      }).catch((error) => {
        console.error('Error isAvailable: ', error);
      });
  }
}
