import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network/ngx';
import { Observable, BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class InternetService {

  public estadoConexionInternet: BehaviorSubject<boolean>;

  constructor(private network: Network) {
    this.estadoConexionInternet = new BehaviorSubject<boolean>(navigator.onLine);
  }

  setEstadoConexionInternet(estado: boolean): void {
    this.estadoConexionInternet.next(estado);
  }

  getEstadoConexionInternet(): Observable<boolean> {
    return this.estadoConexionInternet.asObservable();
  }

  pruebaDesconexionInternet() {
   return this.network.onDisconnect();
  }

  pruebaConexionInternet() {
    return this.network.onConnect();
  }
}
