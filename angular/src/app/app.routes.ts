import { Routes } from '@angular/router';
import { LoginFormComponent } from './login-form/login-form.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { SchedulingComponent } from './schedule/schedule.component'

export const routes: Routes = [
  {    path: 'login',    component: LoginFormComponent,  },
  {    path: 'register',    component: RegisterFormComponent,  },
  {    path: 'profile',    component: UserProfileComponent,  },
  {    path: 'navigation', component: NavigationBarComponent, },
  {    path: 'admin', component: AdminDashboardComponent, },
  {    path: 'schedule', component: SchedulingComponent, },
  {    path: 'forgotpassword', component: ChangePasswordComponent, },

  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];
