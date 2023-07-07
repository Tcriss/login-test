import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { ForgottenPwComponent } from './components/forgatten-pw/forgotten-pw.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  { 
    path: 'home', 
    component: HomeComponent,
    canActivate: [authGuard]
  },
  { 
    path: 'login', 
    component: LoginComponent
  },
  { 
    path: 'register', 
    component: RegisterComponent 
  },
  { 
    path: 'forgotten-pw', 
    component: ForgottenPwComponent 
  },
  { 
    path: 'verify-email', 
    component: VerifyEmailComponent
  },
  { path: '**', redirectTo: '/login', pathMatch: 'full' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
