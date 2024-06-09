import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ResponseObject } from 'src/app/model/response/response-object';
import { User } from 'src/app/model/user.interface';
import { UserService } from 'src/app/services/user.service';
import { SpinnerButtonComponent } from '../../shared/spinner-button/spinner-button.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  @ViewChild('spinnerButton') spinnerButton!: SpinnerButtonComponent;
  profileForm!: FormGroup;
  user!: User;
  uniqueId!: string;
  avatar: File | null = null;
  isLoading = false;
  rolesString: string = '';

  selectedImageUrl = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80';

  constructor(private fb: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private toast: ToastrService,
  ) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      this.uniqueId = params.get('uniqueId')!;

      this.findByUniqueId(this.uniqueId);
    });

    this.profileForm = this.fb.group({
      idCard: ['', Validators.required],
      fullName: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      healthInsuranceNumber: ['', Validators.required],
      address: ['', Validators.required],
      status: ['', Validators.required],
    });
    this.profileForm.get('status')?.disable();
  }

  onFileSelected(event: any) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      this.selectedImageUrl = URL.createObjectURL(file);

      this.avatar = file;
    }
  }

  findByUniqueId(uniqueId: string): void {
    this.userService.findByUniqueId(uniqueId).subscribe((response: ResponseObject) => {
      this.user = response.data;
      this.selectedImageUrl = this.user.avatar ?? '';
      if (this.user && this.user.roles) {
        this.rolesString = this.user.roles.map(role => role.name).join(', ');
      }
      this.updateProfile(this.user);
    });
  }

  updateProfile(user: User): void {
    this.profileForm.patchValue({
      idCard: user.idCard,
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
      gender: user.gender,
      dateOfBirth: user.dateOfBirth,
      healthInsuranceNumber: user.healthInsuranceNumber,
      address: user.address,
      status: user.status,
    });
  }

  onSubmit(): void {
    if (this.profileForm.invalid) {
      this.toast.error("Form is invalid!", "Error");

      return;
    }

    this.isLoading = true;

    const formData = this.profileForm.getRawValue() as User;

    this.spinnerButton.isLoading = true;
    this.userService.update(this.uniqueId, formData, this.avatar).subscribe((response: ResponseObject) => {
      this.toast.success(response.message, response.status === 200 ? 'Success' : 'Error');
      this.user = response.data;
      this.spinnerButton.stopLoading();

      this.isLoading = false;

      this.findByUniqueId(this.user.uniqueId!);
      this.userService.updateUserAvatar(this.user.avatar || null);
    },
      (error) => {
        this.isLoading = false;
        this.spinnerButton.stopLoading();
      });
  }
}
