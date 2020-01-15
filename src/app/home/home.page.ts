import { Component, OnInit, NgZone } from '@angular/core';
import { InternetService } from '../services/internet.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  conexionInternet: boolean = undefined;

  constructor(public internetService: InternetService, private ngZone: NgZone) {
    this.internetService.getEstadoConexionInternet()
      .subscribe((resp) => {
        this.ngZone.run(() => {
          this.conexionInternet = resp;
          console.log(this.conexionInternet);
        });
      });
  }

  ngOnInit() {
  }
}
