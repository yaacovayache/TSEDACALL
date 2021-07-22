import { Component, OnInit, OnDestroy, HostListener, HostBinding, Inject, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { WINDOW_PROVIDERS, WINDOW } from 'src/app/shared/helpers/window.helper';
import { DOCUMENT } from '@angular/common';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-navbar-mobile',
  templateUrl: './navbar-mobile.component.html',
  styleUrls: ['./navbar-mobile.component.scss']
})
export class NavbarMobileComponent implements OnInit {
  constructor(private translate: TranslateService, private authService: AuthService, private router: Router, @Inject(DOCUMENT) private document: Document, @Inject(WINDOW) private window: Window) { }
  public isClose:boolean=true;
  navFixed: boolean = false;
  isAuthenticated: boolean = false;
  userSubscription = new Subscription();
  userName: string;
  private scrollOffset: number = 70;
  public flags = [
    {country: 'France', language: 'Français', countryCode: 'fr', class:'flag-icon flag-icon-fr flag-icon-squared'},
    {country: 'United-Kingdom', language: 'English', countryCode: 'en', class:'flag-icon flag-icon-gb flag-icon-squared'},
    {country: 'Israel', language: 'עיברית', countryCode: 'he', class:'flag-icon flag-icon-il flag-icon-squared'}
  ]

  ngOnInit(): void {
    this.userSubscription = this.authService.user.subscribe((user) => {
      // The 500ms delay is for UX purposes only
      // fix bug: unwanted 500ms delay when refreshing page, keep only for login
      setTimeout(() => {
        this.isAuthenticated = user ? true : false;
        if (this.isAuthenticated){
          this.userName = user.fname;
          // if (user.isAdmin) this.isAdmin=true;
        } else this.userName = null;
      }, 500);
    });
  }

  useLanguage(language: string): void {
    console.log(language)
    this.translate.use(language);
  }

  
  @HostListener('window:scroll')
onWindowScroll() {
  this.navFixed = (window.pageYOffset 
    || document.documentElement.scrollTop 
    || document.body.scrollTop || 0
  ) > this.scrollOffset;
}

  onChange(){
    this.isClose = !this.isClose;
  }

  onLogout() {
    this.authService.logout();
    this.router.navigateByUrl('/auth/login');
  }

  onNavigationProfile() {
    if (JSON.parse(localStorage.getItem(this.authService.getLocalStorageToken())).role == 2)
      this.router.navigate([`/administration`]);
  }
}
