import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthGuardService } from '../services/auth-guard.service';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationGuard implements CanActivate {
  constructor(private authGuardService: AuthGuardService, private router: Router) { }

  canActivate(): boolean {
    if (!this.authGuardService.gettoken()) {  
        this.router.navigateByUrl("/auth/login");  
    }  
    return this.authGuardService.gettoken();  
}  

  
}
