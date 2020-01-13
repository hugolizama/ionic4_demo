import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network/ngx';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiKiuvoxService {

  urlApiBase = 'http://kiuvox.com/wp-json';
  urlAp = `${this.urlApiBase}/wp/v2`;
  conexionInternet = new Subject<boolean>();

  constructor(private network: Network) { }

  setInternet(estado: boolean) {
    this.conexionInternet.next(estado);
  }

  getEstadoInternet(): Observable<boolean> {
    return this.conexionInternet.asObservable();
  }

  testNoInternet() {
   return this.network.onDisconnect();
  }

  testInternet() {
    return this.network.onConnect();
  }
}
