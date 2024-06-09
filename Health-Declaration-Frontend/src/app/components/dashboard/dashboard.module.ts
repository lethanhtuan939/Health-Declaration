import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { NotificationComponent } from './notification/notification.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { HttpClientModule } from '@angular/common/http';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { NotificationAddComponent } from './notification/notification-add/notification-add.component';
import { DeclarationComponent } from './declaration/declaration.component';
import { SharedModule } from '../shared/shared.module';
import { DeclarationHistoryComponent } from './declaration-history/declaration-history.component';
import { ProfileSidebarComponent } from '../dashboard/profile-sidebar/profile-sidebar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { authGuard } from 'src/app/guard/auth.guard';
import { PathologicalComponent } from './pathological/pathological.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [authGuard],
    children: [
      { path: 'users/:uniqueId', component: ProfileComponent, title: 'Thông tin cá nhân', canActivate: [authGuard] },
      { path: 'notifications', component: NotificationComponent, title: 'Quản lý thông báo', canActivate: [authGuard] },
      { path: 'pathological', component: PathologicalComponent, title: 'Quản lý bệnh dịch', canActivate: [authGuard] },
      { path: 'notifications/add', component: NotificationAddComponent, title: 'Thêm thông báo', canActivate: [authGuard] },
      { path: 'change-password', component: ChangePasswordComponent, title: 'Thay đổi mật khẩu', canActivate: [authGuard] },
      { path: 'declaration', component: DeclarationComponent, title: 'Khai báo y tế', canActivate: [authGuard] },
      { path: 'users', component: UsersComponent, title: 'Quản lý tài khoản người dùng', canActivate: [authGuard] },
      { path: 'declaration-history', component: DeclarationHistoryComponent, title: 'Lịch sử khai báo y tế', canActivate: [authGuard] }
    ],
  }
]

@NgModule({
  declarations: [
    DashboardComponent,
    ProfileComponent,
    NotificationComponent,
    ChangePasswordComponent,
    NotificationAddComponent,
    DeclarationComponent,
    DeclarationHistoryComponent,
    ProfileSidebarComponent,
    PathologicalComponent,
    UsersComponent
  ],
  imports: [
    CommonModule,
    AngularEditorModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    SharedModule,
    FormsModule
  ]
})
export class DashboardModule {

}
