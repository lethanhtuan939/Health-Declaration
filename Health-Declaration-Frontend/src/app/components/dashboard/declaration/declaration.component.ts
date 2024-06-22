import { Component, OnInit } from '@angular/core';
import { Pathological } from 'src/app/model/pathological.interface';
import { PathologicalService } from 'src/app/services/pathological.service';

@Component({
  selector: 'app-declaration',
  templateUrl: './declaration.component.html',
  styleUrls: ['./declaration.component.scss']
})
export class DeclarationComponent implements OnInit {
  imageUrl: string | ArrayBuffer | null = null;
  pathologicalsWithoutPaging: Pathological[] = [];
  selectedPathological: Pathological | null = null;

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        this.imageUrl = reader.result;
      };

      reader.readAsDataURL(file);
    }
  }

  constructor(private pathologicalService: PathologicalService) { }

  ngOnInit(): void {
    this.pathologicalService.findAllWithoutPaging().subscribe({
      next: response => {
        this.pathologicalsWithoutPaging = response.data;
      }
    })
  }

  onSelectPathological(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedId = Number(selectElement.value);;
    this.selectedPathological = this.pathologicalsWithoutPaging.find(p => p.id === selectedId) || null;
  }
}
