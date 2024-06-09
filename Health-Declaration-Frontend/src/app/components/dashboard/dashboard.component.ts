import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/model/user.interface';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  user!: User;
  token!: string;

  selectedItem: string = 'Dashboard';
  isMenuUserOpen = false;
  isMenuOpen = false;

  constructor(private eRef: ElementRef,
    private tokenService: TokenService,
    private userService: UserService,
    private authService: AuthService,
    private toatr: ToastrService) { }

  onItemClick(item: string) {
    this.selectedItem = item;
  }

  toggleUserMenu() {
    this.isMenuUserOpen = !this.isMenuUserOpen;
  }

  @HostListener('document:click', ['$event'])
  clickout(event: any) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.isMenuUserOpen = false;
    }
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  ngOnInit(): void {
    this.token = this.tokenService.token;
    if (this.token) {
      this.userService.findByToken().subscribe({
        next: (response) => {
          this.user = response.data as User;
        },
        error: (error) => {
          this.toatr.error('Failed to fetch user details');
          console.error('Failed to fetch user details', error);
        }
      });
    }

    this.userService.userAvatar$.subscribe((avatarUrl: string | null) => {
      if (avatarUrl) {
        this.user.avatar = avatarUrl;
      }
    });
  }

  onLogout() {
    this.authService.logout();
    this.toatr.success('Logged out successfully');
  }
}
