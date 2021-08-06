import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AssociationsListComponent } from './components/associations-list/associations-list.component';
import { CampaignPageComponent } from './components/campaign-page/campaign-page.component';
import { AdministrationPageComponent } from './components/administration-page/administration-page.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'auth/login',
    component: LoginComponent,
  },
  {
    path: 'auth/signup',
    component: SignupComponent,
  },
  {
    path: 'associations',
    component: AssociationsListComponent,
  },
  {
    path: 'campaign/home/:id/:name',
    component: CampaignPageComponent,
  },
{
  path: 'administration',
  component: AdministrationPageComponent,
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
