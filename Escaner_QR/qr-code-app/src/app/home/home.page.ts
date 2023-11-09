import { Component } from '@angular/core';
import * as QRCode from 'qrcode';
import jsQR from 'jsqr';

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

  generateQRCode() {
    QRCode.toDataURL(this.qrData, (err, url) => {
      if (err) {
        console.error(err);
      } else {
        this.qrCodeImage = url;
      }
    });
  }

  startQRScanner() {
    this.scannerIsRunning = true;

    const videoElement = document.createElement('video');
    document.body.appendChild(videoElement);

    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        videoElement.srcObject = stream;
        videoElement.play();

        const canvasElement = document.createElement('canvas');
        const canvasContext = canvasElement.getContext('2d');

        if (!canvasContext) {
          console.error('No se pudo obtener el contexto del lienzo.');
          return;
        }

        canvasElement.style.display = 'none';
        document.body.appendChild(canvasElement);

        const checkQRCode = () => {
          if (videoElement.readyState === videoElement.HAVE_ENOUGH_DATA) {
            canvasElement.width = videoElement.videoWidth;
            canvasElement.height = videoElement.videoHeight;
            canvasContext.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);

            const imageData = canvasContext.getImageData(0, 0, canvasElement.width, canvasElement.height);
            const code = jsQR(imageData.data, imageData.width, imageData.height);

            if (code) {
              // Abre una nueva ventana o pestaña con la URL del código QR
              window.open(code.data, '_blank');

              this.scannerIsRunning = false;
              stream.getTracks().forEach((track) => track.stop());
              document.body.removeChild(videoElement);
              document.body.removeChild(canvasElement);
            }

            if (this.scannerIsRunning) {
              requestAnimationFrame(checkQRCode);
            }
          }

          if (this.scannerIsRunning) {
            requestAnimationFrame(checkQRCode);
          }
        };

        requestAnimationFrame(checkQRCode);
      })
      .catch((error) => {
        console.error('Error al acceder a la cámara: ' + error);
      });
  }
}
