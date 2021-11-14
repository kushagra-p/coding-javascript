import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.gaurd';
import { CreateTeamComponent } from './create-team/create-team.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ViewTeamComponent } from './view-team/view-team.component';

const routes: Routes = [
  
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {path:'team/create', component:CreateTeamComponent},
  {path:'team/view', component:ViewTeamComponent},
  {path:'**', component:CreateTeamComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
