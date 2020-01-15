import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-camara',
  templateUrl: './camara.page.html',
  styleUrls: ['./camara.page.scss'],
})
export class CamaraPage implements OnInit {

  imagen: any = null;
  mostrarImagen: any = null;

  constructor(private camera: Camera) { }

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
        this.mostrarImagen = ( window as any).Ionic.WebView.convertFileSrc(imageData);

      }, (error) => {
        console.error('Error de imagen: ' + error);
      });
  }

  eliminarImagen() {
    this.imagen = null;
    this.mostrarImagen = null;

    /** Solo IOS */
    /*this.camera.cleanup()
      .then((clean) => {
        console.log('Limpieza hecha');
      }, (error) => {
        console.error('Error de limpiar: ', error);
      });*/
  }

}
