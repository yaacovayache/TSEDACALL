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




import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { WINDOW_PROVIDERS, WINDOW } from 'src/app/shared/helpers/window.helper';
import { SharedDirectivesModule } from './shared/directive/shared-directives.module';


// Pipes 
import { SearchFilterPipe } from './shared/pipes/search-filter.pipe';

// Modules for translate
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

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
import { ListDonatorsComponent } from './components/administration-page/list-donators/list-donators.component';
import { ExcellComponent } from './components/administration-page/excell/excell.component';
import { NavbarMobileComponent } from './components/navbar-mobile/navbar-mobile.component';
import { IntroComponent } from './components/home/intro/intro.component';
import { CampaignsListComponent } from './components/home/campaigns-list/campaigns-list.component';
import { HowItWorkComponent } from './components/home/how-it-work/how-it-work.component';
import { BannerComponent } from './components/home/banner/banner.component';



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
    ListDonatorsComponent,
    ExcellComponent,
    NavbarMobileComponent,
    IntroComponent,
    CampaignsListComponent,
    HowItWorkComponent,
    BannerComponent
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
            // ngx-translate and the loader module
            HttpClientModule,
            TranslateModule.forRoot({
                loader: {
                    provide: TranslateLoader,
                    useFactory: HttpLoaderFactory,
                    deps: [HttpClient]
                }
            })
  ],
  providers: [DatePipe, { provide: HTTP_INTERCEPTORS, useClass: SendTokenInterceptor, multi: true }, WINDOW_PROVIDERS],
  bootstrap: [AppComponent]
})
export class AppModule { }

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
