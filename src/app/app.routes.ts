import { Routes } from '@angular/router';
import { UploadComponent } from './components/home/upload/upload.component';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';

export const routes: Routes = [
    { path: '', component: UploadComponent },
    { path: 'login', component: LoginComponent},
    { path: 'signup', component: SignupComponent}
];
