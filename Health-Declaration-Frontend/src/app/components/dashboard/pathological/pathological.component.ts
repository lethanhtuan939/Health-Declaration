import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { Pathological } from 'src/app/model/pathological.interface';
import { PathologicalService } from 'src/app/services/pathological.service';
import { utils, writeFile } from 'xlsx';
import { SpinnerButtonComponent } from '../../shared/spinner-button/spinner-button.component';

@Component({
  selector: 'app-pathological',
  templateUrl: './pathological.component.html',
  styleUrls: ['./pathological.component.scss']
})
export class PathologicalComponent implements OnInit {
  @ViewChild('exportButton') exportButton!: SpinnerButtonComponent;

  addForm!: FormGroup;
  searchForm!: FormGroup;
  showModal = false;
  isEditing = false;
  currentEditingId: number | null = null;
  pathologicals: Pathological[] = [];

  search = '';
  pageNo = 0;
  pageSize = 5;
  sortBy = 'id';
  totalPages = 0;
  totalItems = 0;
  pagination: (number | string)[] = [];
  selectedType = 'ALL';
  selectedStatus = 'ALL';

  constructor(private fb: FormBuilder,
    private pathologicalService: PathologicalService,
    private toastr: ToastrService) {
    this.initForm();
  }

  ngOnInit(): void {
    this.findAll();

    this.searchForm.get('search')?.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(value => {
      this.onSearch();
    });
  }

  initForm() {
    this.addForm = this.fb.group({
      type: ['', [Validators.required]],
      status: ['', [Validators.required]],
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });

    this.searchForm = this.fb.group({
      search: [''],
    });
  }

  toggleAddModal() {
    this.initForm();
    this.showModal = !this.showModal;
    this.isEditing = false;
    this.currentEditingId = null;
  }

  openEditModal(p: Pathological) {
    this.addForm.patchValue({
      type: p.type,
      status: p.status,
      name: p.name,
      description: p.description,
    });
    this.showModal = true;
    this.isEditing = true;
    this.currentEditingId = p.id ?? null;
  }

  onAdd() {
    const data: Pathological = this.addForm.value as Pathological;
    if (this.isEditing && this.currentEditingId !== null) {
      data.id = this.currentEditingId;
      this.pathologicalService.update(data).subscribe({
        next: (response) => {
          this.toastr.success(response.message);
          this.showModal = false;
          this.findAll();
        },
        error: (error) => {
          this.toastr.error('Có lỗi xảy ra!');
        }
      });
    }
    else {
      this.currentEditingId = null;
      this.isEditing = false;
      this.pathologicalService.create(data).subscribe({
        next: (response) => {
          this.toastr.success(response.message);
          this.showModal = false;
          this.findAll();
        },
        error: (error) => {
          this.toastr.error('Có lỗi xảy ra!');
        }
      });
    }
  }

  findAll() {
    this.pathologicalService.findAll(this.search, this.pageNo, this.pageSize, this.sortBy, this.selectedType, this.selectedStatus).subscribe({
      next: (response) => {
        this.pathologicals = response.data.data;
        this.totalItems = response.data.totalElements;
        this.totalPages = response.data.totalPages;

        this.pagination = this.generatePagination(this.pageNo, this.totalPages);
      }
    });
  }

  onPageSizeChange(event: Event) {
    event.preventDefault();
    this.pageSize = Number((event.target as HTMLSelectElement).value);
    this.pageNo = 0;
    this.findAll();
  }

  onTypeChange(event: Event): void {
    event.preventDefault();

    const selectElement = event.target as HTMLSelectElement;
    this.selectedType = selectElement.value;
    this.pageNo = 0;
    this.findAll();
  }

  onStatusChange(event: Event): void {
    event.preventDefault();

    const selectElement = event.target as HTMLSelectElement;
    this.selectedStatus = selectElement.value;
    console.log(selectElement.value);
    this.pageNo = 0;
    this.findAll();
  }

  onSearch() {
    this.pageNo = 0;
    this.search = this.searchForm.get('search')?.value;

    this.findAll();
  }

  goToPage(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.pageNo = page;
      this.findAll();
    }
  }

  nextPage(): void {
    if (this.pageNo < this.totalPages - 1) {
      this.pageNo++;
      this.findAll();
    }
  }

  previousPage(): void {
    if (this.pageNo > 0) {
      this.pageNo--;
      this.findAll();
    }
  }

  generatePagination(currentPage: number, totalPages: number): (number | string)[] {
    const pagination: (number | string)[] = [];
    const delta = 2;
    const left = currentPage - delta;
    const right = currentPage + delta + 1;
    let range: number[] = [];
    let l: number | undefined = undefined;

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= left && i < right)) {
        range.push(i);
      }
    }

    for (let i of range) {
      if (l !== undefined) {
        if (i - l === 2) {
          pagination.push(l + 1);
        } else if (i - l !== 1) {
          pagination.push('...');
        }
      }
      pagination.push(i);
      l = i;
    }

    return pagination;
  }

  isNumber(value: number | string): value is number {
    return typeof value === 'number';
  }

  onExcelExport() {
    this.exportButton.isLoading = true;
    const newUsers = this.pathologicals.map((pathological) => {
      return {
        ...pathological,
        id: pathological.id?.toString(),
      };
    });

    console.log(newUsers);
    const heading = [['ID', 'Tên bệnh', 'Triệu chứng', 'Loại bệnh', 'Trạng thái']];
    const wb = utils.book_new();
    const ws = utils.json_to_sheet([]);
    utils.sheet_add_aoa(ws, heading);
    utils.sheet_add_json(ws, newUsers, {
      origin: 'A2',
      skipHeader: true,
    });
    utils.book_append_sheet(wb, ws, 'Users');
    writeFile(wb, 'data-' + new Date().getTime() + '.csv');

    this.exportButton.stopLoading();
  }

  maxDescriptionLength = 50;

  showFullDescriptionMap: { [key: number]: boolean } = {};

  toggleDescription(id: number): void {
    this.showFullDescriptionMap[id] = !this.showFullDescriptionMap[id];
  }

  getDescription(p: Pathological): string {
    const id = p.id ?? 1;
    if (this.showFullDescriptionMap[id]) {
      return p.description;
    }
    return p.description.length > this.maxDescriptionLength ?
      p.description.substring(0, this.maxDescriptionLength) + '...' :
      p.description;
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'NORMAL': return 'bg-blue-200 text-blue-800';
      case 'ENDEMIC': return 'bg-gray-200 text-gray-800';
      case 'RARE': return 'bg-red-200 text-red-800';
      case 'NEW_DISEASE': return 'bg-green-200 text-green-800';
      case 'EPIDEMIC': return 'bg-yellow-200 text-yellow-800';
      case 'PANDEMIC': return 'bg-indigo-200 text-indigo-800';
      case 'ERADICATED': return 'bg-purple-200 text-purple-800';
      default: return 'bg-pink-200 text-pink-800';
    }
  }

  getTypeClass(type: string): string {
    switch (type) {
      case 'INFECTIOUS': return 'bg-green-200 text-green-800';
      case 'SKIN_DISEASE': return 'bg-yellow-200 text-yellow-800';
      case 'CHRONIC': return 'bg-red-200 text-red-800';
      default: return 'bg-gray-200 text-gray-800';
    }
  }

  translateType(type: string): string {
    switch (type) {
      case 'INFECTIOUS': return 'Bệnh truyền nhiễm';
      case 'SKIN_DISEASE': return 'Bệnh ngoài da';
      case 'CHRONIC': return 'Bệnh mãn tính';
      default: return 'Khác';
    }
  }

  translateStatus(status: string): string {
    switch (status) {
      case 'NORMAL': return 'Bình thường';
      case 'ENDEMIC': return 'Đang lây nhiễm';
      case 'RARE': return 'Hiếm gặp';
      case 'NEW_DISEASE': return 'Mới phát hiện';
      case 'EPIDEMIC': return 'Dịch bệnh';
      case 'PANDEMIC': return 'Toàn cầu';
      case 'ERADICATED': return 'Đã xóa sổ';
      default: return 'Khác';
    }
  }
}
