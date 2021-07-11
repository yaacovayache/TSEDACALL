import { Component, OnInit, OnDestroy, HostListener, HostBinding, Inject, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { WINDOW_PROVIDERS, WINDOW } from 'src/app/shared/helpers/window.helper';
import { DOCUMENT } from '@angular/common';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isAuthenticated: boolean = false;
  userSubscription = new Subscription();
  userName: string;
  navbarOpen:boolean = false;
  isFixed:boolean;

  constructor(private authService: AuthService, private router: Router, @Inject(DOCUMENT) private document: Document) { }

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

navFixed: boolean = false;
private scrollOffset: number = 70;

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
}
