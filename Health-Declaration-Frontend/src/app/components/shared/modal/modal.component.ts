import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  @Input() title: string = 'Are you sure?';
  @Input() content: string = 'Are you sure you want to continue?';

  @Output() closeModalEvent = new EventEmitter<void>();
  @Output() confirmModalEvent = new EventEmitter<void>();

  closeModal(): void {
    this.closeModalEvent.emit();
  }

  confirm(): void {
    this.confirmModalEvent.emit();
  }
}
