import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CarouselModule } from 'ngx-owl-carousel-o';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ProgressBarModule} from "angular-progress-bar";
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { IntroComponent } from './intro/intro.component';
import { CarrouselComponent } from './carrousel/carrousel.component';
import { BannerComponent } from './banner/banner.component';
import { AssociationComponent } from './association/association.component'


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavbarComponent,
    IntroComponent,
    CarrouselComponent,
    BannerComponent,
    AssociationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CarouselModule ,
    BrowserAnimationsModule,
    ProgressBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
