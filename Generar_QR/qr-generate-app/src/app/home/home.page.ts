import { Component } from '@angular/core';
import * as QRCode from 'qrcode'; // Asegúrate de importar 'qrcode'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  qrData: string = '';
  qrCodeImage: string = '';
  scannerIsRunning: boolean = false;

  constructor() {}

  // Esta es la función que generará el código QR para una página HTML.
  generateQRCodeForPage() {
    // Reemplaza 'URL_DE_TU_PÁGINA' con la URL de tu página HTML.
    const pageURL = 'URL_DE_TU_PÁGINA';

    // Utiliza QRCode.toDataURL para generar el código QR y obtener una URL de imagen.
    QRCode.toDataURL(pageURL, (err, url) => {
      if (err) {
        console.error(err);
      } else {
        // La variable 'url' contiene la URL de la imagen del código QR.
        this.qrCodeImage = url;
      }
    });
  }

  // ... otras funciones y métodos de tu componente
}
