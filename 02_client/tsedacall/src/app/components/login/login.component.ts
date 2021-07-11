import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../shared/models/user.model';
import { AuthService } from 'src/app/shared/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public user: User;
  public loginForm: FormGroup;
  isLoading: boolean = false;

  constructor(private AuthService: AuthService, private router: Router) { }

  ngOnInit(): void {

    this.loginForm = new FormGroup({
      password: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }
  
  public onSubmit() {
    const userCredentials = {
      email: this.loginForm.get('email').value,
      password: this.loginForm.get('password').value,
    };
    
    console.log(userCredentials)
    this.AuthService.Login(userCredentials).subscribe(
      (res) => {
        console.log(res)
        this.isLoading = true;
        setTimeout(() => {
          this.router.navigateByUrl('/home');
        }, 500)
      },
      (err) => {
        console.log(err);
      }
    );
  }

}
