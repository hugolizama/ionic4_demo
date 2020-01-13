import { Component, OnInit } from '@angular/core';
import { ApiKiuvoxService } from '../services/api-kiuvox.service';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  conexionInternet: boolean;
  algo: string;

  constructor(private apiKiuvox: ApiKiuvoxService) {
  }

  ngOnInit() {
    /*this.apiKiuvox.getEstadoInternet()
    .pipe(debounceTime(300))
      .subscribe((resp: boolean) => {
        this.conexionInternet = resp;
        this.algo = (resp === true) ? 'SI' : 'NO';
        console.log(this.algo);
        console.log(resp);
      });*/

      this.apiKiuvox
        .getEstadoInternet()
        .subscribe({
          next(algo) {
            this.conexionInternet = algo;
            console.log(algo);
          }
        });
  }

}
