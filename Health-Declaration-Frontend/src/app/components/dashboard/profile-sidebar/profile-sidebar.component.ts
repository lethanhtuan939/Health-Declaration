import { Component } from '@angular/core';

@Component({
  selector: 'app-profile-sidebar',
  templateUrl: './profile-sidebar.component.html',
  styleUrls: ['./profile-sidebar.component.scss']
})
export class ProfileSidebarComponent {

  profileSelectedItem = 'Profile';

  onItemClick(item: string) {
    this.profileSelectedItem = item;
  }
}
