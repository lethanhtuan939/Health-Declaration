import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements AfterViewInit {
  @ViewChild('dateInput') dateInput!: ElementRef;

  ngAfterViewInit() {
    this.setMaxDate();
  }

  setMaxDate() {
    const today = new Date().toISOString().split('T')[0];
    this.dateInput.nativeElement.setAttribute('max', today);
  }

  onSearch() {
    console.log(123);
  }

  onExcelExport() {
    console.log("export excel");
  }
}
