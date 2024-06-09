import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-spinner-button',
  templateUrl: './spinner-button.component.html',
  styleUrls: ['./spinner-button.component.scss']
})
export class SpinnerButtonComponent {
  @Input() buttonText: string = 'Submit';
  @Input() formValid: boolean = true;

  @Output() buttonClick = new EventEmitter<void>();

  isLoading: boolean = false;

  onClick() {
    if (!this.isLoading && this.formValid) {
      this.isLoading = true;
      this.buttonClick.emit();
    }
  }

  stopLoading() {
    this.isLoading = false;
  }
}
