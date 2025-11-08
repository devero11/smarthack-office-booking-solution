import { Routes } from '@angular/router';
import { LoginFormComponent } from './login-form/login-form.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { MapComponent } from './map/map.component';

export const routes: Routes = [
  {    path: 'login',    component: LoginFormComponent,  },
  {    path: 'register',    component: RegisterFormComponent,  },
  {    path: 'profile',    component: UserProfileComponent,  },
  {    path: 'map',    component: MapComponent,  },
];
