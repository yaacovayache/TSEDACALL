import { Component, OnInit, OnDestroy, HostListener, HostBinding, Inject, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import {FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { WINDOW_PROVIDERS, WINDOW } from 'src/app/shared/helpers/window.helper';
import { DOCUMENT } from '@angular/common';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isAuthenticated: boolean = false;
  disableSelect = new FormControl(false);
  userSubscription = new Subscription();
  isAssociation = false;
  userName: string;
  navbarOpen:boolean = false;
  isFixed:boolean;
  public flags = [
    {country: 'France', language: 'Français', countryCode: 'fr', class:'flag-icon flag-icon-fr flag-icon-squared'},
    {country: 'United-Kingdom', language: 'English', countryCode: 'en', class:'flag-icon flag-icon-gb flag-icon-squared'},
    {country: 'Israel', language: 'עיברית', countryCode: 'he', class:'flag-icon flag-icon-il flag-icon-squared'}
  ]

  constructor(private translate: TranslateService, private authService: AuthService, private router: Router, @Inject(DOCUMENT) private document: Document, @Inject(WINDOW) private window: Window) { }

  ngOnInit(): void {
    this.userSubscription = this.authService.user.subscribe((user) => {
      // The 500ms delay is for UX purposes only
      // fix bug: unwanted 500ms delay when refreshing page, keep only for login
      setTimeout(() => {
        this.isAuthenticated = user ? true : false;
        if (this.isAuthenticated){
          this.userName = user.fname;
          if (user.role == 2) this.isAssociation=true;
        } else this.userName = null;
      }, 500);
    });
  }
  
  nav(path){
    this.router.navigate([path]);
  }

navFixed: boolean = false;
private scrollOffset: number = 70;

useLanguage(language: string): void {
  this.translate.use(language);
}

@HostListener('window:scroll')
onWindowScroll() {
  this.navFixed = (window.pageYOffset 
    || document.documentElement.scrollTop 
    || document.body.scrollTop || 0
  ) > this.scrollOffset;
}
  onLogout() {
    this.authService.logout();
    this.router.navigateByUrl('/auth/login');
}

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }


  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  onNavigationProfile() {
    if (this.authService.getLocalStorageUser().role == 2)
      this.router.navigate([`/administration`]);
    else if (this.authService.getLocalStorageUser().role == 3)
      this.router.navigate([`/admin-chat`]);
  }
}
