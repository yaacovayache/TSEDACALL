import { Injectable } from '@angular/core';
import {HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders} from '@angular/common/http';

import { AuthService } from './auth.service';

// This interceptor is a service that intercepts
// all outgoing HTTP requests that require authentication,
// and attaches the token to the headers
@Injectable()
export class SendTokenInterceptor implements HttpInterceptor {
  // readonly rootUrl = window.location.protocol + '//' + window.location.hostname + ':3000';
  // readonly rootUrl = 'http://178.18.246.119:3000';

  public ROOT_URL(){
    var result = 'https:'
    return (window.location.hostname == 'localhost') ? result + '//' + window.location.hostname + ':3000' : result + '//178.18.246.119' 
  }
  
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (
      req.url == `${this.ROOT_URL()}/register` ||
      req.url == `${this.ROOT_URL()}/login`
    )
      return next.handle(req);

    const authReq = req.clone({
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${this.authService.token}`
      ),
    });

    return next.handle(authReq);
  }
}
