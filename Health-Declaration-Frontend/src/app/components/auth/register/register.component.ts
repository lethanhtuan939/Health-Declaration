import { Component, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { SpinnerButtonComponent } from '../../shared/spinner-button/spinner-button.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  @ViewChild('spinnerButton') spinnerButton!: SpinnerButtonComponent;
  registerForm !: FormGroup;
  isError: boolean = false;
  message = "";

  constructor(private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      idCard: ['049203008743', [Validators.required]],
      email: ['thanhtuanle0209@gmail.com', [Validators.required, Validators.email]],
      password: ['1234', [Validators.required, Validators.minLength(3)]],
      repeatPassword: ['1234', [Validators.required]],
      gender: ['male', [Validators.required]],
      address: ['18 Nguyễn Văn Thoại, Ngũ Hành Sơn, Đà Nẵng', [Validators.required]],
      healthInsuranceNumber: ['111111111111111', [Validators.required]],
    }, { validators: this.passwordMatchValidator })
  }

  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password');
    const repassword = control.get('repeatPassword');

    if (!password || !repassword) {
      return null;
    }

    return password.value === repassword.value ? null : { 'passwordMismatch': true };
  }

  onRegister(): void {
    const data = this.registerForm.value;

    this.spinnerButton.isLoading = true;
    this.authService.register(data).subscribe({
      next: (response) => {
        if (response.status !== 200) {
          this.toastr.error(response.message);
          this.isError = true;
          this.message = response.message;
          this.spinnerButton.stopLoading();
          return;
        }
        this.toastr.success("Register Successfully!", "Successfully!");
        this.spinnerButton.stopLoading();
        this.router.navigate(['/auth/login']);
      },
      error: (error) => {
        this.isError = true;
        this.spinnerButton.stopLoading();
        this.toastr.error(error.error.message);
      }
    });
  }
}
