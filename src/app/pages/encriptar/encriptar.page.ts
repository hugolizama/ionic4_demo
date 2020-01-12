import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AES256 } from '@ionic-native/aes-256/ngx';

@Component({
  selector: 'app-encriptar',
  templateUrl: './encriptar.page.html',
  styleUrls: ['./encriptar.page.scss'],
})
export class EncriptarPage implements OnInit {

  secureKey: string;
  secureIV: string;
  textoDesencriptado: string;

  formEncriptar: FormGroup;
  formDesencriptar: FormGroup;

  constructor(private aes256: AES256) {
    this.formEncriptar = new FormGroup({
      secureKey: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        this.noHugo
      ]),
      secureIV: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      textoOriginal: new FormControl('', [
        Validators.required
      ])
    });

    this.formEncriptar.patchValue({
      secureKey: 'secureKey123',
      secureIV: 'secureIV123',
      textoOriginal: '10 revueltas'
    });

    this.formDesencriptar = new FormGroup({
      textoEncriptado: new FormControl('', [
        Validators.required
      ])
    });
  }

  ngOnInit() {
  }

  /** Validacion personalizada */
  noHugo(control: FormControl): {[s: string]: boolean} {
    if(control.value === 'hugo') {
      return {
        noHugo: true
      };
    }

    return null;
  }

  async generateSecureKeyAndIV(secureKey: string, secureIV: string) {
    this.secureKey = await this.aes256.generateSecureKey(secureKey); // Returns a 32 bytes string
    this.secureIV = await this.aes256.generateSecureIV(secureIV); // Returns a 16 bytes string
 }

  encriptar() {
    // console.log(this.formEncriptar);

    if(this.formEncriptar.valid){
      // console.log('Formulario valido');
      this.generateSecureKeyAndIV(this.formEncriptar.get('secureKey').value, this.formEncriptar.get('secureIV').value)
      .then(() => {
        this.aes256.encrypt(this.secureKey, this.secureIV, this.formEncriptar.get('textoOriginal').value)
        .then(resp => {
          console.log('Texto encriptado: ' + resp);
          this.formDesencriptar.patchValue({textoEncriptado: resp});
        })
        .catch((error: any) => console.error(error));
      });

    }
  }


  desencriptar() {
    console.log(this.formDesencriptar);

    if(this.formDesencriptar.valid){
      this.aes256.decrypt(this.secureKey, this.secureIV, this.formDesencriptar.get('textoEncriptado').value)
        .then(resp => {
          console.log('Texto desencriptado: ' + resp);
          this.textoDesencriptado = resp;
        })
        .catch((error: any) => console.error(error));
    }
  }
}
