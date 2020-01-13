import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network/ngx';
import { Observable, merge } from 'rxjs';
import { map, mapTo } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiKiuvoxService {

  urlApiBase = 'http://kiuvox.com/wp-json';
  urlAp = `${this.urlApiBase}/wp/v2`;
  conexionInternet$: Observable<boolean> = undefined;

  constructor(private network: Network) {
    this.conexionInternet$ = new Observable((observer) => {
      observer.next(true);
    }).pipe(mapTo(true));

    this.conexionInternet$ = merge(
      this.network.onConnect().pipe(mapTo(true)),
      this.network.onDisconnect().pipe(mapTo(false))
    );

    console.log('Servicio inyectado');
  }


  setInternet(estado: boolean) {
  }

  getEstadoInternet(): Observable<boolean> {
    return this.conexionInternet$;
  }

  testNoInternet() {
   return this.network.onDisconnect();
  }

  testInternet() {
    return this.network.onConnect();
  }
}
