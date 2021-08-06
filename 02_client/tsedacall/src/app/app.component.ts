import { Component, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import { AuthService } from './shared/services/auth.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'tsedacall';
  // isMobile:boolean = false

  constructor(private translate: TranslateService, private authService: AuthService) {
    translate.setDefaultLang('fr');
  }

  ngOnInit() {
    // if( /Android|webOS|iPhone|iPad|Mac|Macintosh|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    //   this.isMobile = true
    // }
    this.authService.autoLogin();
  }
}
