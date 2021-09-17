import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss']
})
export class IntroComponent implements OnInit {
  userSubscription = new Subscription();
  isAuthenticated: boolean = false;
  userName: string;
  isAssociation = false;

  constructor(private router:Router, private authService: AuthService) { }

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

  navTo(path){
    this.router.navigate([path]);
  }

}
