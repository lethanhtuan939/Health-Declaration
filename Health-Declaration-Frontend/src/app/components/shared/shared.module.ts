import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QrScannerComponent } from './qr-scanner/qr-scanner.component';
import { NgxScannerQrcodeModule } from 'ngx-scanner-qrcode';
import { ModalComponent } from './modal/modal.component';
import { SpinnerButtonComponent } from './spinner-button/spinner-button.component';
import { LoadingComponent } from './loading/loading.component';

@NgModule({
  declarations: [
    QrScannerComponent,
    ModalComponent,
    SpinnerButtonComponent,
    LoadingComponent,],
  imports: [
    CommonModule,
    NgxScannerQrcodeModule,
  ],
  exports: [
    QrScannerComponent,
    ModalComponent,
    SpinnerButtonComponent,
    LoadingComponent]
})
export class SharedModule { }
