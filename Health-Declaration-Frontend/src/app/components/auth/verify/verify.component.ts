import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent implements OnInit {

  isSuccess = false;
  isLoading = false;

  constructor(private authService: AuthService,
    private route: ActivatedRoute,
    private toast: ToastrService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const token = params.get('token')!;
      this.isLoading = true;
      this.authService.verify(token).subscribe(res => {
        if (res.status !== 200) {
          this.toast.error(res.message);
          this.isSuccess = false;
          return;
        }

        this.toast.success(res.message);
        this.isSuccess = true;
      });

      this.isLoading = false;
    });
  }
}
