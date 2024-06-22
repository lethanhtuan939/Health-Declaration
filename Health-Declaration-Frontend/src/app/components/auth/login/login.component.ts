import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { SpinnerButtonComponent } from '../../shared/spinner-button/spinner-button.component';
import { TokenResponse } from 'src/app/model/response/token-response';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild('spinnerButton') spinnerButton!: SpinnerButtonComponent;

  loginForm!: FormGroup;
  isError: boolean = false;

  constructor(private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService,
    private tokenService: TokenService
  ) {
    if (this.tokenService.isTokenValid()) {
      this.router.navigate(['/dashboard']);
    }
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['admin@gmail.com', [Validators.required, Validators.email]],
      password: ['123', [Validators.required, Validators.minLength(3)]],
    });
  }

  onLogin(): void {
    const data = this.loginForm.value;
    this.spinnerButton.isLoading = true;
    this.authService.login(data.email, data.password).subscribe({
      next: (response) => {
        if (response.status === 200) {
          this.spinnerButton.stopLoading();

          const token: TokenResponse = response.data as TokenResponse;

          this.tokenService.token = token.accessToken as string;

          this.toastr.success("Login Successfully!", "Successfully!");

          this.router.navigate(['/dashboard']);
        }
        else if (response.status === 401) {
          this.spinnerButton.stopLoading();
          this.toastr.error(response.message, "Error!");
        }
      },
      error: (error) => {
        this.isError = true;
        this.spinnerButton.stopLoading();
        this.toastr.error(error.error.message);
      }
    });
  }
}
