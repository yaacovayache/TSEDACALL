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
import { AssociationConfigComponent } from './components/administration-page/association-config/association-config.component';
import { MainComponent } from './components/administration-page/main/main.component';
import { DonationFormComponent } from './components/donation-form/donation-form.component';
import { ModifyCampaignComponent } from './components/administration-page/modify-campaign/modify-campaign.component';

import { SuccessPaymentComponent } from './components/success-payment/success-payment.component';
import { FailurePaymentComponent } from './components/failure-payment/failure-payment.component';

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
    path: 'administration',
    component: AdministrationPageComponent, canActivate:[AuthentificationGuard],
    children: [
      { path: '', component: MainComponent, canActivate:[AuthentificationGuard] },
      { path: 'add', component: AddDonationComponent, canActivate:[AuthentificationGuard] },
      { path: 'search', component: SearchCerfaComponent, canActivate:[AuthentificationGuard] },
      { path: 'config', component: AssociationConfigComponent, canActivate:[AuthentificationGuard] },
      { path: 'modif', component: ModifyCampaignComponent, canActivate:[AuthentificationGuard] },
    ],
  },
  {
    path: ':assocation/:name',
    component: CampaignPageComponent,
  },
  {
    path: 'donation/form/:campaign_id',
    component: DonationFormComponent,
  },
  {
    path: 'admin-chat',
    component: AdminChatComponent, canActivate:[AuthentificationGuard],
  },
  {
    path: 'success',
    component: SuccessPaymentComponent,
  },
  {
    path: 'failure',
    component: FailurePaymentComponent,
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
