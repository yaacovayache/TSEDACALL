// Modules
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClient, HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule, DatePipe  } from '@angular/common';
import { NgModule } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatDividerModule} from '@angular/material/divider'; 
import {MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table'  
import { NguCarouselModule } from '@ngu/carousel';
import {ProgressBarModule} from "angular-progress-bar";
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';




import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { WINDOW_PROVIDERS, WINDOW } from 'src/app/shared/helpers/window.helper';
import { SharedDirectivesModule } from './shared/directive/shared-directives.module';
import { NgxHideOnScrollModule } from 'ngx-hide-on-scroll';
import { ToastrModule } from 'ngx-toastr';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NgxStripeModule } from 'ngx-stripe';


// Pipes 
import { SearchFilterPipe } from './shared/pipes/search-filter.pipe';

// Modules for translate
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { AuthGuardService } from './shared/services/auth-guard.service';
// Components
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { SendTokenInterceptor } from './shared/services/send-token-interceptor.service';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner/loading-spinner.component';
import { HowItWorksComponent } from './components/how-it-works/how-it-works.component';
import { CreateOrSearchComponent } from './components/create-or-search/create-or-search.component';
import { IntroHomeComponent } from './components/intro-home/intro-home.component';
import { AssociationsListComponent } from './components/associations-list/associations-list.component';
import { CampaignsComponent } from './components/campaigns/campaigns.component';
import { ChatBoxComponent } from './components/chat-box/chat-box.component';
import { CampaignPageComponent } from './components/campaign-page/campaign-page.component';
import { ChartsModule } from 'ng2-charts';
import { PresentationComponent } from './components/campaign-page/presentation/presentation.component';
import { GraphicPerMonthComponent } from './components/campaign-page/graphic-per-month/graphic-per-month.component';
import { DonatorListComponent } from './components/campaign-page/donator-list/donator-list.component';
import { AdministrationPageComponent } from './components/administration-page/administration-page.component';
import { NavbarMobileComponent } from './components/navbar-mobile/navbar-mobile.component';
import { IntroComponent } from './components/home/intro/intro.component';
import { CampaignsListComponent } from './components/home/campaigns-list/campaigns-list.component';
import { HowItWorkComponent } from './components/home/how-it-work/how-it-work.component';
import { BannerComponent } from './components/home/banner/banner.component';
import { TopCampaignComponent } from './components/home/top-campaign/top-campaign.component';
import { AssociationComponent } from './components/campaign-page/association/association.component';
import { DonateBoxComponent } from './components/campaign-page/donate-box/donate-box.component';
import { TimerComponent } from './components/campaign-page/timer/timer.component';
import { ShareBannerComponent } from './components/campaign-page/share-banner/share-banner.component';
import { AboutComponent } from './components/campaign-page/about/about.component';
import { DonateShareBannerComponent } from './components/campaign-page/donate-share-banner/donate-share-banner.component';
import { DashboardComponent } from './components/administration-page/dashboard/dashboard.component';
import { DonatorsTableComponent } from './components/administration-page/donators-table/donators-table.component';
import { MsgBoxComponent } from './components/campaign-page/msg-box/msg-box.component';
import { NumberToWordsPipe } from './shared/pipes/number-to-word.pipe';
import { AddDonationComponent } from './components/administration-page/add-donation/add-donation.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SearchCerfaComponent } from './components/administration-page/search-cerfa/search-cerfa.component';
import { AdminChatComponent } from './components/admin-chat/admin-chat.component';
import { DateAgoPipe } from './shared/pipes/date-ago.pipe';
import { SidebarComponent } from './components/administration-page/sidebar/sidebar.component';
import { AssociationConfigComponent } from './components/administration-page/association-config/association-config.component';
import { MainComponent } from './components/administration-page/main/main.component';
import { DonateBannerComponent } from './components/campaign-page/donate-banner/donate-banner.component';
import { DonationFormComponent } from './components/donation-form/donation-form.component';
import { ConfettiComponent } from './components/campaign-page/confetti/confetti.component';
import { ModifyCampaignComponent } from './components/administration-page/modify-campaign/modify-campaign.component';
import { ModifyDetailsComponent } from './components/administration-page/modify-campaign/modify-details/modify-details.component';
import { VideoMediaComponent } from './components/campaign-page/video-media/video-media.component';
import { SafePipe } from './shared/pipes/safe.pipe';
import { SuccessPaymentComponent } from './components/success-payment/success-payment.component';
import { FailurePaymentComponent } from './components/failure-payment/failure-payment.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    LoadingSpinnerComponent,
    HowItWorksComponent,
    CreateOrSearchComponent,
    IntroHomeComponent,
    AssociationsListComponent,
    CampaignsComponent,
    SearchFilterPipe,
    ChatBoxComponent,
    CampaignPageComponent,
    PresentationComponent,
    GraphicPerMonthComponent,
    DonatorListComponent,
    AdministrationPageComponent,
    NavbarMobileComponent,
    IntroComponent,
    CampaignsListComponent,
    HowItWorkComponent,
    BannerComponent,
    TopCampaignComponent,
    AssociationComponent,
    DonateBoxComponent,
    TimerComponent,
    ShareBannerComponent,
    AboutComponent,
    DonateShareBannerComponent,
    DashboardComponent,
    DonatorsTableComponent,
    MsgBoxComponent,
    NumberToWordsPipe,
    AddDonationComponent,
    SearchCerfaComponent,
    AdminChatComponent,
    DateAgoPipe,
    SidebarComponent,
    AssociationConfigComponent,
    MainComponent,
    DonateBannerComponent,
    DonationFormComponent,
    ConfettiComponent,
    ModifyCampaignComponent,
    ModifyDetailsComponent,
    VideoMediaComponent,
    SafePipe,
    SuccessPaymentComponent,
    FailurePaymentComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatTabsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatTableModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatDividerModule,
    MatSelectModule,
    MatSidenavModule,
    MatProgressBarModule,
    BrowserAnimationsModule,
    NguCarouselModule,
    SharedDirectivesModule,
    ProgressBarModule,
    CarouselModule,
    ChartsModule,
    NgxHideOnScrollModule,
    NgbModule,
    ModalModule.forRoot(),
    NgxStripeModule.forRoot('pk_test_51J2N0iLkAa6v5r0HY9LHJkBIA8PgSajN4WrGhkNo5lnVdqIxyST8t1P7wvC2mqmaIbeiEK1nHfIV7oleTetCpWdL00RHXrBLPs'),
    ShareButtonsModule.withConfig({
      debug: true
    }),
    ToastrModule.forRoot(),
    ShareIconsModule,
            // ngx-translate and the loader module
            HttpClientModule,
            TranslateModule.forRoot({
                loader: {
                    provide: TranslateLoader,
                    useFactory: HttpLoaderFactory,
                    deps: [HttpClient]
                }
            }),
  ],
  providers: [DatePipe, DateAgoPipe, SafePipe, AuthGuardService, NumberToWordsPipe, { provide: HTTP_INTERCEPTORS, useClass: SendTokenInterceptor, multi: true }, WINDOW_PROVIDERS],
  bootstrap: [AppComponent]
})
export class AppModule { }

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
