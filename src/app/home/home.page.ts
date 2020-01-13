import { Component } from '@angular/core';
import { ApiKiuvoxService } from '../services/api-kiuvox.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  conexionInternet: any;

  constructor(private apiKiuvox: ApiKiuvoxService) {
    this.apiKiuvox.getEstadoInternet()
      .subscribe((resp => {
        this.conexionInternet = resp;
        console.log(this.conexionInternet);
      }));
  }

}
