import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import QRCode from 'qrcode';
import { IonHeader } from "@ionic/angular/standalone";
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ZXingScannerModule } from '@zxing/ngx-scanner';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    IonicModule,
    FormsModule,
    ZXingScannerModule
  ]
})
export class HomePage implements AfterViewInit {
  qrData: string = '';
  scannedResult: string = '';

  @ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;

  ngAfterViewInit(): void {
    this.generateQRCode();
  }

  generateQRCode(): void {
    QRCode.toCanvas(
      this.canvas.nativeElement,
      this.qrData,
      { width: 256 },
      (error: any) => {
        if (error) console.error(error);
      }
    );
  }

  onInputChange(): void {
    this.generateQRCode();
  }

  handleQrCodeResult(result: string): void {
    this.scannedResult = result;
  }
}
