import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { UserStatus } from 'src/app/model/enum/user-status.enum';
import { Role } from 'src/app/model/role';
import { User } from 'src/app/model/user.interface';
import { UserService } from 'src/app/services/user.service';
import { SpinnerButtonComponent } from '../../shared/spinner-button/spinner-button.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  @ViewChild('spinnerButton') spinnerButton!: SpinnerButtonComponent;
  isSpinnerLoading = false;

  roleForm !: FormGroup;
  searchForm !: FormGroup;
  showModal = false;
  roles: Role[] = [];
  users: User[] = [];
  selectedUser: User = null!;

  search = '';
  pageNo = 0;
  pageSize = 5;
  sortBy = 'id';
  totalPages = 0;
  totalItems = 0;

  showConfirmationDialog: boolean = false;
  userToChangeStatus: User | null = null;
  previousStatus: UserStatus | null = null;

  pagination: (number | string)[] = [];

  public UserStatus = UserStatus;

  constructor(private fb: FormBuilder,
    private userService: UserService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.findAll();
    this.loadRoles();

    this.searchForm = this.fb.group({
      search: [''],
    });

    this.searchForm.get('search')?.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(value => {
      this.onSearch();
    });
  }

  findAll() {
    this.userService.findAll(this.search, this.pageNo, this.pageSize, this.sortBy).subscribe({
      next: (response) => {
        this.users = response.data.data;
        this.totalItems = response.data.totalElements;
        this.totalPages = response.data.totalPages;

        this.pagination = this.generatePagination(this.pageNo, this.totalPages);
      }
    })
  }

  onSearch() {
    this.pageNo = 0;
    this.search = this.searchForm.get('search')?.value;

    this.findAll();
  }

  onExcelExport() {

  }

  onPageSizeChange(event: Event) {
    event.preventDefault();
    this.pageSize = Number((event.target as HTMLSelectElement).value);
    this.pageNo = 0;
    this.findAll();
  }

  loadRoles(): void {
    this.userService.findAllRoles().subscribe(response => {
      this.roles = response.data;
      this.initializeRoleForm();
    });
  }

  initializeRoleForm(): void {
    const roleControls: { [key: string]: FormControl } = this.roles.reduce((acc, role) => {
      acc[role.name] = new FormControl(false);
      return acc;
    }, {} as { [key: string]: FormControl });

    this.roleForm = this.fb.group(roleControls);
  }

  toggleModal(user?: User): void {
    this.showModal = !this.showModal;
    if (user) {
      this.selectedUser = user;
      this.populateRoleForm();
    }
  }

  populateRoleForm(): void {
    this.roles.forEach(role => {
      const hasRole = this.selectedUser.roles?.some(userRole => userRole.name === role.name);
      this.roleForm.get(role.name)?.setValue(hasRole);
    });
  }

  onRoleSubmit(): void {
    this.spinnerButton.isLoading = true;

    const selectedRoles = Object.keys(this.roleForm.value)
      .filter(roleName => this.roleForm.value[roleName]);

    if (!this.selectedUser || !this.selectedUser.uniqueId) {
      this.toastr.error('User not selected or invalid user ID', 'Error!');
      return;
    }

    this.userService.addRoles(this.selectedUser.uniqueId, selectedRoles).subscribe({
      next: () => {
        this.toastr.success('User roles updated successfully', 'Success!');
        this.showModal = false;
        this.spinnerButton.stopLoading();

        this.findAll();
      },
      error: () => {
        this.spinnerButton.stopLoading();
        this.toastr.error('Failed to update user roles');
      }
    });
  }

  getStatusClass(status: UserStatus | undefined): string {
    switch (status) {
      case UserStatus.ACTIVE: return 'bg-green-500 text-white';
      case UserStatus.INACTIVE: return 'bg-rose-500 text-white';
      case UserStatus.NONE: return 'bg-gray-200 text-gray-800';
      default: return 'bg-gray-200 text-gray-800';
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

  isNumber(value: number | string): value is number {
    return typeof value === 'number';
  }

  getRoleClass(roleName: string): string {
    switch (roleName) {
      case 'ADMIN':
        return 'role-admin';
      case 'MEDICAL_STAFF':
        return 'role-medical-staff';
      case 'USER':
        return 'role-user';
      default:
        return '';
    }
  }

  changeStatus(user: User): void {
    this.userService.changeStatus(user.uniqueId ?? '', user.status ?? UserStatus.ACTIVE).subscribe({
      next: (response) => {
        this.toastr.success('User status changed successfully');
        this.updateUserStatusInUI(response.data);
        this.showConfirmationDialog = false;
      },
      error: (err) => {
        this.toastr.error('Failed to change user status');
        this.closeConfirmationDialog();
      }
    });
  }

  closeConfirmationDialog(): void {
    if (this.userToChangeStatus) {
      this.userToChangeStatus.status = this.previousStatus!;
      this.updateUserStatusInUI(this.userToChangeStatus);
      this.userToChangeStatus = null;
    }
    this.showConfirmationDialog = false;
  }

  confirmChangeStatus(): void {
    if (this.userToChangeStatus) {
      this.changeStatus(this.userToChangeStatus);
    }
  }

  onStatusChange(isChecked: boolean, user: User): void {
    this.previousStatus = user.status!;
    this.userToChangeStatus = user;
    this.showConfirmationDialog = true;

    user.status = isChecked ? UserStatus.ACTIVE : UserStatus.INACTIVE;
    this.updateUserStatusInUI(user);
  }

  private updateUserStatusInUI(user: User): void {
    const userIndex = this.users.findIndex(u => u.id === user.id);
    if (userIndex > -1) {
      this.users[userIndex].status = user.status;
    }
  }
}
