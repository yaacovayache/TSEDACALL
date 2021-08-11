import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from './shared/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Event, Router, NavigationStart, NavigationEnd, NavigationError, NavigationCancel } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'tsedacall';
  isLoading: boolean = false;

  constructor(private translate: TranslateService, private authService: AuthService, private router: Router) {
    this.router.events.subscribe((routerEvent: Event) => {
      // On NavigationStart, set showLoadingIndicator to ture
      if (routerEvent instanceof NavigationStart) {
        this.isLoading = true;
      }

      // On NavigationEnd or NavigationError or NavigationCancel
      // set showLoadingIndicator to false
      if (routerEvent instanceof NavigationEnd || routerEvent instanceof NavigationError || routerEvent instanceof NavigationCancel) {
        this.isLoading = false;
      }
    })
    translate.setDefaultLang('fr');
  }

  ngOnInit() {
    // if( /Android|webOS|iPhone|iPad|Mac|Macintosh|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    //   this.isMobile = true
    // }
    this.authService.autoLogin();
  }
}
