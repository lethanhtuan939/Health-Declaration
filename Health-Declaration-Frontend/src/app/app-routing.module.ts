import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  { path: 'auth', loadChildren: () => import('../app/components/auth/auth.module').then(m => m.AuthModule) },
  { path: 'dashboard', loadChildren: () => import('../app/components/dashboard/dashboard.module').then(m => m.DashboardModule), title: 'Trang quản trị' },
  { path: '', component: HomeComponent, title: 'Trang chủ' },
  { path: '**', pathMatch: 'full', component: NotFoundComponent, title: '404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
