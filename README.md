## Componentes instalados
* Network: https://ionicframework.com/docs/native/network
* AES256: https://ionicframework.com/docs/native/aes-256
* Camera: https://ionicframework.com/docs/native/camera
* Email Composer: https://ionicframework.com/docs/native/email-composer


## NOTAS:
* app.components.ts: Agregada la propiedad "direction", para indicarle la dirección a los enlaces del menu. Esto permite navegar hacia atras con el 
boton retroceder del dispositivo.
* app.component.html: Cambiada la instruccion '[routerDirection]="p.direction"' para al menu.