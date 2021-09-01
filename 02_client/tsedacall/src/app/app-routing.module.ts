import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AssociationsListComponent } from './components/associations-list/associations-list.component';
import { CampaignPageComponent } from './components/campaign-page/campaign-page.component';
import { AdministrationPageComponent } from './components/administration-page/administration-page.component';
import { AddDonationComponent } from './components/administration-page/add-donation/add-donation.component';
import { SearchCerfaComponent } from './components/administration-page/search-cerfa/search-cerfa.component';
import { AdminChatComponent } from './components/admin-chat/admin-chat.component';
import { AuthentificationGuard } from './shared/auth-guards/authentification.guard';


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
    component: AdministrationPageComponent, canActivate:[AuthentificationGuard],
  },
  {
    path: 'add',
    component: AddDonationComponent, canActivate:[AuthentificationGuard],
  },
  {
    path: 'search',
    component: SearchCerfaComponent, canActivate:[AuthentificationGuard],
  },
  {
    path: 'admin-chat',
    component: AdminChatComponent, canActivate:[AuthentificationGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
